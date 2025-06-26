<?php
session_start();
include("conexao.php");

$rm = $_POST['rm'];
$senha = $_POST['senha'];

$rm = mysqli_real_escape_string($conn, $rm);

// Busca só pelo RM
$sql = "SELECT * FROM alunos WHERE rm = '$rm'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);

    // Verifica a senha criptografada
    if (password_verify($senha, $row['senha'])) {
        $_SESSION['rm'] = $row['rm'];       // mantém o RM aqui
        $_SESSION['nome'] = $row['nome'];   // nome separado

        header("Location: paginaslide.php");
        exit();
    } else {
        echo "<script>alert('Senha incorreta'); window.location.href='../html/index.php';</script>";
    }
} else {
    echo "<script>alert('RM não encontrado'); window.location.href='../html/index.php';</script>";
}
?>



