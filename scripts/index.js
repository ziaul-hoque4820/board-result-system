import { getFromStorage } from "../data/studentsData.js";
import { getRandomNumber } from "../utils/utils.js";


const resultSearchForm = document.getElementById('result-search-form');
const edupzl = document.getElementById('edi-plz');

let pzl1, pzl2;
function generatePuzzle() {
    pzl1 = getRandomNumber();
    pzl2 = getRandomNumber();
    edupzl.innerHTML = `${pzl1} + ${pzl2}`;
}
generatePuzzle();

edupzl.innerHTML = `${pzl1} + ${pzl2}`;

resultSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const studentData = getFromStorage();

    if (pzl1 + pzl2 !== parseInt(data.pzl, 10)) {
        alert('Puzzle Not Match');
        generatePuzzle();
        e.target.reset();
    } else {
        const searchData = studentData.find(stuData => (
            stuData.roll == data.roll &&
            stuData.reg == data.reg &&
            stuData.exam == data.examination &&
            stuData.year == data.year &&
            stuData.board == data.board
        ));
        
        if(searchData) {
            localStorage.setItem('searchData', JSON.stringify(searchData));
            window.location.href = "https://ziaul-hoque4820.github.io/board-result-system/result.html";
        } else {
            alert('No result found')
        }
    }

});