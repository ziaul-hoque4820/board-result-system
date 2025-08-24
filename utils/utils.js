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