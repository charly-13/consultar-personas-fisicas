<?php 

	class Home extends Controllers{
		
		public function __construct()
		{
			parent::__construct();
			session_start();
		}

		public function home()
		{
			$data['page_tag'] = "Autorización para consulta de buró de crédito";
			$data['page_title'] = NOMBRE_EMPESA;
			$data['page_functions_js'] = "functions_home.js";
			$this->views->getView($this,"home",$data); 
		}

	}
 ?>
