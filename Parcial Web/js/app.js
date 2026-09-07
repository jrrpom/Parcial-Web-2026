

document.addEventListener("DOMContentLoaded", function() {
    console.log("Aplicación iniciada");
    
    const datosGuardados = localStorage.getItem("datosFinancieros");
    
    if (datosGuardados) {
        console.log("Hay datos guardados, mostrando dashboard");
        mostrarDashboard();
    } else {
        console.log("No hay datos, mostrando caracterización");
        mostrarCaracterizacion();
    }
});

function mostrarCaracterizacion() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="container mt-5">
            <div class="card">
                <div class="card-header">
                    <h2>Configuración Inicial</h2>
                </div>
                <div class="card-body">
                    <p>Bienvenido a tu gestor de finanzas personales.</p>
                    <p>Antes de comenzar, necesitamos conocer tu situación financiera.</p>
                </div>
            </div>
        </div>
    `;
}

function mostrarDashboard() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="container mt-5">
            <div class="card">
                <div class="card-header">
                    <h2>Dashboard Financiero</h2>
                </div>
                <div class="card-body">
                    <p>Bienvenido de vuelta.</p>
                    <p>Aquí verás tu resumen financiero.</p>
                </div>
            </div>
        </div>
    `;
}