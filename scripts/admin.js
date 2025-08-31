import { createStudent, getFromStorage, saveToStorage, uptateStudentData } from "../data/studentsData.js";
import { createAlert, timeAgo } from "../utils/utils.js";

document.getElementById('student-create-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const studentData = Object.fromEntries(formData.entries());

    // form validation ‍- create student and save to localStorage
    if (!studentData.name || !studentData.father || !studentData.mother || !studentData.dob || !studentData.roll || !studentData.reg || !studentData.inst || !studentData.board || !studentData.year || !studentData.exam || !studentData.group || !studentData.type) {
        document.querySelector('.msg').innerHTML = createAlert('All fields are required');
    } else {
        createStudent(studentData);
        e.target.reset();
        document.querySelector('#student-create .btn-close').click();
        getAllStudents();
    };

});

let studentResultForm = document.getElementById('student-result-form-data');

studentResultForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const resultData = Object.fromEntries(formData.entries());

    const studentsData = getFromStorage();

    if (!resultData.bangla || !resultData.english || !resultData.math || !resultData.science || !resultData.social || !resultData.religion) {
        document.querySelector('.msg-result').innerHTML = createAlert('All fields are required');
    } else {
        const uptateLocalStorage = uptateStudentData(studentsData, resultData)
        saveToStorage(uptateLocalStorage);
        e.target.reset();
        document.querySelector('#student-result-form .btn-close').click();
        getAllStudents();
    }

});

function openResultModalFor(studentId) {
    studentResultForm.reset();
    document.querySelector('.msg-result').innerHTML = '';

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

}

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
                    <button class="btn btn-sm btn-warning"><i class="fa fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        `
    });

    document.getElementById('student-data-list').innerHTML = studentDataListHTML;

    document.querySelectorAll('.js-add-result').forEach((button) => {
        button.addEventListener('click', () => {
            const studentId = button.dataset.studentId;
            studentResultForm.querySelector('input[name="id"]').value = studentId;
        });
    });

    document.querySelectorAll('.js-view-result').forEach((button) => {
        button.addEventListener('click', () => {
            const studentId = button.dataset.studentId;
            openResultModalFor(studentId)
        });
    });
};
getAllStudents();