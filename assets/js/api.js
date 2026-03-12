const GAS_URL = "https://script.google.com/macros/s/AKfycbzYfMyswp1m6BHfQ8y3Al7wwT5mjqh17hPqkgJy00Lh6L1_3vY0iBWwwVNuAujY4wP-SQ/exec";

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