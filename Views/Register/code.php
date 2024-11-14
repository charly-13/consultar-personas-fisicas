<?php 
if(!isset($_SESSION['idUser']) || isset($_SESSION['prev_page']) && $_SESSION['prev_page'] === 'general'){
  echo $_SESSION['prev_page'];
$base_url = base_url();
header("Location: $base_url");
}
	headerBuro($data);
 ?>

<br>
<br>
<div class="container mt-5 main-content">
  <h2 style="text-align: center;">Autorización para consulta de reporte de crédito</h2><br>

  <div id="inner-div" style="margin-left: 100px; margin-right: 100px;">

<div class="step-indicator">
          <div class="step-number active" id="step-1">1</div>
          <div class="step-number" id="step-2">2</div>
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

  <!-- Sección para valiar código-->
  <div class="form-section active" id="section1">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <!-- Columna de los campos -->
          <div class="col-md-6">

            <form id="formValidateCode" name="formValidateCode">
              <h4>Confirma tu código de registro</h4>
              <hr>
              <div class="row">
                <div class="col-md-8 mb-3">
                  <label for="code" class="form-label">Te hemos enviado un código a tu correo y teléfono</label>
         
                  <input type="text" class="form-control" id="code" name="code" maxlength="5" autocomplete="off">
                  <input type="hidden" class="form-control" id="idpersona" name="idpersona"
                    value="<?= $_SESSION['idUser'] ?>">

                    <input type="hidden" class="form-control" id="phonenumber" name="phonenumber"
                    value="<?= $_SESSION['phonenumber'] ?>">

                    

                </div>
                <div class="col-md-4 mb-3">
  
                  <p id="resendCode" style="color: #007BFF;cursor: pointer; margin-top: 22px;">Volver a enviar código</p>
                </div>
              </div>

              <button type="submit" class="btn btn-secondary btn-lg btn-block">Validar NIP</button>
            </form>
            <br>
          </div>

          <!-- Columna del texto y checkbox -->
          <div class="col-md-6">
            <h5>¿Por qué confirmar tu código de registro?

            </h5>
            <hr>
            <p>Confirmar tu correo nos ayuda a poder validar tu identidad.</p>

          </div>
        </div>
      </div>
    </div>
  </div>

</div>

<?php 
	footerBuro($data);
 ?>