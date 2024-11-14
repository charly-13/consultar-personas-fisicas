<?php
headerBuro($data);
$_SESSION['prev_page'] = 'authorization';
?>
<br>
<br>
<div class="container mt-5 main-content">
    <h2 style="text-align: center;">Autorización para consulta de reporte de crédito</h2><br>


    <div id="inner-div" style="margin-left: 100px; margin-right: 100px;">

        <div class="step-indicator">
            <div class="step-number active" id="step-1">1</div>
            <div class="step-number active" id="step-2">2</div>
            <div class="step-number" id="step-3">3</div>
            <div class="progress-line"></div>
            <div class="progress-line fill" id="fill-line"></div>
        </div>
        <div class="d-flex justify-content-between">
            <div class="step-title">Registro</div>
            <div class="step-title">General</div>
            <div class="step-title">Confirmar</div>
        </div>

    </div>
    <br>



    <!-- Sección de Registro -->
    <div class="form-section active" id="section1">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <!-- Columna de los campos -->
                    <div class="col-md-12">
                        <h4>Autorización de consulta de historial crediticio</h4>
                        <br>
                        <p>Por este conducto autorizo expresamente a EXITUS CAPITAL, S.A.P.I. DE C.V., SOFOM, E.N.R., para que por conducto de sus funcionarios facultados lleve a cabo Investigaciones, sobre mi comportamiento crediticio o el de la Empresa que represento en Trans Union de México, S. A. SIC y/o Dun & Bradstreet, S.A. SIC


                        <p>Así mismo, declaro que conozco la naturaleza y alcance de la información que se solicitará, del uso que EXITUS CAPITAL, S.A.P.I. DE C.V., SOFOM, E.N.R., hará de tal información y de que ésta podrá realizar consultas periódicas sobre mi historial o el de la empresa que represento, consintiendo que esta autorización se encuentre vigente por un período de 3 años contados a partir de su expedición y en todo caso durante el tiempo que se mantenga la relación jurídica.
                        </p>
                        <p>En caso de que la solicitante sea una Persona Moral, declaro bajo protesta de decir verdad Ser Representante Legal de la empresa mencionada en esta autorización; manifestando que a la fecha de firma de la presente autorización los poderes no me han sido revocados, limitados, ni modificados en forma alguna.</p>
                        </p>
                    </div>

                    <!-- Columna del texto y checkbox -->
                    <div class="col-md-6">
 
                    <form id="formAutorizar" name="formAutorizar">
                        <div class="row">

                            <div class="col-md-12 mb-3">
                            
                                    <label for="state" class="form-label">Confirma tu código de registro</label>
                                    <input type="hidden" class="form-control" id="idpersona" name="idpersona" value="<?= $_SESSION['idpersona'] ?>">
                                    <input type="text" class="form-control" id="txtCode" name="txtCode" maxlength="5" autocomplete="off">
                                    <br>
                                    <button type="submit" class="btn btn-secondary btn-lg btn-block">AUTORIZAR</button>
                                
                            </div>                      



                        </div>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <div style="margin-top: 10px;"> <p>Tu código de registro es: <strong><?= $_SESSION['code'] ?></strong></p></div>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>


</div>




<!-- <script>
    const fillLine = document.getElementById('fill-line');
    fillLine.style.width = '100%'; // Color de progreso
</script> -->
<?php
footerBuro($data);
?>