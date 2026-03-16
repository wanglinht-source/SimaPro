// Definisikan URL Apps Script Anda di sini
const URL_UTAMA = "https://script.google.com/macros/s/AKfycbzpvqSlPVldVHMajTnNDTtA7NnmbVwOXmZmuAZA7fIA4tyyS6Ah6Ylb6hg_5a_vepG4sQ/exec";
const URL_ANALISA = "https://script.google.com/macros/s/AKfycbxk4EDnw7K3EcbHdfrbKPy6QVjWreu8N-HB7yn1bcOUJ64ggnneSuUFDFnDWaV7Xv4P/exec"; 

/**
 * @param {Object} params - Parameter data yang dikirim
 * @param {String} targetUrl - (Opsional) Gunakan URL_ANALISA jika ingin memanggil script kedua
 */
async function callAPI(params, targetUrl = URL_UTAMA) {
    const formData = new URLSearchParams();
    for (const key in params) {
        formData.append(key, params[key]);
    }

    try {
        const response = await fetch(targetUrl, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        return result; 
    } catch (error) {
        console.error("API Call Error:", error);
        return { status: 'error', message: 'Gagal menghubungi server' };
    }
}