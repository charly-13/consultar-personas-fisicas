document.addEventListener("DOMContentLoaded", function() {
    const fillLine = document.getElementById("fill-line");
    fillLine.style.width = "50%"; // Color de progreso

    getCatalogoEntidadfederativa();

    $("#state").select2({
        width: "100%",
    });

    $("#zipcode").select2({
        width: "100%",
    });

    $("#delegation").select2({
        width: "100%",
    });

    $("#cologne").select2({
        width: "100%",
    });
});

// Función para validar la CURP
function validarCURP(curp) {
    const regexCURP =
        /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[HM]{1}(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QR|QT|SP|SL|SR|TC|TL|TS|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/;
    return regexCURP.test(curp);
}

// Obtener el input y el resultado
const curpInput = document.getElementById("curp");
const resultadoDiv = document.getElementById("resultado");
let elementsValid = document.getElementsByClassName("valid");

// Escuchar el evento 'input' en tiempo real
curpInput.addEventListener("input", function() {
    console.log("validnando");
    const curpValue = curpInput.value.toUpperCase(); // Convertir a mayúsculas mientras escribe

    if (curpValue.length === 18) {
        // Solo validar si tiene 18 caracteres
        if (validarCURP(curpValue)) {
            curpInput.classList.remove("is-invalid");
        } else {
            curpInput.classList.add("is-invalid");
            swal("¡Verifica!", "La curp que ingresaste no es válida", "error");
        }
    } else {
        resultadoDiv.textContent = ""; // Limpiar mensaje si no tiene 18 caracteres
        resultadoDiv.className = "result";
    }
});




function getCatalogoEntidadfederativa() {
    const url = "https://api.condusef.gob.mx/sepomex/estados/";
    fetch(url)
        .then((respuesta) => respuesta.json())
        .then((resultado) => mostrarCatalogoEntidadfederativa(resultado));
}

function mostrarCatalogoEntidadfederativa(edos) {
    // $("#QuejasCP").empty().append('<option value="--seleccione--">--seleccione--</option>');
    // $("#QuejasMunId").empty().append('<option value="--seleccione--">--seleccione--</option>');
    const selectEstadosId = document.querySelector("#state");
    edos.estados.forEach((estado) => {
        let option = document.createElement("OPTION");
        option.value = estado.claveEdo;
        option.textContent = estado.estado;

        selectEstadosId.appendChild(option);
    });
}

// Funcion para mostrar catalogo Código postal
function getCatalogoCodigospostales() {
    // limpiarallinput();
    const estado_id = jQuery("#state").val();
    //api.condusef.gob.mx/sepomex/municipios/?estado_id=9&cp=05400
    const url = `https://api.condusef.gob.mx/sepomex/codigos-postales/?estado_id=${estado_id}`;
    fetch(url)
        .then((respuesta) => respuesta.json())
        .then((resultado) => mostrarCatalogoCodigospostales(resultado));
}

function mostrarCatalogoCodigospostales(codigs = []) {
    $("#zipcode")
        .empty()
        .append('<option value="--seleccione--">--seleccione--</option>');
    $("#QuejasMunId")
        .empty()
        .append('<option value="--seleccione--">--seleccione--</option>');
    $("#QuejasLocId")
        .empty()
        .append('<option value="--seleccione--">--seleccione--</option>');
    $("#QuejasColId")
        .empty()
        .append('<option value="--seleccione--">--seleccione--</option>');

    const selectCP = document.querySelector("#zipcode");

    const data = codigs.codigos_postales;
    const itemsRepetidos = {};
    const nuevoitem = [];

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (!itemsRepetidos[item.codigo_sepomex]) {
            itemsRepetidos[item.codigo_sepomex] = item.codigo_sepomex;
            nuevoitem.push(item);
        }
    }
    nuevoitem.forEach((codigo) => {
        let option = document.createElement("OPTION");
        option.value = codigo.codigo_sepomex;
        option.textContent = codigo.codigo_sepomex;

        selectCP.appendChild(option);
    });
}

// Funcion para mostrar catalogo Municipio o Alcaldía
function getCatalogoMunicipioalcaldia() {
    const estado_id = jQuery("#state").val();
    const cp = jQuery("#zipcode").val();
    //ahttps://api.condusef.gob.mx/sepomex/municipios/?estado_id=9&cp=05400
    const url = `https://api.condusef.gob.mx/sepomex/municipios/?estado_id=${estado_id}&cp=${cp}`;
    fetch(url)
        .then((respuesta) => respuesta.json())
        .then((resultado) => mostrarCatalogoMunicipioalcaldia(resultado));
}

