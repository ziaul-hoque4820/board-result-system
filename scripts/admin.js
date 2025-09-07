import { createStudent, getFromStorage, saveToStorage, uptateStudentData, updateStudentInfo, deleteStudentById } from "../data/studentsData.js";
import { createAlert, timeAgo } from "../utils/utils.js";

let studentResultForm = document.getElementById('student-result-form-data');
let studentCreateForm = document.getElementById('student-create-form');
let resultMsg = document.querySelector('.msg-result');

// Create Student Event Listenet 
studentCreateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const studentData = Object.fromEntries(formData.entries());

    // form validation ‍- create student and save to localStorage
    if (!studentData.name || !studentData.father || !studentData.mother || !studentData.dob || !studentData.roll || !studentData.reg || !studentData.inst || !studentData.board || !studentData.year || !studentData.exam || !studentData.group || !studentData.type) {
        document.querySelector('.msg').innerHTML = createAlert('All fields are required');
        return;
    }

    // Update student Data 
    if (studentData.id) {
        // update existing student
        updateStudentInfo(studentData);
        e.target.reset();
        document.querySelector('#student-create .btn-close').click();

        // restore modal title & submit button
        const modalTitle = document.getElementById('student-modal-title');
        const submitBtn = document.getElementById('student-create-submit');
        if (modalTitle) modalTitle.innerText = 'Create new Student';
        if (submitBtn) submitBtn.innerText = 'Create';

        getAllStudents();
        return;
    }

    createStudent(studentData);
    e.target.reset();
    document.querySelector('#student-create .btn-close').click();
    getAllStudents();
});

// Update Student Restlt 
studentResultForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const resultData = Object.fromEntries(formData.entries());

    if (!resultData.bangla || !resultData.english || !resultData.math || !resultData.science || !resultData.social || !resultData.religion) {
        resultMsg.innerHTML = createAlert('All fields are required');
    } else {
        const uptateLocalStorage = uptateStudentData(resultData)
        saveToStorage(uptateLocalStorage);
        e.target.reset();
        document.querySelector('#student-result-form .btn-close').click();
        getAllStudents();
    }
});

// Student Restlt Edit and Update 
function openResultModalForUpdate(studentId) {
    studentResultForm.querySelector('input[name="id"]').value = studentId;

    const studentsData = getFromStorage();
    const matchingStudent = studentsData.find(student => student.id === studentId);

    if (matchingStudent && matchingStudent.result) {
        studentResultForm.querySelector('input[name="bangla"]').value = matchingStudent.result.bangla;
        studentResultForm.querySelector('input[name="english"]').value = matchingStudent.result.english;
        studentResultForm.querySelector('input[name="math"]').value = matchingStudent.result.math;
        studentResultForm.querySelector('input[name="science"]').value = matchingStudent.result.science;
        studentResultForm.querySelector('input[name="social"]').value = matchingStudent.result.social;
        studentResultForm.querySelector('input[name="religion"]').value = matchingStudent.result.religion;
    }

    const modalEl = document.getElementById('student-result-form');

    if (modalEl) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
    }

};

