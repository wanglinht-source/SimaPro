// Membuka atau membuat database IndexedDB
const request = indexedDB.open("PMKS_DB", 2);
let db;

request.onupgradeneeded = (e) => {
    db = e.target.result;
    if (!db.objectStoreNames.contains("session")) {
        db.createObjectStore("session", { keyPath: "id" });
    }
    // Tambahkan ini agar store supplier tersedia
    if (!db.objectStoreNames.contains("supplier")) {
        db.createObjectStore("supplier", { keyPath: "nama" });
    }
};

request.onsuccess = (e) => {
    db = e.target.result;
    checkSession(); // Jalankan cek sesi saat aplikasi dibuka
};

// Fungsi menyimpan sesi login
function saveSession(userData) {
    const tx = db.transaction("session", "readwrite");
    tx.objectStore("session").put({ id: "user_login", data: userData });
    window.location.href = "index.html"; // Redirect ke Dashboard
}

// Fungsi Cek Akses & Menampilkan Menu Dinamis
function checkSession() {
    const tx = db.transaction("session", "readonly");
    const store = tx.objectStore("session").get("user_login");

    store.onsuccess = () => {
        const user = store.result?.data;
        if (!user) {
            if (window.location.pathname !== "/login.html") window.location.href = "login.html";
            return;
        }
        
        // Render menu berdasarkan akses JSON
        renderMenu(user.akses);
    };
}

function renderMenu(akses) {
    const navMenu = document.getElementById("navMenu");
    let html = '<ul class="navbar-nav">';
    
    // Contoh menu dinamis
    if (akses.input_pmks) html += '<li class="nav-item"><a class="nav-link" href="#">Input PMKS</a></li>';
    if (akses.input_estimasi) html += '<li class="nav-item"><a class="nav-link" href="#">Input Estimasi</a></li>';
    
    html += '</ul>';
    navMenu.innerHTML = html;
}