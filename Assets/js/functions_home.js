// Variables para almacenar el token, refresh token y la hora de expiración
let accessToken = null;
let refreshToken = null;
let tokenExpiresAt = null;

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
fillLine.style.width = "0%";

// almacenamos los posibles errores en estas variables
const errorFirtName = document.querySelector("#errorfirstName");
const errorfirstSurname = document.querySelector("#errorfirstSurname");
const errorsecondSurname = document.querySelector("#errorsecondSurname");
const errorEmail = document.querySelector("#errorEmail");
const errorphoneNumber = document.querySelector("#errorphoneNumber");

if (document.querySelector("#formRegister")) {
    let formRegister = document.querySelector("#formRegister");
    formRegister.onsubmit = async function(e) {
        e.preventDefault();
        limpiarCampos();
        let strfirstName = document.querySelector("#firstName");
        let strsecondName = document.querySelector("#secondName");
        let strfirstSurname = document.querySelector("#firstSurname");
        let strsecondSurname = document.querySelector("#secondSurname");
        let stremail = document.querySelector("#email");
        let strphoneNumber = document.querySelector("#phoneNumber");
        let elementsValid = document.getElementsByClassName("valid");

        const checkbox = document.getElementById("politicas");
        for (let i = 0; i < elementsValid.length; i++) {
            if (elementsValid[i].classList.contains("is-invalid")) {
                swal("Atención", "Por favor verifique los campos en rojo.", "error");
                return false;
            }
        }
        if (strfirstName.value == "") {
            errorFirtName.textContent = "Primer nombre es requeridooo.";
        } else if (strfirstSurname.value == "") {
            errorfirstSurname.textContent = "Primer apellido es requerido.";
        } else if (strsecondSurname.value == "") {
            errorsecondSurname.textContent = "Segundo apellido es requerido.";
        } else if (stremail.value == "") {
            errorEmail.textContent = "Email es requerido.";
        } else if (strphoneNumber.value == "") {
            errorphoneNumber.textContent = "Número celular es requerido.";
        } else if (!checkbox.checked) {
            swal(
                "Atención",
                "Asegúrate de leer y aceptar nuestras políticas de privacidad",
                "warning"
            );
            return false;
        } else {
            divLoading.style.display = "flex";

            await obtenerTokenSiEsNecesario();

            // Realizar la solicitud POST
            fetch("https://uat.firmaautografa.com/validation/createValidation", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        processName: "Validation Test",
                        client: {
                            name: strfirstName.value + " " + strfirstSurname.value,
                            mail: stremail.value,
                            phone: strphoneNumber.value,
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
                                                    id: "passportNumber",
                                                    inputType: "text",
                                                    label: "No. Pasaporte",
                                                    replaceValue: true,
                                                    value: "Document Number",
                                                    placeholder: "Ingresa tu número de pasaporte",
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
                                                    id: "cic",
                                                    inputType: "text",
                                                    label: "CIC",
                                                    replaceValue: true,
                                                    value: "Document Number",
                                                    placeholder: "Ingrese su CIC",
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
                                { key: "--fad-common-secondary-color", value: "#EC0000" },
                                { key: "--fad-common-tertiary-color", value: "#fe0000" },
                                { key: "--fad-common-successful-color", value: "#63BA68" },
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
                                { key: "--fad-common-input-background-color", value: "#f4f4f4" },
                                { key: "--fad-common-input-border-color", value: "#d1d1d1" },
                                { key: "--fad-common-input-border-radius", value: "8px" },
                                { key: "--fad-common-primary-text-color", value: "#000000" },
                            ],
                            header: [{
                                type: "IMG",
                                content: "https://exituscapital.mirfinancial.com.mx/desarrollosglobal/facturas/logo.png",
                            }, ],
                        },
                        notifications: {
                            email: true,
                            whatsapp: true,
                        },
                    }),
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        console.log("Éxito:", data.data);

                        swal({
                            title: "¡Correo enviado exitosamente.!",
                            text: "Por favor, revísalo para continuar con el proceso.",
                            icon: "success",
                            buttons: {
                                confirm: {
                                    text: "OK",
                                    value: true,
                                    visible: true,
                                    className: "",
                                    closeModal: true,
                                },
                            },
                        }).then((willExecute) => {
                            if (willExecute) {
                                // window.location.href = base_url + "/capturesid";

                                limpiarCampos();
                            }
                        });
                    } else {
                        // Si 'success' es false, mostrar un alert de error
                        alert("Error: " + data.error);
                    }

                    divLoading.style.display = "none";
                })
                .catch((error) => console.error("Error:", error));
        }
    };
}

function limpiarCampos() {
    errorFirtName.textContent = "";
    errorfirstSurname.textContent = "";
    errorsecondSurname.textContent = "";
    errorEmail.textContent = "";
    errorphoneNumber.textContent = "";
}

if (document.querySelector("#politicas")) {
    let opt = document.querySelector("#politicas");
    const button = document.querySelector("#btnContinuar");
    opt.addEventListener("click", function() {
        let opcion = this.checked;
        if (opcion) {
            button.classList.remove("btn-primary");
            button.classList.add("btn-success");
        } else {
            button.classList.remove("btn-success");
            button.classList.add("btn-primary");
        }
    });
}

function fntEmailValidate(email) {
    var stringEmail = new RegExp(
        /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})$/
    );
    if (stringEmail.test(email) == false) {
        return false;
    } else {
        return true;
    }
}

// function fntValidText() {
//     let validText = document.querySelectorAll(".validText");
//     validText.forEach(function(validText) {
//         validText.addEventListener("keyup", function() {
//             let inputValue = this.value;
//             if (!testText(inputValue)) {
//                 this.classList.add("is-invalid");
//             } else {
//                 this.classList.remove("is-invalid");
//             }
//         });
//     });
// }

function fntValidEmail() {
    let validEmail = document.querySelectorAll(".validEmail");
    validEmail.forEach(function(validEmail) {
        validEmail.addEventListener("keyup", function() {
            let inputValue = this.value;
            if (!fntEmailValidate(inputValue)) {
                this.classList.add("is-invalid");
            } else {
                this.classList.remove("is-invalid");
            }
        });
    });
}

window.addEventListener(
    "load",
    function() {
        // fntValidText();
        fntValidEmail();
    },
    false
);