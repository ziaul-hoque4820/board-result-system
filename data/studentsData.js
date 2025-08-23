import { createID } from "../utils/utils.js";

let data = [];

function saveToStorage() {
    localStorage.setItem('students', JSON.stringify(data));
}

export function createStudent(studentData) {
    // check old dta exists or not
    if(localStorage.getItem('students')){
        data = JSON.parse(localStorage.getItem('students'))
    }

    // push new data 
    data.push({
        ...studentData,
        id: createID(),
        createdAt: Date.now(),
        updatedAt: null,
    })

    saveToStorage();
}