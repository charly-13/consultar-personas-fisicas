	<!-- Footer -->
	<footer class="bg3  p-b-15">
		<div class="container">


			<div class="p-t-40">
				<p class="stext-107 cl6 txt-center">
					<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
					<?= NOMBRE_EMPESA; ?> | <?= WEB_EMPRESA; ?> | <a href="exituscapital.com" target="_blank">Exitus</a>
					<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
				</p>
			</div>
		</div>
	</footer>
	<!-- Back to top -->
	<div class="btn-back-to-top" id="myBtn">
		<span class="symbol-btn-back-to-top">
			<i class="zmdi zmdi-chevron-up"></i>
		</span>
	</div>
	<script>
	    const base_url = "<?= base_url(); ?>";

	</script>

	    <!-- QRCode.js -->
		<script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"></script>
<!--===============================================================================================-->	
	<script src="<?= media() ?>/solicitud/vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="<?= media() ?>/solicitud/vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="<?= media() ?>/solicitud/vendor/bootstrap/js/popper.js"></script>
	<script src="<?= media() ?>/solicitud/vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="<?= media() ?>/solicitud/vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="<?= media() ?>/solicitud/vendor/daterangepicker/moment.min.js"></script>
	<script src="<?= media() ?>/solicitud/vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="<?= media() ?>/solicitud/vendor/slick/slick.min.js"></script>
	<script src="<?= media() ?>/solicitud/js/slick-custom.js"></script>
<!--===============================================================================================-->
	<script src="<?= media() ?>/solicitud/vendor/parallax100/parallax100.js"></script>
<!--===============================================================================================-->
	<script src="<?= media() ?>/solicitud/vendor/MagnificPopup/jquery.magnific-popup.min.js"></script>
<!--===============================================================================================-->
	<script src="<?= media() ?>/solicitud/vendor/isotope/isotope.pkgd.min.js"></script>
<!--===============================================================================================-->
	<script src="<?= media() ?>/solicitud/vendor/sweetalert/sweetalert.min.js"></script>
<!--===============================================================================================-->
	<script src="<?= media() ?>/solicitud/vendor/perfect-scrollbar/perfect-scrollbar.min.js"></script>
<!--===============================================================================================-->

<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

<!-- <script src="<?= media();?>/js/datepicker/jquery-ui.min.js"></script> -->
	<script src="<?= media();?>/js/fontawesome.js"></script>
	<script src="<?= media() ?>/solicitud/js/main.js"></script>
	<!-- <script src="<?= media();?>/js/functions_admin.js"></script> -->
	<!-- <script src="<?= media() ?>/js/functions_login.js"></script> -->
	<script src="<?= media() ?>/solicitud/js/functions.js"></script>

	<script src="<?= media(); ?>/js/<?= $data['page_functions_js']; ?>"></script>



</body>
</html>