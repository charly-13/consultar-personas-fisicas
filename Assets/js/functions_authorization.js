// Variables para almacenar el token, refresh token y la hora de expiración
let accessToken = null;
let refreshToken = null;
let tokenExpiresAt = null;
let divLoading = document.querySelector("#divLoading");

// Espera a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", function() {
    // Obtén los elementos de los campos ocultos
    var idpersona = document.getElementById('idpersona').value;
    var phonenumber = document.getElementById('phonenumber').value;

    // Verifica si alguno de los campos está vacío
    if (!idpersona || !phonenumber) {
        // Si los valores están vacíos, recarga la página hacia la página que desees
        window.location.href = "pagina-de-referencia.php"; // Cambia 'pagina-de-referencia.php' por la página que desees redirigir
    }
});



// Función para obtener un nuevo token
async function obtenerToken() {
    try {
        const response = await fetch(
            "https://uat.firmaautografa.com/authorization-server/oauth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: "Basic Wm1Ga0xXTXlZeTF3YjNKMFlXdz06TWpoa04yUTNNbUppWVRWbVpHTTBObVl4Wmpka1lXSmpZbVEyTmpBMVpEVXpaVFZoT1dNMVpHVTROakF4TldVeE9EWmtaV0ZpTnpNd1lUUm1ZelV5WWc9PQ==",
                },
                body: new URLSearchParams({
                    grant_type: "password",
                    username: "exituscapital@naat.tech",
                    password: "2fb87bb187c9fc4ba184ed2273302e105de0e18d1e833a8e1c880eace2ac750f",
                }),
            }
        );

        const data = await response.json();
        if (response.ok) {
            accessToken = data.access_token;
            refreshToken = data.refresh_token; // Guardar el refresh token
            const expiresIn = data.expires_in; // Tiempo de expiración en segundos
            tokenExpiresAt = Date.now() + expiresIn * 1000;
            // document.getElementById('tokenDisplay').innerText = "Token obtenido: " + accessToken;
        } else {
            console.error("Error al obtener el token:", data);
            // document.getElementById('tokenDisplay').innerText = "Error al obtener el token.";
        }
    } catch (error) {
        console.error("Error de red:", error);
        // document.getElementById('tokenDisplay').innerText = "Error de red.";
    }
}

// Función para refrescar el token usando el refresh_token
async function refrescarToken() {
    try {
        const response = await fetch(
            "https://uat.firmaautografa.com/authorization-server/oauth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: "Basic Wm1Ga0xXTXlZeTF3YjNKMFlXdz06TWpoa04yUTNNbUppWVRWbVpHTTBObVl4Wmpka1lXSmpZbVEyTmpBMVpEVXpaVFZoT1dNMVpHVTROakF4TldVeE9EWmtaV0ZpTnpNd1lUUm1ZelV5WWc9PQ==",
                },
                body: new URLSearchParams({
                    grant_type: "refresh_token",
                    refresh_token: refreshToken, // Usar el refresh_token aquí
                }),
            }
        );

        const data = await response.json();
        if (response.ok) {
            accessToken = data.access_token;
            refreshToken = data.refresh_token; // Actualizar el refresh token si es necesario
            const expiresIn = data.expires_in;
            tokenExpiresAt = Date.now() + expiresIn * 1000;
            // document.getElementById('tokenDisplay').innerText = "Token renovado: " + accessToken;
        } else {
            // console.error("Error al refrescar el token:", data);
            // document.getElementById('tokenDisplay').innerText = "Error al refrescar el token.";
        }
    } catch (error) {
        // console.error("Error de red al refrescar el token:", error);
        // document.getElementById('tokenDisplay').innerText = "Error de red al refrescar el token.";
    }
}

// Función para verificar si el token sigue vigente
function tokenVigente() {
    return accessToken && Date.now() < tokenExpiresAt;
}

// Función para obtener el token si ha caducado
async function obtenerTokenSiEsNecesario() {
    if (!tokenVigente()) {
        if (refreshToken) {
            await refrescarToken(); // Intentar renovar el token con el refresh token
        } else {
            await obtenerToken(); // Obtener un nuevo token si no hay refresh_token disponible
        }
    } else {
        document.getElementById("tokenDisplay").innerText =
            "Token aún vigente: " + accessToken;
    }
}

