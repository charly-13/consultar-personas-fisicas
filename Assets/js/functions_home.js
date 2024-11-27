const fillLine = document.getElementById("fill-line");
fillLine.style.width = "0%";

const errorFirtName = document.querySelector("#errorfirstName");
const errorfirstSurname = document.querySelector("#errorfirstSurname");
const errorsecondSurname = document.querySelector("#errorsecondSurname");
const errorEmail = document.querySelector("#errorEmail");
const errorphoneNumber = document.querySelector("#errorphoneNumber");
const errorRfc = document.querySelector("#errorRfc");
// Expresión regular para validar un RFC
const rfcRegex = /^([A-ZÑ&]{3,4})\d{6}([A-Z\d]{3})?$/;

if (document.querySelector("#formRegister")) {
    let formRegister = document.querySelector("#formRegister");
    formRegister.onsubmit = function(e) {
        e.preventDefault();
        limpiarCampos();
        let strfirstName = document.querySelector("#firstName");
        let strfirstSurname = document.querySelector("#firstSurname");
        let strsecondSurname = document.querySelector("#secondSurname");
        let stremail = document.querySelector("#email");
        let strphoneNumber = document.querySelector("#phoneNumber");
        let elementsValid = document.getElementsByClassName("valid");

        // const rfcInput = document.getElementById('rfc');
        let rfcInput = document.querySelector("#rfc");
        let rfc = rfcInput.value.trim().toUpperCase();

        const checkbox = document.getElementById("politicas");
        for (let i = 0; i < elementsValid.length; i++) {
            if (elementsValid[i].classList.contains("is-invalid")) {
                swal("Atención", "Por favor verifique los campos en rojo.", "error");
                return false;
            }
        }
        if (strfirstName.value == "") {
            errorFirtName.textContent = "Primer nombre es requerido.";
        } else if (strfirstSurname.value == "") {
            errorfirstSurname.textContent = "Primer apellido es requerido.";
        } else if (strsecondSurname.value == "") {
            errorsecondSurname.textContent = "Segundo apellido es requerido.";
        } else if (stremail.value == "") {
            errorEmail.textContent = "Email es requerido.";
        } else if (strphoneNumber.value == "") {
            errorphoneNumber.textContent = "Número celular es requerido.";
        } else if (rfcInput.value == "") {
            errorRfc.textContent = "RFC es requerido.";
        } else if (!rfcRegex.test(rfc)) {
            errorRfc.textContent = "El RFC no es válido. Por favor verifica.";
        } else if (!checkbox.checked) {
            swal(
                "Atención",
                "Asegúrate de leer y aceptar nuestras políticas de privacidad",
                "warning"
            );
            return false;
        } else {
            divLoading.style.display = "flex";
            let request = window.XMLHttpRequest ?
                new XMLHttpRequest() :
                new ActiveXObject("Microsoft.XMLHTTP");
            let ajaxUrl = base_url + "/Buros/create";
            let formData = new FormData(formRegister);
            request.open("POST", ajaxUrl, true);
            request.send(formData);
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    let objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        swal({
                            title: "¡Bien!",
                            text: objData.msg,
                            icon: "success", // Cambia "error" a "success"
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
                                window.location.href = base_url + "/register/authorization/";
                            }
                        });

                    } else {
                        // swal("Error", objData.msg, "error");
                        swal({
                            title: 'Registro duplicado detectado',
                            text: objData.msg,
                            icon: 'warning',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#3085d6',
                        });
                    }
                }
                divLoading.style.display = "none";
                return false;
            };
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