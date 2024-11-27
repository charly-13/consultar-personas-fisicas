<?php 
	headerBuro($data);
			session_unset();
			session_destroy();
 ?>
<br>
<br>
<div class="container mt-5 main-content">
  <h2 style="text-align: center;">Autorización para consulta de reporte de crédito</h2><br>

  <div id="inner-div" style="margin-left: 100px; margin-right: 100px;">

    <div class="step-indicator">
      <div class="step-number active" id="step-1">1</div>
      <div class="step-number" id="step-2">2</div>
      <!-- <div class="step-number" id="step-3">3</div> -->
      <div class="progress-line"></div>
      <div class="progress-line fill" id="fill-line"></div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="step-title">Registro</div>
      <div class="step-title">Confirmar</div>
      <!-- <div class="step-title">Confirmar</div> -->
    </div>

  </div>
  <br>
  <!-- Sección de Registro -->
  <div class="" id="section1">
    <div class="card">
      <div class="card-body">
        <div class="row">

                  <!-- Columna del texto y checkbox -->
                  <div class="col-md-6 order-md-2 order-1">
            <h4>Acerca de tu solicitud

            </h4>
            <hr>
            <p>Realizaremos una evaluación que nos determinará la factibilidad de poder acceder a financiamiento. Al
              continuar, el solicitante forma una relación jurídica como cliente de Exitus Capital, S.A.P.I. de C.V.
              SOFOM, E.N.R. y autorizo a realizar consultar y evaluar información por mecanismos digitales, tales como
              NIP..</p>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="politicas" required>
              <label class="form-check-label" for="politicas">
                Acepto <span><a href="#">políticas de privacidad</a></span>
              </label>
            </div>

          </div>
          <!-- Columna de los campos -->
          <div class="col-md-6 order-md-1 order-2">

            <form id="formRegister" name="formRegister">
              <h4>Registro</h4>
              <hr>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="firstName" class="form-label">Primer nombre</label>
                  <input type="text" class="form-control valid validText" id="firstName" name="firstName"
                    placeholder="Ej. Miguel" autocomplete="off">
                  <span id="errorfirstName" class="text-danger"></span>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="secondName" class="form-label">Segundo nombre</label>
                  <input type="text" class="form-control" id="secondName" name="secondName" placeholder="Ej. Angel" autocomplete="off">
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="firstSurname" class="form-label">Primer apellido</label>
                  <input type="text" class="form-control valid validText" id="firstSurname" name="firstSurname"
                    placeholder="Ej. Reyes" autocomplete="off">
                  <span id="errorfirstSurname" class="text-danger"></span>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="telefono" class="form-label">Segundo apellido</label>
                  <input type="text" class="form-control valid validText" id="secondSurname" name="secondSurname"
                    placeholder="Ej. López" autocomplete="off">
                  <span id="errorsecondSurname" class="text-danger"></span>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="email" class="form-label">Correo electrónico</label>
                  <input type="email" class="form-control valid validEmail" id="email" name="email"
                    placeholder="you@example.com" autocomplete="off">
                  <span id="errorEmail" class="text-danger"></span>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="phoneNumber" class="form-label">Número celular</label>
                  <input type="tel" class="form-control valid validNumber" id="phoneNumber" name="phoneNumber"
                    placeholder="00 0000 0000" autocomplete="off">
                  <span id="errorphoneNumber" class="text-danger"></span>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 mb-3">
                  <label for="email" class="form-label">RFC con homoclave</label>
                  <input type="text" class="form-control valid" id="rfc" name="rfc"
                    placeholder="Ejemplo: ABCD123456XYZ" autocomplete="off">
                  <span id="errorRfc" class="text-danger"></span>
                </div>
              </div>



              <button type="submit" class="btn btn-secondary btn-lg btn-block" id="btnContinuar">Continuar</button>

              <p id="tokenDisplay"></p>
            </form>
          </div>


        </div>
      </div>
    </div>
  </div>

</div>

<?php 
	footerBuro($data);
 ?>