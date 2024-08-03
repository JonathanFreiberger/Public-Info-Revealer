document.getElementById('getInfoBtn').addEventListener('click', getUserInfo);

function getUserInfo() {
    const infoDiv = document.getElementById('info');
    infoDiv.innerHTML = "<p>Loading...</p>";

    // Operating System
    const os = navigator.platform;

    // Browser Details
    const browser = navigator.userAgent;

    // Screen Resolution
    const screenRes = `${window.screen.width} x ${window.screen.height}`;

    // Device Memory
    const memory = navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'Not available';

    // Cores
    const cores = navigator.hardwareConcurrency ? navigator.hardwareConcurrency + ' cores' : 'Not available';

    // Language
    const language = navigator.language;

    // Fetch Public IP and General Location
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const publicIP = data.ip;
            const location = `${data.city}, ${data.region}, ${data.country_name}`;
            displayInfo(os, browser, screenRes, memory, cores, language, publicIP, location);
        })
        .catch(error => {
            console.error('Error fetching public IP and location:', error);
        });
}

function displayInfo(os, browser, screenRes, memory, cores, language, publicIP, location) {
    const infoDiv = document.getElementById('info');
    infoDiv.innerHTML = `
        <p><strong>Operating System:</strong> ${os}</p>
        <p><strong>Browser Details:</strong> ${browser}</p>
        <p><strong>Screen Resolution:</strong> ${screenRes}</p>
        <p><strong>Device Memory:</strong> ${memory}</p>
        <p><strong>CPU Cores:</strong> ${cores}</p>
        <p><strong>Language:</strong> ${language}</p>
        <p><strong>Public IP Address:</strong> ${publicIP}</p>
        <p><strong>Location:</strong> ${location}</p>
    `;
}

