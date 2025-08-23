import { createStudent } from "../data/studentsData.js";
import { createAlert } from "../utils/utils.js";

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
});