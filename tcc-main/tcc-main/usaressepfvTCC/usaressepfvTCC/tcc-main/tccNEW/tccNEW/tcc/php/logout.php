<?php
session_start();
session_unset(); // limpa as variáveis da sessão
session_destroy(); // destrói a sessão
header("Location: ../html/index.php"); // redireciona para o login
exit;
?>