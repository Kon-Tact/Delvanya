// Vérifier si l'utilisateur est sur un appareil mobile
function detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Rediriger vers la version mobile si l'utilisateur est sur un appareil mobile
if (detectMobile()) {
    window.location.href = "m.index.html";
}