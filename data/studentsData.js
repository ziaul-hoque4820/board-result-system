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

export function updateStudentInfo(updatedStudent) {
    const students = getFromStorage();

    const updated = students.map(item => {
        if (item.id === updatedStudent.id) {
            return {
                ...item,
                name: updatedStudent.name,
                father: updatedStudent.father,
                mother: updatedStudent.mother,
                dob: updatedStudent.dob,
                roll: updatedStudent.roll,
                reg: updatedStudent.reg,
                inst: updatedStudent.inst,
                board: updatedStudent.board,
                year: updatedStudent.year,
                exam: updatedStudent.exam,
                group: updatedStudent.group,
                type: updatedStudent.type,
                updatedAt: Date.now(),
                // preserve existing result if any (we didn't touch it)
            }
        } else {
            return item;
        }
    });

    saveToStorage(updated);
    return updated;
}

export function deleteStudentById(id) {
    const students = getFromStorage();
    const filtered = students.filter(item => item.id !== id);
    saveToStorage(filtered);
    return filtered;
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