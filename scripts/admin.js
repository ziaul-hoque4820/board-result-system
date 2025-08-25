import { createStudent, getFromStorage, saveToStorage } from "../data/studentsData.js";
import { createAlert, timeAgo } from "../utils/utils.js";

document.getElementById('student-create-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // All data from the input tag is captured as an object.
    const formData = new FormData(e.target); // It will fetch all the input data from the form.
    const studentData = Object.fromEntries(formData.entries()); // Converts an array to an object( That data will be given in array form )
    console.log(studentData);

    // form validation ‍- create student and save to localStorage
    if (!studentData.name || !studentData.father || !studentData.mother || !studentData.dob || !studentData.roll || !studentData.reg || !studentData.inst || !studentData.board || !studentData.year || !studentData.exam || !studentData.group || !studentData.type) {
        document.querySelector('.msg').innerHTML = createAlert('All fields are required');
    } else {
        createStudent(studentData);
    };

    e.target.reset();
    document.querySelector('.btn-close').click();
    getAllStudents();
});

let studentResultForm = document.getElementById('student-result-form');

studentResultForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const resultData = Object.fromEntries(formData.entries());
    console.log(resultData);

    const studentsData = getFromStorage();

    const uptateStudentData = studentsData.map(item => {
        console.log(item);

        if (item.id === resultData.id) {
            return {
                ...item,
                result: {
                    bangla: resultData.bangla,
                    english: resultData.english,
                    math: resultData.math,
                    science: resultData.science,
                    social: resultData.social,
                    religion: resultData.religion,
                }
            }
        } else {
            return item;
        }

    });

    saveToStorage(uptateStudentData);

    e.target.reset();
    document.querySelector('.btn-close').click();
    getAllStudents();
});

function getAllStudents() {
    const students = getFromStorage();
    let studentDataListHTML = '';

    students.forEach((student, index) => {
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
                '<button class="btn btn-sm btn-success">View Result</button>'
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
            console.log(studentId);
            studentResultForm.querySelector('input[name="id"]').value = studentId;
        });
    })
};
getAllStudents();