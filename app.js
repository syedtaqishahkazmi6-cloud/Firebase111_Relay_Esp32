import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref, set, onValue, update } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

// Firebase Configuration (Your credentials)
const firebaseConfig = {
    apiKey: "AIzaSyBExYcRBI24hi3NtoqKNwr72f8PVBet8cQ",
    authDomain: "fir-esprelay.firebaseapp.com",
    databaseURL: "https://fir-esprelay-default-rtdb.firebaseio.com",
    projectId: "fir-esprelay",
    storageBucket: "fir-esprelay.firebasestorage.app",
    messagingSenderId: "305057307536",
    appId: "1:305057307536:web:8c4e8c0555ab0d55583115",
    measurementId: "G-L0QYH7LXW0"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const devices = [
    { id: 1, name: "Light", path: 'M9 21h6v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z' },
    { id: 2, name: "Fan", path: 'M12 12c0-3 2.5-5.5 5.5-5.5S23 9 23 12H12zm0 0c0 3-2.5 5.5-5.5 5.5S1 15 1 12h11zm0 0c-3 0-5.5-2.5-5.5-5.5S9 1 12 1v11zm0 0c3 0 5.5 2.5 5.5 5.5S15 23 12 23V12z' },
    { id: 3, name: "Hardware", path: 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.5 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z' },
    { id: 4, name: "Studio", path: 'M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z' },
    { id: 5, name: "Class", path: 'M5 4v11h14V4H5zm16 13c0 .55-.45 1-1 1h-2l-2-2h-8l-2 2H4c-.55 0-1-.45-1-1v-1h18v1z' },
    { id: 6, name: "Light 2", path: 'M9 21h6v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z' },
    { id: 7, name: "Printer", path: 'M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z' },
    { id: 8, name: "LED", path: 'M7 19h10v2H7zM5 3h14c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2z' }
];

// Build relay buttons
const grid = document.getElementById('relayGrid');
devices.forEach(d => {
    const el = document.createElement('div');
    el.className = 'relay';
    el.id = `r-${d.id}`;
    el.onclick = () => toggleRelay(d.id);
    el.innerHTML = `<span class="relay-num">CH${d.id}</span><svg viewBox="0 0 24 24"><path d="${d.path}"/></svg><span>${d.name}</span>`;
    grid.appendChild(el);
});

// Listen for real-time database updates
onValue(ref(database, 'relays'), (snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        document.getElementById('cloud-pill').classList.add('cloud-on');
        document.getElementById('main-status').innerHTML = 'System: <span class="online">Cloud Online</span>';
        
        for (let i = 1; i <= 8; i++) {
            const key = 'r' + i;
            const state = data[key] || 0;
            const el = document.getElementById(`r-${i}`);
            if (el) {
                state === 1 ? el.classList.add('active') : el.classList.remove('active');
            }
        }
    } else {
        document.getElementById('cloud-pill').classList.remove('cloud-on');
        document.getElementById('main-status').innerHTML = 'System: <span style="color:#f97316">Waiting for data...</span>';
    }
}, (error) => {
    console.error("Database error:", error);
    document.getElementById('main-status').innerHTML = 'System: <span style="color:#ff4455">Connection Error</span>';
});

// Toggle relay function
function toggleRelay(id) {
    const el = document.getElementById(`r-${id}`);
    const newState = el.classList.contains('active') ? 0 : 1;
    set(ref(database, `relays/r${id}`), newState).catch(e => {
        console.error("Error updating relay:", e);
    });
}

// Kill all function
document.getElementById('killAllBtn').onclick = () => {
    if (confirm("Turn off all relays?")) {
        const updates = {};
        for (let i = 1; i <= 8; i++) {
            updates[`relays/r${i}`] = 0;
        }
        update(ref(database), updates).catch(e => {
            console.error("Error killing all:", e);
        });
    }
};

// Clock
setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString();
}, 1000);

// Initial status
document.getElementById('main-status').innerHTML = 'System: <span style="color:#f97316">Connecting to Firebase...</span>';
