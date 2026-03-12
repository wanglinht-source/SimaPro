const GAS_URL = "https://script.google.com/macros/s/AKfycbzyUsD0v0z1qq-Q1_bLjQI0Q3vsIxE1KMOeErM9oMTFaiH3gUBZFjMmHlFGhMeidHjq/exec";

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
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return { status: 'error', message: 'Gagal menghubungi server' };
    }
}