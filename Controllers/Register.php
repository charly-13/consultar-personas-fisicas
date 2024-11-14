<?php
class Register extends Controllers
{
	public function __construct()
	{
		parent::__construct();
		session_start();
		// getPermisos(MDPAGINAS);
	}

	public function code()
	{

		$data['page_tag'] = "Autorización para consulta de buró de crédito";
		$data['page_title'] = NOMBRE_EMPESA;
		$data['page_functions_js'] = "functions_register.js";
		$this->views->getView($this, "code", $data);
	}


	public function general()
	{

		$data['page_tag'] = "Autorización para consulta de buró de crédito";
		$data['page_title'] = NOMBRE_EMPESA;
		$data['page_functions_js'] = "functions_general.js";
		$this->views->getView($this, "general", $data);
	}


	
	public function authorization()
	{
		$data['page_tag'] = "Autorización para consulta de buró de crédito";
		$data['page_title'] = NOMBRE_EMPESA;
		$data['page_functions_js'] = "functions_authorization.js";
		$this->views->getView($this, "authorization", $data);
	}
}
