
document.addEventListener("DOMContentLoaded", function() {
    console.log("Aplicación iniciada");
    
    const datosGuardados = localStorage.getItem("datosFinancieros");
    
    if (datosGuardados) {
        mostrarDashboard();
        mostrarBotonReset();
    } else {
        mostrarCaracterizacion();
        ocultarBotonReset();
    }
});

function mostrarBotonReset() {
    const navbarButtons = document.getElementById("navbar-buttons");
    navbarButtons.innerHTML = `
        <button class="btn btn-outline-light btn-sm" onclick="resetearAplicacion()">
            Resetear / Reconfigurar
        </button>
    `;
}

function ocultarBotonReset() {
    const navbarButtons = document.getElementById("navbar-buttons");
    navbarButtons.innerHTML = "";
}

function resetearAplicacion() {
    const confirmacion = confirm("¿Estás seguro de que deseas borrar todos los datos? Esta acción no se puede deshacer.");
    
    if (confirmacion) {
        localStorage.clear();
        window.location.reload();
    }
}