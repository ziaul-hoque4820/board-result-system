export const createAlert = (msg, type = "danger") => {
    return `<p class="alert alert-${type} d-flex justify-content-between">
                ${msg} 
                <button class="btn-close" data-bs-dismiss="alert"></button>
            </p>`;
};

export const createID = () => {
    // 1. current time (timestamp)
    const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);

    // 2. Random machineId (12 digit hexa)
    const machineId = "xxxxxxxxxxxx".replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
    });

    // 3. Random processId (3 digit hexa)
    const processId = (Math.floor(Math.random() * 1000) % 1000)
        .toString(16)
        .padStart(3, "0");

    // 4. Random counter (6 digit hexa)
    const counter = ((Math.random() * 16777216) | 0)
        .toString(16)
        .padStart(6, "0");

    // All of them together create an ID.
    return timestamp + machineId + processId + counter;
};

export const timeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - timestamp) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
};

export const getRandomNumber = () => {
    return Math.floor(Math.random() * 9) + 1;
};

export const getGradeAndGPA = (mark) => {
    let grade;
    let gpa;

    if (mark >= 0 && mark < 33) {
        grade = "F";
        gpa = 0;
    } else if (mark >= 33 && mark < 40) {
        grade = "D";
        gpa = 1;
    } else if (mark >= 40 && mark < 50) {
        grade = "C";
        gpa = 2;
    } else if (mark >= 50 && mark < 60) {
        grade = "B";
        gpa = 3;
    } else if (mark >= 60 && mark < 70) {
        grade = "A-";
        gpa = 3.5;
    } else if (mark >= 70 && mark < 80) {
        grade = "A";
        gpa = 4;
    } else if (mark >= 80 && mark <= 100) {
        grade = "A+";
        gpa = 5;
    } else {
        grade = "invalid";
        gpa = "invalid";
    }

    return {
        gpa: gpa,
        grade: grade,
    };
};

export const resultSystemPro = (marks) => {
    const { bangla, english, math, science, social, reli } = marks;

    const totalGpaAvg = (
        (getGradeAndGPA(bangla).gpa +
            getGradeAndGPA(english).gpa +
            getGradeAndGPA(math).gpa +
            getGradeAndGPA(science).gpa +
            getGradeAndGPA(social).gpa +
            getGradeAndGPA(reli).gpa) /
        6
    ).toFixed(2);

    if (
        bangla >= 33 &&
        english >= 33 &&
        math >= 33 &&
        science >= 33 &&
        social >= 33 &&
        reli >= 33
    ) {
        if (totalGpaAvg >= 0 && totalGpaAvg < 1) {
            return {
                gpa: totalGpaAvg,
                grade: "F",
            };
        } else if (totalGpaAvg >= 1 && totalGpaAvg < 2) {
            return {
                gpa: totalGpaAvg,
                grade: "D",
            };
        } else if (totalGpaAvg >= 2 && totalGpaAvg < 3) {
            return {
                gpa: totalGpaAvg,
                grade: "C",
            };
        } else if (totalGpaAvg >= 3 && totalGpaAvg < 3.5) {
            return {
                gpa: totalGpaAvg,
                grade: "B",
            };
        } else if (totalGpaAvg >= 3.5 && totalGpaAvg < 4) {
            return {
                gpa: totalGpaAvg,
                grade: "A-",
            };
        } else if (totalGpaAvg >= 4 && totalGpaAvg < 5) {
            return {
                gpa: totalGpaAvg,
                grade: "A",
            };
        } else if (totalGpaAvg >= 5) {
            return {
                gpa: totalGpaAvg,
                grade: "A+",
            };
        }
    } else {
        return {
            gpa: 0,
            grade: "F",
        };
    }
};