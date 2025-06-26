<?php
$servidor = "localhost";
$usuario = "root";
$senha = ""; // deixe vazio se estiver no XAMPP ou altere conforme seu ambiente
$banco = "tcc";

$conn = new mysqli($servidor, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
?>
