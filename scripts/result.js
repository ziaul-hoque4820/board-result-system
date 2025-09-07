import { getGradeAndGPA, resultSystemPro } from "../utils/utils.js";

const markSheet = document.getElementById('mark-sheet');
const geradSheet = document.getElementById('gread-sheet');

const searchData = JSON.parse(localStorage.getItem("searchData"));

if(!searchData) {
    window.location.href = "./index.html"
};

const stuResult = resultSystemPro({
    bangla: searchData.result.bangla, 
    english: searchData.result.english, 
    math: searchData.result.math, 
    science: searchData.result.science, 
    social: searchData.result.social, 
    reli: searchData.result.religion
})

markSheet.innerHTML = `
    <div class="result-sheet">
        <h2>${searchData.exam} Result ${searchData.year}</h2>
        <div class="edu-student-info">
            <table>
                <tr>
                    <td>Roll No</td>
                    <td>${searchData.roll}</td>
                    <td>Name</td>
                    <td>${searchData.name}</td>
                </tr>
                <tr></tr>
                <tr>
                    <td>Board</td>
                    <td>${searchData.board}</td>
                    <td>Father's Name</td>
                    <td>${searchData.father}</td>
                </tr>
                <tr>
                    <td>Group</td>
                    <td>${searchData.group}</td>
                    <td>Mother's Name</td>
                    <td>${searchData.mother}</td>
                </tr>
                <tr>
                    <td>Type</td>
                    <td>${searchData.type}</td>
                    <td>Date of Birth</td>
                    <td>${searchData.dob}</td>
                </tr>
                <tr>
                    <td>Result</td>
                    <td>${stuResult.grade}</td>
                    <td>Institute</td>
                    <td>${searchData.inst}</td>
                </tr>
                <tr>
                    <td>GPA</td>
                    <td colspan="3">${stuResult.gpa}</td>
                </tr>
            </table>
        </div>
    </div>
`;

geradSheet.innerHTML = `
    <h2 class="grade-sheet">Grade Sheet</h2>
    <div class="edu-student-grade-sheet">
        <table>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Subject</th>
                    <th>Grade</th>
                    <th>GPA</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>101</td>
                    <td>BANGLA</td>
                    <td>${getGradeAndGPA(searchData.result.bangla).grade}</td>
                    <td>${getGradeAndGPA(searchData.result.bangla).gpa}</td>
                </tr>
                <tr>
                    <td>102</td>
                    <td>ENGLISH</td>
                    <td>${getGradeAndGPA(searchData.result.english).grade}</td>
                    <td>${getGradeAndGPA(searchData.result.english).gpa}</td>
                </tr>
                <tr>
                    <td>103</td>
                    <td>MATHEMATICS</td>
                    <td>${getGradeAndGPA(searchData.result.math).grade}</td>
                    <td>${getGradeAndGPA(searchData.result.math).gpa}</td>
                </tr>
                <tr>
                    <td>104</td>
                    <td>SCIENCE</td>
                    <td>${getGradeAndGPA(searchData.result.science).grade}</td>
                    <td>${getGradeAndGPA(searchData.result.science).gpa}</td>
                </tr>
                <tr>
                    <td>105</td>
                    <td>SOCIAL SCIENCE</td>
                    <td>${getGradeAndGPA(searchData.result.social).grade}</td>
                    <td>${getGradeAndGPA(searchData.result.social).gpa}</td>
                </tr>
                <tr>
                    <td>106</td>
                    <td>RELIGION</td>
                    <td>${getGradeAndGPA(searchData.result.religion).grade}</td>
                    <td>${getGradeAndGPA(searchData.result.religion).gpa}</td>
                </tr>
            </tbody>
        </table>
        <a href="#" id="search-again">Search Again</a>
    </div>
`;

document.getElementById('search-again').addEventListener('click', () =>{
    localStorage.removeItem('searchData');
    window.location.href = 'index.html';
});