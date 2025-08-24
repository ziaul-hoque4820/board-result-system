import { createID } from "../utils/utils.js";

let data = [];

function saveToStorage() {
    localStorage.setItem('students', JSON.stringify(data));
}

export function getFromStorage() {
    let storedData = [];

    // check old dta exists or not
    if(localStorage.getItem('students')){
        storedData = JSON.parse(localStorage.getItem('students'))
    };

    return storedData;
}

export function createStudent(studentData) {
    data = getFromStorage();

    // push new data 
    data.push({
        ...studentData,
        id: createID(),
        createdAt: Date.now(),
        updatedAt: null,
        result: null,
    })

    saveToStorage();
}