function mostrarCatalogoMunicipioalcaldia(municip) {
    // $('#QuejasMunId option').remove();
    $("#delegation")
        .empty()
        .append('<option value="--seleccione--">--seleccione--</option>');
    $("#QuejasLocId")
        .empty()
        .append('<option value="--seleccione--">--seleccione--</option>');
    $("#QuejasColId")
        .empty()
        .append('<option value="--seleccione--">--seleccione--</option>');
    const selectQuejasMunId = document.querySelector("#delegation");
    municip.municipios.forEach((municpio) => {
        let option = document.createElement("OPTION");
        option.value = municpio.municipioId;
        option.textContent = municpio.municipio;

        selectQuejasMunId.appendChild(option);
    });
    getCatalogoColonias();
}

// Funcion para mostrar catalogo Colonias
function getCatalogoColonias() {
    const cp = jQuery("#zipcode").val();

    const url = `https://api.condusef.gob.mx/sepomex/colonias/?cp=${cp}`;
    fetch(url)
        .then((respuesta) => respuesta.json())
        .then((resultado) => mostrarCatalogoColonias(resultado));
}

function mostrarCatalogoColonias(colni) {
    $("#cologne")
        .empty()
        .append('<option value="--seleccione--">--seleccione--</option>');
    const selectQuejasColId = document.querySelector("#cologne");
    colni.colonias.forEach((colonia) => {
        let option = document.createElement("OPTION");
        option.value = colonia.coloniaId;
        option.textContent = colonia.colonia;

        selectQuejasColId.appendChild(option);
    });
}

const errorCurp = document.querySelector("#errorcurp");
const errorRfc = document.querySelector("#errorrfc");
const errorState = document.querySelector("#errorstate");
const errorZipcode = document.querySelector("#errorzipcode");
const errorDelegation = document.querySelector("#errordelegation");
const errorCologne = document.querySelector("#errorcologne");

if (document.querySelector("#formRegisterGeneral")) {
    let formRegisterGeneral = document.querySelector("#formRegisterGeneral");
    formRegisterGeneral.onsubmit = function(e) {
        e.preventDefault();
        // limpiarCampos();
        let strCurp = document.querySelector("#curp");
        let strRfc = document.querySelector("#rfc");

        let strState = document.querySelector("#state");
        let strZipcode = document.querySelector("#zipcode");
        let strDelegation = document.querySelector("#delegation");
        let strCologne = document.querySelector("#cologne");
        let elementsValid = document.getElementsByClassName("valid");

        for (let i = 0; i < elementsValid.length; i++) {
            if (elementsValid[i].classList.contains("is-invalid")) {
                swal("Atención", "Por favor verifique los campos en rojo.", "error");
                return false;
            }
        }

        if (strCurp.value == "") {
            errorCurp.textContent = "La CURP es campo requerido.";
        } else if (strRfc.value == "") {
            errorRfc.textContent = "El RFC es campo requerido.";
            // } else if (strState.value == "--selecione--") {
            //   errorState.textContent = "El Estado es campo requerido.";
            // } else if (strZipcode.value == "--selecione--") {
            //   errorZipcode.textContent = "El Código Postal es campo requerido.";
            // } else if (strDelegation.value == "--selecione--") {
            //   errorDelegation.textContent =
            //     "La Delegación o Municipio es campo requerido.";
            // } else if (strCologne.value == "--selecione--") {
            //   errorCologne.textContent = "La colonia es campo requerido.";
        } else {
            divLoading.style.display = "flex";
            let request = window.XMLHttpRequest ?
                new XMLHttpRequest() :
                new ActiveXObject("Microsoft.XMLHTTP");
            let ajaxUrl = base_url + "/Buros/update";
            let formData = new FormData(formRegisterGeneral);

            const selectState = document.getElementById("state");
            const selectZipcode = document.getElementById("zipcode");
            const selectDelegation = document.getElementById("delegation");
            const selectCologne = document.getElementById("cologne");

            const textoselectState =
                selectState.options[selectState.selectedIndex].text;
            const textoselectZipcode =
                selectZipcode.options[selectZipcode.selectedIndex].text;
            const textoselectDelegation =
                selectDelegation.options[selectDelegation.selectedIndex].text;
            const textoselectCologne =
                selectCologne.options[selectCologne.selectedIndex].text;

            formData.append(
                selectState.name,
                textoselectState === "--seleccione--" ? "" : textoselectState
            );
            formData.append(
                selectZipcode.name,
                textoselectZipcode === "--seleccione--" ? "" : textoselectZipcode
            );
            formData.append(
                selectDelegation.name,
                textoselectDelegation === "--seleccione--" ? "" : textoselectDelegation
            );
            formData.append(
                selectCologne.name,
                textoselectCologne === "--seleccione--" ? "" : textoselectCologne
            );

            request.open("POST", ajaxUrl, true);
            request.send(formData);
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    let objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        window.location.href = base_url + "/register/authorization/";
                    } else {
                        swal("Error", objData.msg, "error");
                    }
                }
                divLoading.style.display = "none";
                return false;
            };
        }
    };
}