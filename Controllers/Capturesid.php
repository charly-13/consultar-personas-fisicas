<?php
	class Capturesid extends Controllers{
		public function __construct()
		{
			parent::__construct();
			session_start();
			//session_regenerate_id(true);
		
		} 

		public function Capturesid()
		{
			// $data['page_functions_js'] = "functions_categorias.js";
			$this->views->getView($this,"capturesid");
		}

	}


 ?>