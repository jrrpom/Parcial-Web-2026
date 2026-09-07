
let gastosFijosTemporales = [];


function mostrarCaracterizacion() {
    const app = document.getElementById("app");
    
    app.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-lg-8 col-md-10">
                <!-- Card principal -->
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h3 class="mb-0"> Configuración Inicial</h3>
                    </div>
                    <div class="card-body">
                        <p class="text-muted">
                            Antes de comenzar, cuéntanos sobre tu situación financiera.
                            Esta información nos ayudará a calcular tu balance.
                        </p>
                        
                        <!-- Sección de Ingresos -->
                        <h4 class="mt-4 mb-3"> Ingresos Mensuales</h4>
                        
                        <div class="mb-3">
                            <label for="ingreso-principal" class="form-label">
                                Ingreso Mensual Principal *
                            </label>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" 
                                       id="ingreso-principal" 
                                       class="form-control" 
                                       placeholder="Ej: 2000000"
                                       min="0"
                                       required>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="ingresos-adicionales" class="form-label">
                                Ingresos Adicionales (opcional)
                            </label>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" 
                                       id="ingresos-adicionales" 
                                       class="form-control" 
                                       placeholder="Ej: 300000"
                                       min="0">
                            </div>
                            <small class="text-muted">
                                Otros ingresos como trabajos freelance, rentas, etc.
                            </small>
                        </div>
                        
                        <hr class="my-4">
                        
                        <!-- Sección de Gastos Fijos -->
                        <h4 class="mb-3">Gastos Fijos Mensuales</h4>
                        
                        <div class="mb-3">
                            <label for="gasto-concepto" class="form-label">
                                Concepto del Gasto
                            </label>
                            <input type="text" 
                                   id="gasto-concepto" 
                                   class="form-control" 
                                   placeholder="Ej: Arriendo, Servicios, Internet">
                        </div>
                        
                        <div class="mb-3">
                            <label for="gasto-monto" class="form-label">
                                Monto Total del Gasto
                            </label>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" 
                                       id="gasto-monto" 
                                       class="form-control" 
                                       placeholder="Ej: 800000"
                                       min="0">
                            </div>
                        </div>
                        
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" 
                                   type="checkbox" 
                                   id="gasto-compartido">
                            <label class="form-check-label" for="gasto-compartido">
                                ¿Es un gasto compartido?
                            </label>
                        </div>
                        
                        <!-- Opciones de gasto compartido (ocultas por defecto) -->
                        <div id="opciones-compartido" style="display: none;">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="porcentaje-personal" class="form-label">
                                        % que pagas tú
                                    </label>
                                    <div class="input-group">
                                        <input type="number" 
                                               id="porcentaje-personal" 
                                               class="form-control" 
                                               placeholder="Ej: 50"
                                               min="0" 
                                               max="100">
                                        <span class="input-group-text">%</span>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="numero-personas" class="form-label">
                                        Número de personas
                                    </label>
                                    <input type="number" 
                                           id="numero-personas" 
                                           class="form-control" 
                                           placeholder="Ej: 2"
                                           min="1">
                                    <small class="text-muted">
                                        El monto se dividirá entre este número
                                    </small>
                                </div>
                            </div>
                        </div>
                        
                        <button class="btn btn-success w-100" onclick="agregarGastoFijo()">
                            ➕ Agregar Gasto Fijo
                        </button>
                        
                        <!-- Lista de gastos agregados -->
                        <div id="lista-gastos-fijos" class="mt-4">
                            <!-- Aquí se mostrarán los gastos agregados -->
                        </div>
                        
                        <hr class="my-4">
                        
                        <!-- Botón para guardar todo -->
                        <button class="btn btn-primary btn-lg w-100" onclick="guardarCaracterizacion()">
                            💾 Guardar Configuración
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById("gasto-compartido").addEventListener("change", function() {
        const opciones = document.getElementById("opciones-compartido");
        if (this.checked) {
            opciones.style.display = "block";
        } else {
            opciones.style.display = "none";
            document.getElementById("porcentaje-personal").value = "";
            document.getElementById("numero-personas").value = "";
        }
    });
}

