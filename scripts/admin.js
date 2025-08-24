import { createStudent, getFromStorage } from "../data/studentsData.js";
import { createAlert, timeAgo } from "../utils/utils.js";

document.getElementById('student-create-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // All data from the input tag is captured as an object.
    const formData = new FormData(e.target); // It will fetch all the input data from the form.
    const studentData = Object.fromEntries(formData.entries()); // Converts an array to an object( That data will be given in array form )
    console.log(studentData);
    
    // form validation ‍- create student and save to localStorage
    if( !studentData.name || !studentData.father || !studentData.mother || !studentData.dob || !studentData.roll || !studentData.reg || !studentData.inst || !studentData.board || !studentData.year || !studentData.exam || !studentData.group || !studentData.type ) {
        document.querySelector('.msg').innerHTML = createAlert('All fields are required');
    } else {
        createStudent(studentData);
    };

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
                    <button class="btn btn-sm btn-info">Add Result</button>
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
};
getAllStudents();