const fillLine = document.getElementById("fill-line");
fillLine.style.width = "100%"; // Color de progreso

if (document.querySelector("#formAutorizar")) {
    let formAutorizar = document.querySelector("#formAutorizar");

    formAutorizar.onsubmit = async function(e) {
        e.preventDefault();

        // Mostrar el loader
        divLoading.style.display = "flex";

        // Validar que el código no esté vacío
        let strcode = document.querySelector("#txtCode").value;
        if (strcode === "") {
            divLoading.style.display = "none"; // Ocultar el loader
            swal("Atención", "Digita el código para su autorización.", "error");
            return false;
        }

        try {
            // Obtener el token necesario antes de continuar
            await obtenerTokenSiEsNecesario();

            // Configuración de la solicitud AJAX
            let request = window.XMLHttpRequest ?
                new XMLHttpRequest() :
                new ActiveXObject("Microsoft.XMLHTTP");
            let ajaxUrl = base_url + "/Buros/validateCode";
            let formData = new FormData(formAutorizar);

            request.open("POST", ajaxUrl, true);
            request.send(formData);

            request.onreadystatechange = async function() {
                if (request.readyState === 4 && request.status === 200) {
                    let objData = JSON.parse(request.responseText);

                    if (objData.status) {
                        // Código comentado ahora se ejecuta
                        divLoading.style.display = "flex";
                        try {
                            fetch(
                                    "https://uat.firmaautografa.com/validation/createValidation", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                            Authorization: `Bearer ${accessToken}`,
                                        },
                                        body: JSON.stringify({
                                            processName: "Confirmación Biométrica de Identidad",
                                            client: {
                                                name: objData.nombres,
                                                mail: objData.email,
                                                phone: objData.phonenumber,
                                            },
                                            steps: {
                                                location: {
                                                    order: 1,
                                                    show: true,
                                                },
                                                privacyNotice: {
                                                    order: 0,
                                                    show: false,
                                                },
                                                captureId: {
                                                    order: 2,
                                                    show: true,
                                                    features: {
                                                        provider: 2,
                                                    },
                                                },
                                                formValidationId: {
                                                    order: 3,
                                                    show: true,
                                                    input: {
                                                        forms: [{
                                                                classification: {
                                                                    countryCode: "MEX",
                                                                    cardType: 1,
                                                                    cardTypeDescription: "Passport",
                                                                },
                                                                fields: [{
                                                                        id: "name",
                                                                        inputType: "text",
                                                                        label: "Nombre(s)",
                                                                        replaceValue: true,
                                                                        value: "Full Name",
                                                                        placeholder: "Ingrese su nombre completo",
                                                                        required: true,
                                                                    },
                                                                    {
                                                                        id: "curp",
                                                                        inputType: "text",
                                                                        label: "CURP",
                                                                        replaceValue: true,
                                                                        value: "Personal Number",
                                                                        placeholder: "Ingrese su CURP",
                                                                        required: true,
                                                                    },
                                                                    {
                                                                        id: "rfc",
                                                                        inputType: "text",
                                                                        label: "RFC",
                                                                        replaceValue: true,
                                                                        value: "",
                                                                        placeholder: "Ingrese su RFC",
                                                                        required: true,
                                                                    },
                                                                    {
                                                                        id: "passportNumber",
                                                                        inputType: "text",
                                                                        label: "No. Pasaporte",
                                                                        replaceValue: true,
                                                                        value: "Document Number",
                                                                        placeholder: "Ingresa tu número de pasaporte",
                                                                        required: true,
                                                                    },
                                                                    {
                                                                        id: "address",
                                                                        inputType: "text",
                                                                        label: "DOMICILIO",
                                                                        replaceValue: true,
                                                                        value: "ADDRESS",
                                                                        placeholder: "Ingresa la direccion",
                                                                        required: true,
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                classification: {
                                                                    countryCode: "MEX",
                                                                    cardType: 14,
                                                                    cardTypeDescription: "Voter identification",
                                                                },
                                                                fields: [{
                                                                        id: "name",
                                                                        inputType: "text",
                                                                        label: "Nombre(s)",
                                                                        replaceValue: true,
                                                                        value: "Full Name",
                                                                        placeholder: "Ingrese su nombre completo",
                                                                        required: true,
                                                                    },
                                                                    {
                                                                        id: "curp",
                                                                        inputType: "text",
                                                                        label: "CURP",
                                                                        replaceValue: true,
                                                                        value: "CURP",
                                                                        placeholder: "Ingrese su CURP",
                                                                        required: true,
                                                                    },
                                                                    {
                                                                        id: "rfc",
                                                                        inputType: "text",
                                                                        label: "RFC",
                                                                        replaceValue: true,
                                                                        value: "",
                                                                        placeholder: "Ingrese su RFC",
                                                                        required: true,
                                                                    },
                                                                    {
                                                                        id: "cic",
                                                                        inputType: "text",
                                                                        label: "CIC",
                                                                        replaceValue: true,
                                                                        value: "Document Number",
                                                                        placeholder: "Ingrese su CIC",
                                                                        required: true,
                                                                    },
                                                                    {
                                                                        id: "address",
                                                                        inputType: "text",
                                                                        label: "DOMICILIO",
                                                                        replaceValue: true,
                                                                        value: "Address",
                                                                        placeholder: "Ingresa la direccion",
                                                                        required: true,
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                default: true,
                                                                fields: [{
                                                                    id: "name",
                                                                    inputType: "text",
                                                                    label: "Nombre(s)",
                                                                    placeholder: "Ingrese su nombre completo",
                                                                    required: true,
                                                                }, ],
                                                            },
                                                        ],
                                                    },
                                                },
                                                liveness: {
                                                    order: 4,
                                                    show: true,
                                                    features: {
                                                        provider: 1,
                                                    },
                                                },
                                                fingerprints: {
                                                    order: 5,
                                                    show: false,
                                                },
                                                idDetection: {
                                                    order: 7,
                                                    show: false,
                                                    input: {
                                                        identifications: [{
                                                            name: "ID_MEX_FRONT",
                                                            title: "FRENTE",
                                                        }, ],
                                                        legend: "Yo Carlos Cruz acepto que todos los datos proporcionados son verídicos.",
                                                    },
                                                },
                                            },
                                            customization: {
                                                theme: [
                                                    { key: "--fad-common-primary-color", value: "#b90020" },
                                                    {
                                                        key: "--fad-common-secondary-color",
                                                        value: "#EC0000",
                                                    },
                                                    {
                                                        key: "--fad-common-tertiary-color",
                                                        value: "#fe0000",
                                                    },
                                                    {
                                                        key: "--fad-common-successful-color",
                                                        value: "#63BA68",
                                                    },
                                                    {
                                                        key: "--fad-common-primary-button-background-color",
                                                        value: "#c8102f",
                                                    },
                                                    {
                                                        key: "--fad-common-primary-button-label-color",
                                                        value: "#FFFFFF",
                                                    },
                                                    {
                                                        key: "--fad-common-secondary-button-background-color",
                                                        value: "#FFFFFF",
                                                    },
                                                    {
                                                        key: "--fad-common-secondary-button-label-color",
                                                        value: "#c8102f",
                                                    },
                                                    {
                                                        key: "--fad-common-secondary-button-border-color",
                                                        value: "#c8102f",
                                                    },
                                                    {
                                                        key: "--fad-common-input-background-color",
                                                        value: "#f4f4f4",
                                                    },
                                                    {
                                                        key: "--fad-common-input-border-color",
                                                        value: "#d1d1d1",
                                                    },
                                                    {
                                                        key: "--fad-common-input-border-radius",
                                                        value: "8px",
                                                    },
                                                    {
                                                        key: "--fad-common-primary-text-color",
                                                        value: "#000000",
                                                    },
                                                ],
                                                header: [{
                                                    type: "IMG",
                                                    content: "https://exituscapital.mirfinancial.com.mx/desarrollosglobal/facturas/logo.png",
                                                }, ],
                                            },
                                            notifications: {
                                                email: false,
                                                whatsapp: false,
                                            },
                                        }),
                                    }
                                )
                                .then((response) => response.json())
                                .then((data) => {
                                    if (data.success) {
                                        divLoading.style.display = "none";
                                        const strValidationId = data.data.validationId;

                                        const url = 'https://uatbiometrics.firmaautografa.com/main?validationId=' + strValidationId; // URL para el QR

                                        // Crear contenedor para el código QR
                                        const qrContainer = document.createElement('div');
                                        const message = document.createElement('p');
                                        message.style.marginTop = '15px';
                                        message.style.fontSize = '15px';
                                        message.style.color = '#555';
                                        message.textContent = 'Escanea este código QR con tu celular para continuar, o si estás en una computadora, haz clic en OK para iniciar el proceso.';

                                        // Generar el QR usando la URL
                                        QRCode.toCanvas(url, { width: 200 }, function(error, canvas) {
                                            if (error) {
                                                console.error(error);
                                                swal('Error', 'No se pudo generar el código QR', 'error');
                                            } else {
                                                qrContainer.appendChild(canvas); // Añadir el canvas al contenedor

                                                // Mostrar el modal con SweetAlert2 usando "content"
                                                swal({
                                                    content: (() => {
                                                        const contentWrapper = document.createElement('div');
                                                        contentWrapper.style.textAlign = 'center';
                                                        contentWrapper.appendChild(qrContainer);
                                                        contentWrapper.appendChild(message);
                                                        return contentWrapper;
                                                    })(),
                                                    showConfirmButton: true,
                                                    confirmButtonText: 'Cerrar',
                                                    width: 400,
                                                    allowOutsideClick: () => {
                                                        window.location.href = url; // Redireccionar al hacer clic fuera del modal
                                                        return true; // Permitir el cierre del modal
                                                    }
                                                }).then((willExecute) => {
                                                    if (willExecute) {
                                                        window.location.href = url;
                                                    }
                                                });
                                            }
                                        });
                                    } else {
                                        // Si 'success' es false, mostrar un alert de error
                                        alert("Error: " + data.error);
                                    }
                                    // divLoading.style.display = "none";
                                })
                                .catch((error) => console.error("Error:", error));
                        } catch (error) {
                            console.error("Error:", error);
                        }
                    } else {
                        // s
                        // swal("¡Error!", objData.msg, "error");

                        swal({
                            icon: 'error',
                            title: '¡Algo salió mal!',
                            text: objData.msg,
                            showConfirmButton: true,
                            confirmButtonText: 'Cerrar',
                            width: 400
                        }).then((willExecute) => {
                            if (willExecute) {
                                window.location.reload(true);
                            }
                        });






                    }
                }
                // Ocultar el loader siempre al final
                divLoading.style.display = "none";
            };
        } catch (error) {
            divLoading.style.display = "none"; // Ocultar el loader en caso de error
            console.error("Error general:", error);
        }
    };
}







if (document.querySelector("#resendCode")) {
    let btnResend = document.querySelector("#resendCode");
    btnResend.addEventListener(
        "click",
        function() {
            let idpersona = document.querySelector("#idpersona").value;
            let phonenumber = document.querySelector("#phonenumber").value;

            divLoading.style.display = "flex";
            let request = window.XMLHttpRequest ?
                new XMLHttpRequest() :
                new ActiveXObject("Microsoft.XMLHTTP");
            let ajaxUrl = base_url + "/Buros/resendcode";
            let formData = new FormData();
            formData.append("idpersona", idpersona);
            formData.append("phonenumber", phonenumber);
            request.open("POST", ajaxUrl, true);
            request.send(formData);
            request.onreadystatechange = function() {
                if (request.readyState != 4) return;
                if (request.status == 200) {
                    let objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        swal("¡Bien!", objData.msg, "success");
                    } else {
                        swal("", objData.msg, "error");
                    }
                }
                divLoading.style.display = "none";
                return false;
            };
        },
        false
    );
}