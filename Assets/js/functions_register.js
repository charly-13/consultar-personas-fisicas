const fillLine = document.getElementById("fill-line");
fillLine.style.width = "50%";
if (document.querySelector("#formValidateCode")) {
    let formValidateCode = document.querySelector("#formValidateCode");
    formValidateCode.onsubmit = function(e) {
        e.preventDefault();
        let intCode = document.querySelector("#code").value;
        let intidpersona = document.querySelector("#idpersona").value;
        if (intCode == "") {
            swal("Atención", "Digita el código.", "error");
            return false;
        }
        const Divsection1 = document.getElementById("section1");
        divLoading.style.display = "flex";
        let request = window.XMLHttpRequest ?
            new XMLHttpRequest() :
            new ActiveXObject("Microsoft.XMLHTTP");
        let ajaxUrl = base_url + "/Buros/validateCode";
        let formData = new FormData(formValidateCode);
        request.open("POST", ajaxUrl, true);
        request.send(formData);
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                let objData = JSON.parse(request.responseText);

                if (objData.status) {
                    window.location.href = base_url + "/register/general";
                } else {
                    document.querySelector("#code").value = "";
                    swal("¡Error!", objData.msg, "error");
                }
            }
            divLoading.style.display = "none";
            return false;
        };
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