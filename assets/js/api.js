const GAS_URL = "https://script.google.com/macros/s/AKfycbzpvqSlPVldVHMajTnNDTtA7NnmbVwOXmZmuAZA7fIA4tyyS6Ah6Ylb6hg_5a_vepG4sQ/exec";

async function callAPI(params) {
    const formData = new URLSearchParams();
    for (const key in params) {
        formData.append(key, params[key]);
    }

    try {
        const response = await fetch(GAS_URL, {
            method: 'POST',
            body: formData
        });

        // Mengambil data JSON dari respons server
        const result = await response.json();
        return result; 
    } catch (error) {
        console.error("API Call Error:", error);
        return { status: 'error', message: 'Gagal menghubungi server' };
    }
}