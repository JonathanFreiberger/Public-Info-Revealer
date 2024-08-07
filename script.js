document.getElementById('getInfoBtn').addEventListener('click', getUserInfo);

function getUserInfo() {
    const infoDiv = document.getElementById('info');
    infoDiv.classList.remove('hidden');
    infoDiv.innerHTML = "<p>Loading...</p>";

    // Operating System and Browser Details
    const os = getOS();
    const browser = getBrowser();

    // Screen Resolution
    const screenRes = `${window.screen.width} x ${window.screen.height}`;

    // Device Memory
    const memory = getDeviceMemory();

    // Cores
    const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} cores` : 'Not available';

    // Language
    const language = navigator.language;

    // Fetch Public IP, ISP, and General Location
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const publicIP = data.ip;
            const location = `${data.city}, ${data.region}, ${data.country_name}`;
            const latitude = data.latitude;
            const longitude = data.longitude;
            const isp = data.org;
            displayInfo(os, browser, screenRes, memory, cores, language, publicIP, location, latitude, longitude, isp);
        })
        .catch(error => {
            console.error('Error fetching public IP and location:', error);
        });
}

function displayInfo(os, browser, screenRes, memory, cores, language, publicIP, location, latitude, longitude, isp) {
    const infoDiv = document.getElementById('info');
    infoDiv.innerHTML = `
        <p><strong>Operating System:</strong> ${os}</p>
        <p><strong>Browser:</strong> ${browser}</p>
        <p><strong>Screen Resolution:</strong> ${screenRes}</p>
        <p><strong>Device Memory:</strong> ${memory}</p>
        <p><strong>CPU Cores:</strong> ${cores}</p>
        <p><strong>Language:</strong> ${language}</p>
        <p><strong>Public IP Address:</strong> ${publicIP}</p>
        <p><strong>ISP:</strong> ${isp}</p>
        <p><strong>Location:</strong> ${location}</p>
        <div class="map-container">
            <div id="map"></div>
        </div>
    `;

    initMap(latitude, longitude);
}

function initMap(lat, lng) {
    const map = L.map('map').setView([lat, lng], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map);
}

function getOS() {
    const userAgent = window.navigator.userAgent;
    let os = 'Unknown';
    if (userAgent.indexOf('Win') !== -1) os = 'Windows';
    if (userAgent.indexOf('Mac') !== -1) os = 'MacOS';
    if (userAgent.indexOf('X11') !== -1) os = 'UNIX';
    if (userAgent.indexOf('Linux') !== -1) os = 'Linux';
    return os;
}

function getBrowser() {
    const userAgent = window.navigator.userAgent;
    let browser = 'Unknown';
    if (userAgent.indexOf('Edge') !== -1) browser = 'Edge';
    if (userAgent.indexOf('Chrome') !== -1 && userAgent.indexOf('Edge') === -1) browser = 'Chrome';
    if (userAgent.indexOf('Firefox') !== -1) browser = 'Firefox';
    if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) browser = 'Safari';
    if (userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident') !== -1) browser = 'Internet Explorer';
    return browser;
}

function getDeviceMemory() {
    if (navigator.deviceMemory) {
        return `${navigator.deviceMemory} GB`;
    } else {
        const memorySize = window.navigator.deviceMemory || 'Not available';
        return memorySize;
    }
}
