const fillLine = document.getElementById("fill-line");
fillLine.style.width = "100%"; // Color de progreso

let formAutorizar = document.querySelector("#formAutorizar");
formAutorizar.onsubmit = function(e) {
    e.preventDefault();
    let strcode = document.querySelector("#txtCode").value;
    console.log("dando click");
    if (strcode == "") {
        swal("Atención", "Digita el código para su autorización.", "error");
        return false;
    }
    divLoading.style.display = "flex";
    let request = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject("Microsoft.XMLHTTP");
    let ajaxUrl = base_url + "/Buros/authorize";
    let formData = new FormData(formAutorizar);
    request.open("POST", ajaxUrl, true);
    request.send(formData);
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            let objData = JSON.parse(request.responseText);

            if (objData.status) {
                // window.location.href = base_url;

                swal({
                    title: "¡Proceso Autorizado!",
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
                        window.location.href = base_url + "/capturesid";
                    }
                }); 
            } else {
                document.querySelector("#txtCode").value = "";
                swal("¡Error!", objData.msg, "error");
            }
        }
        divLoading.style.display = "none";
        return false;
    };
};