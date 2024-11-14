<?php 

	class Errors extends Controllers{
		public function __construct()
		{
			parent::__construct();
		}

		public function notFound()
		{

				$data['page_tag'] = NOMBRE_EMPESA;
				$data['page_title'] = NOMBRE_EMPESA;
				$this->views->getView($this,"error",$data);
			
		}
	}


	$notFound = new Errors();
	$notFound->notFound();
 ?>