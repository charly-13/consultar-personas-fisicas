<?php
class Buros extends Controllers
{

	public $login;
	public function __construct()
	{
		parent::__construct();
		session_start();
	}

	public function test(){
		echo "test Controller	";
   }

   public function create()
   {
	   // error_reporting(0);
	   if ($_POST) {
		   if (empty($_POST['firstName']) || empty($_POST['firstSurname']) || empty($_POST['secondSurname']) || empty($_POST['email']) || empty($_POST['phoneNumber']) || empty($_POST['rfc'])) {
			   $arrResponse = array("status" => false, "msg" => 'Datos incorrectos.');
		   } else {
			   $strfirstName = $_POST['firstName'];
			   $strsecondName = $_POST['secondName'];
			   $strfirstSurname = $_POST['firstSurname'];
			   $strsecondSurname = $_POST['secondSurname'];
			   $stremail = $_POST['email'];
			   $strphoneNumber = $_POST['phoneNumber'];
			   $strRFC = $_POST['rfc'];
			   $intTipoId = RCLIENTES;
			   $datedatesending = date('Y-m-d H:i:s');
			   $codigo="10001";   
			   // Intentar registrar a la persona
			   $request_user = $this->model->insertPerson(
				   $strfirstName,
				   $strsecondName,
				   $strfirstSurname,
				   $strsecondSurname,
				   $stremail,
				   $strphoneNumber,
				   $strRFC,
				   $codigo, // Código aún no generado
				   $datedatesending,
				   $intTipoId
			   );
   
			   if ($request_user == 'exist') {
				   $arrResponse = array('status' => false, 'msg' => 'El registro ingresado ya se encuentra en nuestro sistema. Por favor, contacta a soporte técnico para confirmar o actualizar la información.');
			   } elseif ($request_user > 0) {
				   // Datos a enviar en el cuerpo de la solicitud SMS Buro
				   $data = [
					   "phone" => $strphoneNumber,
					   "msg" => "Tu código de registro de Exitus Capital es:",
					   "length" => 5,
					   "auth" => "ded1a34ab53bc9ef8f01dca87851b56710ce2027"
				   ];
   
				   // Inicializar cURL
				   $ch = curl_init();
				   curl_setopt($ch, CURLOPT_URL, "https://sms.contacta.mx/api/v2/otp/send");
				   curl_setopt($ch, CURLOPT_POST, 1);
				   curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data)); // Convertir los datos a JSON
				   curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				   curl_setopt($ch, CURLOPT_HTTPHEADER, [
					   'Content-Type: application/json',
					   'Content-Length: ' . strlen(json_encode($data))
				   ]);
				   
				   // Ejecutar la solicitud y obtener la respuesta
				   $response = curl_exec($ch);
				   curl_close($ch);
   
				   $smsResponse = json_decode($response, true);
   
				   // Verificar respuesta del SMS
				   if (isset($smsResponse['status']) && $smsResponse['status'] == true) {
					   // Extraer el código del mensaje
					   preg_match('/\d+/', $smsResponse['description']['message'], $coincidencias);
					   $codigo = $coincidencias[0];
   
					   // Actualizar el código generado en la base de datos
					   $this->model->updatePersonCode($request_user, $codigo);
   
					   // Configurar respuesta exitosa
					   $arrResponse = array(
						   'status' => true,
						   'msg' => 'Un código ha sido enviado a su correo y móvil. Ingréselo para seguir con el proceso.',
						   'id' => $request_user
					   );
   
					   // Configurar sesión
					   $_SESSION['idUser'] = $request_user;
					   $_SESSION['login'] = true;
					   $_SESSION['phonenumber'] = $strphoneNumber;
					   $_SESSION['email'] = $stremail;
					   $_SESSION['code'] = $codigo;
					   $_SESSION['idpersona'] = $request_user;
   
					   $nombreUsuario = $strfirstName . ' ' . $strfirstSurname;
					   $dataUsuario = array(
						   'nombreUsuario' => $nombreUsuario,
						   'email' => $stremail,
						   'code' => $codigo,
						   'asunto' => 'Código de Verificación'
					   );
   
					   sendMailLocal($dataUsuario, 'email_codigo_verificacion_uno');
				   } else {
					   // Si falla el envío del SMS
					   $arrResponse = array("status" => false, "msg" => 'Lo sentimos, ocurrió un problema al enviar el código por SMS. Por favor, inténtelo de nuevo más tarde.');
				   }
			   } else {
				   $arrResponse = array("status" => false, "msg" => 'Error al registrar la información. Inténtelo más tarde.');
			   }
   
			   echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
		   }
	   }
	   die();
   }
   
	public function validateCode()
	{
		if ($_POST) {
			if (empty($_POST['txtCode'])) {
				$arrResponse = array("status" => false, "msg" => 'Datos incorrectos.');
			} else {
				$idpersona = $_POST['idpersona'];
				$code = $_POST['txtCode'];


				$request_code = $this->model->verificarCodigo($idpersona, $code);
				// dep($request_code);
		
				$firstname = !empty($request_code['firstname']) ? $request_code['firstname'] : '';
				$secondname = !empty($request_code['secondname']) ? $request_code['secondname'] : '';
					$nombreCompleto = $firstname . ' '. $secondname;
				// Manejar la respuesta en el controlador
				if ($request_code['status'] === 'valido') { 
					// Código es válido
					$_SESSION['txtCode'] = $code;
					$_SESSION['idpersona'] = $idpersona;
					$arrResponse = array('status' => true, 'msg' => 'Código válido. Procede al siguiente paso.', 'nombres' =>$nombreCompleto, 'email' =>$request_code['email'], 'phonenumber' =>$request_code['phonenumber']);
				} elseif ($request_code['status'] === 'caduco') {
					// Código ha caducado
					// $mensaje = "El código ha caducado.";
					$arrResponse = array('status' => false, 'msg' => 'El código ingresado ha expirado.');
				} elseif ($request_code['status'] === 'no_encontrado') {
					// Código no encontrado

					$arrResponse = array('status' => false, 'msg' => 'Código no encontrado. Verifica e inténtalo de nuevo.');
				} else {
					// Error inesperado

					$arrResponse = array("status" => false, "msg" => 'Ocurrió un error inesperado.');
				}
			
			}

			echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
		}
	}

	public function resendcode()
	{
		if ($_POST) {
			if (empty($_POST['idpersona'])) {
				$arrResponse = array("status" => false, "msg" => 'Datos incorrectos.');
			} else {
				$idpersona = $_POST['idpersona'];
				$phonenumber = $_POST['phonenumber'];
				// $strCode =  generarPIN();
				$datedatesending = date('Y-m-d H:i:s');

				// Datos a enviar en el cuerpo de la solicitud SMS Buro
				$data = [
					"phone" => $phonenumber,
					"msg" => "Tu código de registro de Exitus Capital es:",
					"length" => 5,
					"auth" => "ded1a34ab53bc9ef8f01dca87851b56710ce2027"
				];

				// Inicializar cURL
				$ch = curl_init();
				// Configurar opciones de cURL
				curl_setopt($ch, CURLOPT_URL, "https://sms.contacta.mx/api/v2/otp/send");
				curl_setopt($ch, CURLOPT_POST, 1);
				curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data)); // Convertir los datos a JSON
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_HTTPHEADER, [
					'Content-Type: application/json',
					'Content-Length: ' . strlen(json_encode($data))
				]);
				// Ejecutar la solicitud y obtener la respuesta
				$response = curl_exec($ch);
				$objeto = json_decode($response);
				$objeto = $objeto->status ? 'true' : 'false';
				// Manejar errores
				if ($objeto == "false") {
					$arrResponse = array("status" => false, "msg" => 'Lo sentimos, no pudimos generar un nuevo código en este momento. Por favor, inténtalo nuevamente más tarde.');
				} else {
					// Decodificar el JSON a un array asociativo
					$data = json_decode($response, true);

					// Acceder al valor de "message"
					$mensaje = $data['description']['message'];

					// Usar una expresión regular para extraer el número
					preg_match('/\d+/', $mensaje, $coincidencias);

					// La variable $codigo contendrá el número extraído
					$codigo = $coincidencias[0];

					$request_code = $this->model->updateCode($idpersona, $codigo, $datedatesending);

					if ($request_code != 0) {
						$getnombreUsuario = $request_code['firstname'] . ' ' . $request_code['firstsurname'];
						$getemail = $request_code['email'];
						$getcode = $request_code['code'];
						$getphonenumber = $request_code['phonenumber'];


						$_SESSION['code'] = $codigo;
						$_SESSION['idpersona'] = $idpersona;

						$dataUsuario = array(
							'nombreUsuario' => $getnombreUsuario,
							'email' => $getemail,
							'code' => $codigo,
							'asunto' => 'Código de Verificación'
						);
						sendMailLocal($dataUsuario, 'email_codigo_verificacion_uno');

						

						$arrResponse = array('status' => true, 'msg' => 'Un nuevo código ha sido enviado. Verifica tu correo y teléfono.', 'nombres' =>$getnombreUsuario, 'email' =>$getemail, 'phonenumber' =>$getphonenumber);
					} else {
						$arrResponse = array('status' => false, 'msg' => 'Ocurrió un error inesperado.');
					}
				}
				// Cerrar la conexión cURL
				curl_close($ch);
				echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
			}
		}
	}

	public function update()
	{
		if ($_POST) {
			$intIdpersona = $_POST['idpersona'];
			$strcurp = $_POST['curp'];
			$strrfc = $_POST['rfc'];
			$strstreet = $_POST['street'];
			$stroutsidenumber = $_POST['outsidenumber'];
			$strinsidenumber = $_POST['insidenumber'];
			$strstate = $_POST['state'];
			$strzipcode = $_POST['zipcode'];
			$strdelegation = $_POST['delegation'];
			$strcologne = $_POST['cologne'];
			$strcity = $_POST['city'];
			$update_person = $this->model->updatePerson($intIdpersona, $strcurp, $strrfc, $strstreet, $stroutsidenumber, $strinsidenumber, $strzipcode, $strcologne, $strstate, $strdelegation, $strcity);
		
			if($update_person>0){
				$arrResponse = array('status' => true, 'msg' => 'Datos guardados correctamente.');
			}else{
				$arrResponse = array("status" => false, "msg" => 'No es posible actualizar los datos.');
			}

			echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
		}
	}


 	public function authorize(){
		if($_POST){

			if (empty($_POST['txtCode'])) {
				$arrResponse = array("status" => false, "msg" => 'Datos incorrectos.');
			} else {
				$idpersona = $_POST['idpersona'];
				$code = $_POST['txtCode'];
				$request_authorize = $this->model->codeauthorize($idpersona,$code);

				for ($i=0; $i < count($request_authorize); $i++) {
				if(empty($request_authorize))
				{
					$arrResponse = array('status' => false, 'msg' => 'El código de autorización proporcionado es incorrecto');
				}else{
					$nombreCompleto = $request_authorize[$i]['firstname'] . " " . $request_authorize[$i]['secondname'];

					$arrResponse = array('status' => true, 'msg' => 'Su autorización para la consulta de su historial crediticio ha sido confirmada correctamente.', 'nombres' =>$nombreCompleto, 'email' =>$request_authorize[$i]['email'], 'phonenumber' =>$request_authorize[$i]['phonenumber']);
				}
			}
			}

			
			echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
			
		}
	}
}
