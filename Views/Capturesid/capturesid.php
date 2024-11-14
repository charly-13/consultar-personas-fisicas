<!DOCTYPE html>
<html lang="es">

<head>
	<link rel="icon" type="image/png" href="<?= media() ?>/solicitud/images/icon_exitus.jpg"/>
	<title>Autorización para consulta de buró de crédito</title>
<!-- 	<link rel="stylesheet" href="../../index.css" /> -->

<style type="text/css">
	html,
body {
 height: 100%;
 width: 100%;
 margin: 0;
}

#container-result {
 display: none;
 flex-direction: column;
 font-family: system-ui;
 margin: 5%;
 max-width: 100%;
 word-break: break-all;
}


a { 
		padding: 10px;
    border-radius: 6px;
    border-width: 1px;
    border-style: solid;
    display: block;
    text-align: center;
    margin: 10px;
    appearance: none;
    text-decoration: none;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

}

.buttons {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
}
</style>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body>
	<h1>Capture id</h1>
	<div id="container-result">
		<div>
			<p><strong>Front Identification image: </strong></p>
			<img id="image-id-front" width="300px" alt="" />
		</div>
		<div>
			<p><strong>Back Identification image: </strong></p>
			<img id="image-id-back" width="300px" alt="" />
		</div>
		<div>
			<p><strong> OCR: </strong></p>
			<span id="ocr"></span>
		</div>
	</div>
 
	<!-- <a href="../../index.html"> Regresar </a> -->

<!-- 	<script src="capture-id-example.js" type="module"></script> -->
    <script src="<?= media(); ?>/js/biometric/captura_id/capture-id-example.js" type="module"></script>
</body>

</html>