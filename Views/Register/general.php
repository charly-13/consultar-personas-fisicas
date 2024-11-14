<?php 

if(!isset($_SESSION['idUser']) || isset($_SESSION['prev_page']) && $_SESSION['prev_page'] === 'authorization'){
  // echo $_SESSION['prev_page'];
$base_url = base_url();
header("Location: $base_url");
}
	headerBuro($data);
  $_SESSION['prev_page'] = 'general';
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



	      <!-- Sección de Registro -->
		  <div class="form-section active" id="section1">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <!-- Columna de los campos -->
              <div class="col-md-7">
			  
			  <form  id="formRegisterGeneral" name="formRegisterGeneral">
                <h4>Datos generales</h4>
      
				<hr>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <input type="hidden" class="form-control" id="idpersona" name="idpersona" value="<?= $_SESSION['idUser'] ?>">
                    <label for="curp" class="form-label">CURP</label>
                    <input type="text" class="form-control valid" id="curp" name="curp" placeholder="" autocomplete="off" maxlength="18">
					<span id="errorcurp" class="text-danger"></span>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="rfc" class="form-label">RFC con homoclave</label>
                    <input type="text" class="form-control" id="rfc" name="rfc"  placeholder="" autocomplete="off">
                    <span id="errorrfc" class="text-danger"></span>
                  </div>
                </div>


                <div class="row">
                <div class="col-md-12 mb-3">
                  <p>¿No conoces tu CURP? <a href="#">Consultalo aquí.</a></p>
                  </div>
                </div>

                <h4>Domicilio</h4>
                <hr>


                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="street" class="form-label">Calle</label>
                    <input type="text" class="form-control" id="street" name="street" autocomplete="off">
					<span id="errorstreet" class="text-danger"></span>
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="outsidenumber" class="form-label">Número exterior</label>
                    <input type="text" class="form-control" id="outsidenumber" name="outsidenumber" autocomplete="off">				
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="insidenumber" class="form-label">Número interior</label>
                    <input type="text" class="form-control" id="insidenumber" name="insidenumber" autocomplete="off">
	
                  </div>
                </div>


                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="state" class="form-label">Estado</label>
                    <select class="form-select form-control" id="state" name="state" onchange="getCatalogoCodigospostales()">
                              <option value="--selecione--">--selecione--</option>
                            </select>

                            <span id="errorstate" class="text-danger"></span>
		
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="zipcode" class="form-label">Código postal</label>

                    <select class="form-select form-control" id="zipcode" name="zipcode" onchange="getCatalogoMunicipioalcaldia()">
                              <option  value="--selecione--">--selecione--</option>
                            </select>
                            <span id="errorzipcode" class="text-danger"></span>
				
                  </div>
                </div>


                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="delegation" class="form-label">Delegación/Municipio</label>
                    <select class="form-select form-control" id="delegation" name="delegation" onchange="getCatalogoLocalidades()">
                              <option value="--selecione--">--selecione--</option>
                            </select>

                            <span id="errordelegation" class="text-danger"></span>
		
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="cologne" class="form-label">Colonia</label>

                    <select class="form-select form-control" id="cologne" name="cologne">
                              <option value="--selecione--">--selecione--</option>
                            </select>
                            <span id="errorcologne" class="text-danger"></span>
				
                  </div>
                </div>





                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="city" class="form-label">Ciudad</label>
                    <input type="text" class="form-control" id="city" name="city" autocomplete="off">			
					
                  </div>

                </div>



				<button type="submit" class="btn btn-secondary btn-lg btn-block" id="btnContinuar">Continuar</button>
				</form>
        <br>
              </div>
              
              <!-- Columna del texto y checkbox -->
              <div class="col-md-5">
			  <h4>¿Por qué pedimos esta información?

</h4>
			  <hr>
                <p>Usaremos esta información para evaluar tu aplicación y consultar tu historial crediticio a Buro de Crédito.</p>         
              </div>
            </div>
          </div>
        </div>
      </div>
	
 
  </div>



  <!-- 
  <script>
        const fillLine = document.getElementById('fill-line');
          fillLine.style.width = '50%'; // Color de progreso

          document.addEventListener('DOMContentLoaded', function() {
      // Tu función aquí
      console.log('El DOM está completamente cargado');
  });
  </script> -->
<?php 
	footerBuro($data);
 ?>

