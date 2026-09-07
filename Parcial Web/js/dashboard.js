
function mostrarDashboard() {
    const datosGuardados = localStorage.getItem("datosFinancieros");
    
    if (!datosGuardados) {
        mostrarCaracterizacion();
        return;
    }
    
    const datos = JSON.parse(datosGuardados);
    
    const ingresosTotales = datos.perfil.ingresos.principal + datos.perfil.ingresos.adicionales;
    const gastosFijosTotales = datos.perfil.gastosFijos.reduce((total, gasto) => total + gasto.montoReal, 0);
    const balanceInicial = ingresosTotales - gastosFijosTotales;
    const gastosVariables = datos.gastosDiarios.reduce((total, gasto) => total + gasto.monto, 0);
    const balanceActual = balanceInicial - gastosVariables;
    
    const app = document.getElementById("app");
    
    app.innerHTML = `
        <!-- Panel de Resumen -->
        <div class="row mb-4">
            <div class="col-md-3 mb-3">
                <div class="card bg-success text-white h-100">
                    <div class="card-body">
                        <h6 class="card-title">Ingresos Totales</h6>
                        <h3 class="card-text">$${formatearMoneda(ingresosTotales)}</h3>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3 mb-3">
                <div class="card bg-danger text-white h-100">
                    <div class="card-body">
                        <h6 class="card-title">Gastos Fijos</h6>
                        <h3 class="card-text">$${formatearMoneda(gastosFijosTotales)}</h3>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3 mb-3">
                <div class="card bg-primary text-white h-100">
                    <div class="card-body">
                        <h6 class="card-title">Balance Inicial</h6>
                        <h3 class="card-text">$${formatearMoneda(balanceInicial)}</h3>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3 mb-3">
                <div class="card bg-warning text-dark h-100">
                    <div class="card-body">
                        <h6 class="card-title">Gastos Variables</h6>
                        <h3 class="card-text">$${formatearMoneda(gastosVariables)}</h3>
                    </div>
                </div>
            </div>
        </div>
        
            <!-- Balance Actual -->
            <div class="alert ${balanceActual >= 0 ? 'alert-success' : 'alert-danger'} mb-4">
                <h4 class="alert-heading">
                    ${balanceActual >= 0 ? 'Correcto' : 'Advertencia'} Balance Actual del Mes
                </h4>
                <h2>$${formatearMoneda(balanceActual)}</h2>
                <small>
                    ${balanceActual >= 0 
                        ? 'Vas bien con tus finanzas este mes' 
                        : 'Has gastado más de lo presupuestado'}
                </small>
                <div class="progress mt-2" style="height: 20px;">
                    <div class="progress-bar ${balanceActual >= 0 ? 'bg-success' : 'bg-danger'}" 
                        style="width: ${Math.min(100, Math.max(0, (balanceActual / ingresosTotales) * 100))}%">
                        ${Math.round(Math.min(100, Math.max(0, (balanceActual / ingresosTotales) * 100)))}%
                    </div>
                </div>
            </div>
        
        <div class="row">
            <!-- Formulario de Gastos Diarios -->
            <div class="col-lg-4 mb-4">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">➕ Registrar Gasto Diario</h5>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="form-label">Concepto</label>
                            <input type="text" 
                                   id="gasto-diario-concepto" 
                                   class="form-control" 
                                   placeholder="Ej: Almuerzo, Taxi, Cine">
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Monto</label>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" 
                                       id="gasto-diario-monto" 
                                       class="form-control" 
                                       placeholder="Ej: 15000"
                                       min="0">
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Categoría</label>
                            <select id="gasto-diario-categoria" class="form-select">
                                <option value="Comida">🍔 Comida</option>
                                <option value="Ocio">🎮 Ocio</option>
                                <option value="Transporte">🚌 Transporte</option>
                                <option value="Varios">📦 Varios</option>
                            </select>
                        </div>
                        
                        <button class="btn btn-primary w-100" onclick="agregarGastoDiario()">
                            Guardar Gasto
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Lista de Gastos -->
            <div class="col-lg-8">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">Gastos del Mes</h5>
                    </div>
                    <div class="card-body">
                        <div id="lista-gastos-diarios">
                            ${mostrarListaGastos(datos.gastosDiarios)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function formatearMoneda(valor) {
    return valor.toLocaleString('es-CO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

function mostrarListaGastos(gastos) {
    if (!gastos || gastos.length === 0) {
        return `
            <div class="text-center text-muted py-4">
                <p class="mb-0">No hay gastos registrados este mes</p>
                <small>Comienza registrando tu primer gasto</small>
            </div>
        `;
    }
    
    return `
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                 <tr>
                    <th>Concepto</th>
                    <th>Categoría</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${gastos.map(gasto => `
                    <tr>
                        <td>${gasto.concepto}</td>
                        <td>
                            <span class="badge bg-secondary">${gasto.categoria}</span>
                        </td>
                        <td>${new Date(gasto.fecha).toLocaleDateString('es-CO')}</td>
                        <td>$${formatearMoneda(gasto.monto)}</td>
                        <td>
                            <button class="btn btn-danger btn-sm" 
                                    onclick="eliminarGastoDiario(${gasto.id})">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                `).join('')}
             </tbody>
            </table>
        </div>
    `;
}

function agregarGastoDiario() {
    const concepto = document.getElementById("gasto-diario-concepto").value.trim();
    const monto = parseFloat(document.getElementById("gasto-diario-monto").value);
    const categoria = document.getElementById("gasto-diario-categoria").value;
    
    if (!concepto) {
        alert("Por favor ingresa un concepto");
        return;
    }

    if (!monto || monto <= 0) {
        alert("Por favor ingresa un monto válido");
        return;
    }
    
    const datos = JSON.parse(localStorage.getItem("datosFinancieros"));
    
    const nuevoGasto = {
        id: Date.now(),
        concepto: concepto,
        monto: monto,
        categoria: categoria,
        fecha: new Date().toISOString()
    };
    
    datos.gastosDiarios.push(nuevoGasto);
    
    localStorage.setItem("datosFinancieros", JSON.stringify(datos));
    
    mostrarDashboard();
}

function eliminarGastoDiario(id) {
    if (!confirm("¿Estás seguro de eliminar este gasto?")) {
        return;
    }
    
    const datos = JSON.parse(localStorage.getItem("datosFinancieros"));
    
    datos.gastosDiarios = datos.gastosDiarios.filter(gasto => gasto.id !== id);
    
    localStorage.setItem("datosFinancieros", JSON.stringify(datos));
    
    mostrarDashboard();
}