<?php

class BurosModel extends Mysql
{
	public $intIdPerson;
	public $strfirstName;
	public $strsecondName;
	public $strfirstSurname;
	public $strsecondSurname;
	public $stremail;
	public $strphoneNumber;
	public $strcode;
	public $strdatesending;
	public $intStatus;


	public $strcurp;
	public $strrfc;
	public $strstreet;
	public $stroutsidenumber;
	public $strinsidenumber;
	public $strstate;
	public $strzipcode;
	public $strdelegation;
	public $strcologne;
	public $strcity;



	public function __construct()
	{
		parent::__construct();
	}
	public function insertPerson(string $firstName, string $secondName, string $firstSurname, string $secondSurname, string $email, string $phoneNumber, int $code, string $datesending, int $tipoid)
	{
		// $this->con = new Mysql();
		$this->strfirstName = $firstName;
		$this->strsecondName = $secondName;
		$this->strfirstSurname = $firstSurname;
		$this->strsecondSurname = $secondSurname;
		$this->stremail = $email;
		$this->strphoneNumber = $phoneNumber;
		$this->strcode = $code;
		$this->strdatesending = $datesending;
		$this->intStatus = $tipoid;
		$return = 0;
		// $sql = "SELECT * FROM person WHERE email = '{$this->stremail}' ";
		// $request = $this->select_all($sql);

		// if(empty($request))
		// {
		$query_insert  = "INSERT INTO personas_fisicas(firstname,secondname,firstsurname,secondsurname,email,phonenumber,code,datesending,rolid) 
                                  VALUES(?,?,?,?,?,?,?,?,?)";		$arrData = array(
			$this->strfirstName,
			$this->strsecondName,
			$this->strfirstSurname,
			$this->strsecondSurname,
			$this->stremail,
			$this->strphoneNumber,
			$this->strcode,
			$this->strdatesending,
			$this->intStatus		);
		$request_insert = $this->insert($query_insert, $arrData);
		$return = $request_insert;
		// }else{
		//     $return = "exist";
		// }
		return $return;
	}


	public function verificarCodigo(int $idpersona, string $code) {
		$this->intIdPerson = $idpersona;
		$this->strcode = $code;
        // Consulta SQL para obtener la fecha de creación del código
        $sql = "SELECT 
                    IF(TIMESTAMPDIFF(MINUTE, datesending, NOW()) > 5, 'caduco', 'valido') as status 
                FROM 
                    personas_fisicas 
                WHERE idpersona ='{$this->intIdPerson}' AND code = '{$this->strcode}'";	
	
        
        // Ejecutar la consulta
		$request = $this->select_all($sql);

        // Verificar si se encontró el código y retornar el estado
        if (!empty($request)) {
			return ['status' => $request[0]['status']];
        } else {
            return ['status' => 'no_encontrado'];
        }
    }

	public function updateCode(int $idpersona, string $code, string $datesending){
		$this->intIdPerson = $idpersona;
		$this->strcode = $code;
		$this->strdatesending = $datesending;
		$return = 0;
		$sqlupdate = "UPDATE personas_fisicas
		SET code = '{$this->strcode}', datesending = '{$this->strdatesending}' WHERE idpersona = '{$this->intIdPerson}'";		
		$request = $this->select_all($sqlupdate);
		if(empty($request))
		{
			$sql = "SELECT * FROM personas_fisicas WHERE idpersona = '{$this->intIdPerson}'";
			$request = $this->select_all($sql);
			return ['firstname' => $request[0]['firstname'],'firstsurname' => $request[0]['firstsurname'],'email' => $request[0]['email'],'code' => $request[0]['code'],'phonenumber' => $request[0]['phonenumber'] ];	
		}else{
			$return =0;
		}
		return $return;
		// return $request;
	}

	public function updatePerson(int $idpersona, string $curp, string $rfc, string $street, string $outsidenumber, string $insidenumber, string $zipcode, string $cologne, string $state, string $delegation, string $city){
		$this->intIdPerson = $idpersona;
		$this->strcurp = $curp;
		$this->strrfc = $rfc;
		$this->strstreet = $street;
		$this->stroutsidenumber = $outsidenumber;
		$this->strinsidenumber = $insidenumber;
		$this->strstate = $state;
		$this->strzipcode = $zipcode;
		$this->strdelegation = $delegation;
		$this->strcologne = $cologne;
		$this->strcity = $city;

		$sql = "UPDATE personas_fisicas SET curp = ?, rfc = ?, street = ?, outsidenumber = ?, insidenumber = ?, zipcode = ?, cologne = ?, state = ?, delegation = ?, city = ? WHERE idpersona = $this->intIdPerson ";
		$arrData = array($this->strcurp, 
		$this->strrfc, 
		$this->strstreet,
		$this->stroutsidenumber, 
		$this->strinsidenumber,
		$this->strzipcode,
		$this->strcologne,
		$this->strstate,
		$this->strdelegation,
		$this->strcity);
      $request = $this->update($sql,$arrData);
	  return $request;	
	}


	public function codeauthorize(int $idpersona, string $code){

		$this->intIdPerson = $idpersona;
		$this->strcode = $code;

		$sql = "SELECT * FROM personas_fisicas WHERE idpersona = '{$this->intIdPerson}' AND code = '{$this->strcode}'";
		$request = $this->select_all($sql);
		return $request;

	}
}