function agregarGastoFijo() {
    const concepto = document.getElementById("gasto-concepto").value.trim();
    const monto = parseFloat(document.getElementById("gasto-monto").value);
    const esCompartido = document.getElementById("gasto-compartido").checked;
    const porcentajePersonal = parseFloat(document.getElementById("porcentaje-personal").value);
    const numeroPersonas = parseInt(document.getElementById("numero-personas").value);



    if (esCompartido) {
        if (!porcentajePersonal && !numeroPersonas) {
            alert("Debes indicar el porcentaje personal o el número de personas");
            return;
        }
        
        if (porcentajePersonal && (porcentajePersonal <= 0 || porcentajePersonal > 100)) {
            alert("El porcentaje debe estar entre 1 y 100");
            return;
        }
        
        if (numeroPersonas && numeroPersonas <= 0) {
            alert("El número de personas debe ser mayor a 0");
            return;
        }
    }
    
    if (!concepto || !monto || monto <= 0) {
        alert("Por favor ingresa un concepto y un monto válido");
        return;
    }
    
    if (esCompartido && !porcentajePersonal && !numeroPersonas) {
        alert("Si el gasto es compartido, debes indicar el % o el número de personas");
        return;
    }
    
    let montoReal = monto;
    if (esCompartido) {
        if (porcentajePersonal) {
            montoReal = monto * (porcentajePersonal / 100);
        } else if (numeroPersonas) {
            montoReal = monto / numeroPersonas;
        }
    }
    
    const gasto = {
        id: Date.now(), 
        concepto: concepto,
        monto: monto,
        esCompartido: esCompartido,
        porcentajePersonal: porcentajePersonal || null,
        numeroPersonas: numeroPersonas || null,
        montoReal: montoReal
    };
    
    gastosFijosTemporales.push(gasto);
    
    document.getElementById("gasto-concepto").value = "";
    document.getElementById("gasto-monto").value = "";
    document.getElementById("gasto-compartido").checked = false;
    document.getElementById("opciones-compartido").style.display = "none";
    document.getElementById("porcentaje-personal").value = "";
    document.getElementById("numero-personas").value = "";
    
    actualizarListaGastos();
}

function actualizarListaGastos() {
    const lista = document.getElementById("lista-gastos-fijos");
    
    if (gastosFijosTemporales.length === 0) {
        lista.innerHTML = '<p class="text-muted">No hay gastos fijos agregados.</p>';
        return;
    }
    
    lista.innerHTML = `
        <h5 class="mb-3">Gastos Agregados (${gastosFijosTemporales.length})</h5>
        ${gastosFijosTemporales.map((gasto, index) => `
            <div class="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
                <div>
                    <strong>${gasto.concepto}</strong><br>
                    <small class="text-muted">
                        Total: $${gasto.monto.toLocaleString()}
                        ${gasto.esCompartido ? 
                            `| Tu pago: $${gasto.montoReal.toLocaleString()}` : 
                            ''}
                    </small>
                </div>
                <button class="btn btn-danger btn-sm" onclick="eliminarGastoFijo(${index})">
                    🗑️
                </button>
            </div>
        `).join('')}
    `;
}

function eliminarGastoFijo(index) {
    gastosFijosTemporales.splice(index, 1);
    actualizarListaGastos();
}

function guardarCaracterizacion() {
    const ingresoPrincipal = parseFloat(document.getElementById("ingreso-principal").value);
    const ingresosAdicionales = parseFloat(document.getElementById("ingresos-adicionales").value) || 0;
    
    if (!ingresoPrincipal || ingresoPrincipal <= 0) {
        alert("Por favor ingresa tu ingreso mensual principal");
        return;
    }
    
    if (gastosFijosTemporales.length === 0) {
        alert("Agrega al menos un gasto fijo mensual");
        return;
    }
    
    const datosFinancieros = {
        perfil: {
            ingresos: {
                principal: ingresoPrincipal,
                adicionales: ingresosAdicionales
            },
            gastosFijos: gastosFijosTemporales
        },
        gastosDiarios: [],
        fechaConfiguracion: new Date().toISOString()
    };
    
    localStorage.setItem("datosFinancieros", JSON.stringify(datosFinancieros));
    
    alert("✅ ¡Configuración guardada exitosamente!");
    
    window.location.reload();
}