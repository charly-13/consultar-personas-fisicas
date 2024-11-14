<?php 
    headerBuro($data);
?>
<script>
  document.querySelector('header').classList.add('header-v4');
</script>
<div class="container text-center">
	<main class="app-content">
      <div class="page-error tile">
        <h1>Página no encontrada</h1>
        <p><a class="btn btn-dark" href="<?= base_url(); ?>">Regresar</a></p>
      </div>
    </main>
</div>
<?php footerBuro($data); ?>

