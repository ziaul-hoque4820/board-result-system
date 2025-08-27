import { createID } from "../utils/utils.js";

let data = [];

export function saveToStorage(data) {
    localStorage.setItem('students', JSON.stringify(data));
}

export function getFromStorage() {
    let storedData = [];

    // check old dta exists or not
    if (localStorage.getItem('students')) {
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

    saveToStorage(data);
}

export function uptateStudentData(studentsData, resultData) {
    const update = studentsData.map(item => {
        if (item.id === resultData.id) {
            return {
                ...item,
                updatedAt: Date.now(),
                result: {
                    bangla: +resultData.bangla,
                    english: +resultData.english,
                    math: +resultData.math,
                    science: +resultData.science,
                    social: +resultData.social,
                    religion: +resultData.religion,
                }
            }
        } else {
            return item;
        }
    });

    return update;
}