function getAllStudents() {
    const students = getFromStorage();
    let studentDataListHTML = '';

    students.reverse().forEach((student, index) => {
        studentDataListHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${student.reg}</td>
                <td>${student.board}</td>
                <td>${timeAgo(student.createdAt)}</td>
                <td>
                    ${student.result
                ?
                `<button class="btn btn-sm btn-success js-view-result" data-student-id="${student.id}">View Result</button>`
                :
                `<button class="btn btn-sm btn-info js-add-result" data-bs-toggle="modal" data-bs-target="#student-result-form" data-student-id="${student.id}">Add Result</button>`}
                </td>
                <td>
                    <button class="btn btn-sm btn-info"><i class="fa fa-eye"></i></button>
                    <button class="btn btn-sm btn-warning js-edit" data-student-id="${student.id}" data-bs-toggle="modal" data-bs-target="#student-create"><i class="fa fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger js-delete" data-student-id="${student.id}"><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        `
    });

    document.getElementById('student-data-list').innerHTML = studentDataListHTML;

    // Add Result Listener 
    document.querySelectorAll('.js-add-result').forEach((button) => {
        button.addEventListener('click', () => {
            studentResultForm.reset();
            const studentId = button.dataset.studentId;
            studentResultForm.querySelector('input[name="id"]').value = studentId;
            // restore modal title & submit button
            const modalTitle = document.getElementById('stu-result');
            const submitBtn = document.getElementById('stu-submit');
            if (modalTitle) modalTitle.innerText = 'Create Student Result';
            if (submitBtn) submitBtn.innerText = 'Create';
        });
    });

    // View Result Listener 
    document.querySelectorAll('.js-view-result').forEach((button) => {
        button.addEventListener('click', () => {
            studentResultForm.reset();
            document.querySelector('.msg-result').innerHTML = '';
            const studentId = button.dataset.studentId;
            openResultModalForUpdate(studentId);
            // restore modal title & submit button
            const modalTitle = document.getElementById('stu-result');
            const submitBtn = document.getElementById('stu-submit');
            if (modalTitle) modalTitle.innerText = 'Edit Student Result';
            if (submitBtn) submitBtn.innerText = 'Update';
        });
    });

    // Student Data Edit 
    document.querySelectorAll('.js-edit').forEach((button) => {
        button.addEventListener('click', () => {
            const studentId = button.dataset.studentId;
            const students = getFromStorage();
            const student = students.find(s => s.id === studentId);
            if (!student) return;

            studentCreateForm.querySelector('input[name="id"]').value = student.id || '';
            studentCreateForm.querySelector('input[name="name"]').value = student.name || '';
            studentCreateForm.querySelector('input[name="father"]').value = student.father || '';
            studentCreateForm.querySelector('input[name="mother"]').value = student.mother || '';
            studentCreateForm.querySelector('input[name="dob"]').value = student.dob || '';
            studentCreateForm.querySelector('input[name="roll"]').value = student.roll || '';
            studentCreateForm.querySelector('input[name="reg"]').value = student.reg || '';
            studentCreateForm.querySelector('input[name="inst"]').value = student.inst || '';
            studentCreateForm.querySelector('select[name="board"]').value = student.board || '';
            studentCreateForm.querySelector('select[name="year"]').value = student.year || '';
            studentCreateForm.querySelector('select[name="exam"]').value = student.exam || '';

            // radio group fields
            const groupRadio = studentCreateForm.querySelectorAll('input[name="group"]');
            groupRadio.forEach(r => r.checked = (r.value === student.group));
            const typeRadio = studentCreateForm.querySelectorAll('input[name="type"]');
            typeRadio.forEach(r => r.checked = (r.value === student.type));

            // change modal title & submit button text
            const modalTitle = document.getElementById('student-modal-title');
            const submitBtn = document.getElementById('student-create-submit');
            if (modalTitle) modalTitle.innerText = 'Edit Student';
            if (submitBtn) submitBtn.innerText = 'Update';

            // show modal programmatically as fallback (button also has data-bs attrs)
            const modalEl = document.getElementById('student-create');
            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                modal.show();
            }
        });
    });

    // DELETE button
    document.querySelectorAll('.js-delete').forEach((button) => {
        button.addEventListener('click', () => {
            const studentId = button.dataset.studentId;
            if (!studentId) return;

            // confirmation
            const ok = confirm('Are you sure you want to delete this student? This action cannot be undone.');
            if (!ok) return;

            deleteStudentById(studentId);
            getAllStudents();
        });
    });
};

// when create-modal hides, reset form and messages & restore texts
const createModalEl = document.getElementById('student-create');
if (createModalEl) {
    createModalEl.addEventListener('hidden.bs.modal', () => {
        studentCreateForm.reset();
        studentCreateForm.querySelector('input[name="id"]').value = '';
        document.querySelector('.msg').innerHTML = '';
        const modalTitle = document.getElementById('student-modal-title');
        const submitBtn = document.getElementById('student-create-submit');
        if (modalTitle) modalTitle.innerText = 'Create new Student';
        if (submitBtn) submitBtn.innerText = 'Create';
    })
};
getAllStudents();