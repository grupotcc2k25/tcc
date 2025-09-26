-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 26-Set-2025 às 19:33
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `tcc`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `acp`
--

CREATE TABLE `acp` (
  `idACP` int(11) NOT NULL,
  `nomeEvento` varchar(100) DEFAULT NULL,
  `nomePalestrante` varchar(100) DEFAULT NULL,
  `informacaoPalestrante` text DEFAULT NULL,
  `tipoEvento` varchar(50) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `horario` time DEFAULT NULL,
  `quantidadeHoras` int(11) DEFAULT NULL,
  `idEmpresa` int(11) DEFAULT NULL,
  `idCoordenacao` int(11) DEFAULT NULL,
  `idAluno` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `alunos`
--

CREATE TABLE `alunos` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `rm` char(5) NOT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `alunos`
--

INSERT INTO `alunos` (`id`, `nome`, `rm`, `senha`, `email`) VALUES
(2, 'Pedro Henrique Almeida Mesquita', '25633', '$2y$10$QANwNlkQ2L2f5UX.YkJ/H.Ammullt7bGyzbuXWFKOgSia.zEi0qqu', 'pedro.mesquita7@etec.sp.gov.br'),
(3, 'Sérgio Frazon Bandeira da Silva', '25719', '$2y$10$obHJum3dNfKEGwevsa4FNeYNZAXbBVXYsWuiW.zVtxZB/hbS5z9T.', 'sergio.silva337@etec.sp.gov.br'),
(4, 'Ana Clara de Oliveira Bertoloto', '25671', '$2y$10$AvsxioKH/L2AQYKs5NhfsOoasLjD97RS10fP2dBMtBY4T1EEemKp2', 'ana.bertoloto@etec.sp.gov.br'),
(5, 'Murilo Henrique Leite da Silva', '25587', '$2y$10$hzF4DiKxwoiaKxSPmvmGB.BBIuJawxlBuSOJQpo41b363fhoDPwYO', 'murilo.silva383@etec.sp.gov.br'),
(6, 'Raphael Fernandes Rosa', '26072', '$2y$10$MEv/bL3Pw3MFp1CONIc5UedgrytQYxyLpi7yWgeZe6FgxUCH0iegO', 'raphael.rosa2@etec.sp.gov.br');

-- --------------------------------------------------------

--
-- Estrutura da tabela `certificados`
--

CREATE TABLE `certificados` (
  `idCertificado` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `dataEmissao` date DEFAULT NULL,
  `URL` varchar(255) DEFAULT NULL,
  `quantidadeHoras` int(11) DEFAULT NULL,
  `instituicao` varchar(100) DEFAULT NULL,
  `idAluno` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `certificados`
--

INSERT INTO `certificados` (`idCertificado`, `titulo`, `dataEmissao`, `URL`, `quantidadeHoras`, `instituicao`, `idAluno`) VALUES
(11, 'robocode', '2025-08-03', 'uploads/68afb5d6e43c6-68a61c5107e15.pdf', 18, 'Minha Instituição', 4),
(14, 'sada', '2025-09-13', 'uploads/25719_S__rgio_Frazon_Bandeira_da_Silva_sada.jpg', 12, '3°AMS Ourinhos', 3),
(15, 'python', '2025-09-04', 'uploads/25633_Pedro_Henrique_Almeida_Mesquita_python.pdf', 32, '3°AMS Ourinhos', 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `coordenacao`
--

CREATE TABLE `coordenacao` (
  `idCoordenacao` int(11) NOT NULL,
  `nomeCoordenador` varchar(100) DEFAULT NULL,
  `login` varchar(50) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL,
  `idAluno` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa`
--

CREATE TABLE `empresa` (
  `idEmpresa` int(11) NOT NULL,
  `nomeEmpresa` varchar(100) DEFAULT NULL,
  `cnpj` varchar(20) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `participa`
--

CREATE TABLE `participa` (
  `idAluno` int(11) NOT NULL,
  `idACP` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `relatorios`
--

CREATE TABLE `relatorios` (
  `idRelatorios` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `dataEmissao` date NOT NULL,
  `URL` varchar(255) NOT NULL,
  `quantidadeHoras` char(200) NOT NULL,
  `instituicao` varchar(200) DEFAULT NULL,
  `idAluno` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `relatorios`
--

INSERT INTO `relatorios` (`idRelatorios`, `titulo`, `dataEmissao`, `URL`, `quantidadeHoras`, `instituicao`, `idAluno`) VALUES
(9, 'sasa', '2025-09-03', 'uploads/25633_Pedro_Henrique_Almeida_Mesquita_sasa.docx', '12', '3°AMS Ourinhos', 2);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `acp`
--
ALTER TABLE `acp`
  ADD PRIMARY KEY (`idACP`),
  ADD KEY `idEmpresa` (`idEmpresa`),
  ADD KEY `idCoordenacao` (`idCoordenacao`),
  ADD KEY `idAluno` (`idAluno`);

--
-- Índices para tabela `alunos`
--
ALTER TABLE `alunos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rm` (`rm`);

--
-- Índices para tabela `certificados`
--
ALTER TABLE `certificados`
  ADD PRIMARY KEY (`idCertificado`),
  ADD KEY `idAluno` (`idAluno`);

--
-- Índices para tabela `coordenacao`
--
ALTER TABLE `coordenacao`
  ADD PRIMARY KEY (`idCoordenacao`),
  ADD KEY `idAluno` (`idAluno`);

--
-- Índices para tabela `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`idEmpresa`);

--
-- Índices para tabela `participa`
--
ALTER TABLE `participa`
  ADD PRIMARY KEY (`idAluno`,`idACP`),
  ADD KEY `idACP` (`idACP`);

--
-- Índices para tabela `relatorios`
--
ALTER TABLE `relatorios`
  ADD PRIMARY KEY (`idRelatorios`),
  ADD KEY `idAluno` (`idAluno`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `acp`
--
ALTER TABLE `acp`
  MODIFY `idACP` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `alunos`
--
ALTER TABLE `alunos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `certificados`
--
ALTER TABLE `certificados`
  MODIFY `idCertificado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de tabela `coordenacao`
--
ALTER TABLE `coordenacao`
  MODIFY `idCoordenacao` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `empresa`
--
ALTER TABLE `empresa`
  MODIFY `idEmpresa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `relatorios`
--
ALTER TABLE `relatorios`
  MODIFY `idRelatorios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `acp`
--
ALTER TABLE `acp`
  ADD CONSTRAINT `acp_ibfk_1` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`idEmpresa`),
  ADD CONSTRAINT `acp_ibfk_2` FOREIGN KEY (`idCoordenacao`) REFERENCES `coordenacao` (`idCoordenacao`),
  ADD CONSTRAINT `acp_ibfk_3` FOREIGN KEY (`idAluno`) REFERENCES `alunos` (`id`);

--
-- Limitadores para a tabela `certificados`
--
ALTER TABLE `certificados`
  ADD CONSTRAINT `certificados_ibfk_1` FOREIGN KEY (`idAluno`) REFERENCES `alunos` (`id`);

--
-- Limitadores para a tabela `coordenacao`
--
ALTER TABLE `coordenacao`
  ADD CONSTRAINT `coordenacao_ibfk_1` FOREIGN KEY (`idAluno`) REFERENCES `alunos` (`id`);

--
-- Limitadores para a tabela `participa`
--
ALTER TABLE `participa`
  ADD CONSTRAINT `participa_ibfk_1` FOREIGN KEY (`idAluno`) REFERENCES `alunos` (`id`),
  ADD CONSTRAINT `participa_ibfk_2` FOREIGN KEY (`idACP`) REFERENCES `acp` (`idACP`);

--
-- Limitadores para a tabela `relatorios`
--
ALTER TABLE `relatorios`
  ADD CONSTRAINT `relatorios_ibfk_1` FOREIGN KEY (`idAluno`) REFERENCES `alunos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
