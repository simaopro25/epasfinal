-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 24, 2026 at 11:37 AM
-- Server version: 8.0.42-0ubuntu0.20.04.1
-- PHP Version: 7.4.3-4ubuntu2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `epas`
--

-- --------------------------------------------------------

--
-- Table structure for table `Categoria`
--

CREATE TABLE `Categoria` (
  `ID` int NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `CodigoEscola` int NOT NULL DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Categoria`
--

INSERT INTO `Categoria` (`ID`, `Nome`, `CodigoEscola`) VALUES
(1, 'Página Inicial', 2),
(2, 'Quem somos - Missão e Valores', 2),
(3, 'Quem somos - Equipa Coordenadora', 2),
(4, 'Quem somos - Escolas Participantes', 2),
(5, 'Quem somos - Como Aderir à Rede', 2),
(6, 'O que fazemos - Boas práticas', 2),
(7, 'O que fazemos - Testemunhos e Galeria', 2),
(8, 'O que fazemos - Calendário de atividades', 2),
(9, 'Calendário de eventos - Eventos Futuros', 2),
(10, 'Calendário de eventos - Projectos em curso', 2),
(11, 'Calendário de eventos - Arquivo de eventos', 2),
(12, 'Recursos - Informações Úteis', 2),
(13, 'Recursos - Material Didático', 2),
(14, 'Recursos - Instituições da UE', 2),
(15, 'Recursos -  Europe Directs', 2),
(16, 'Recursos - Notícias da UE', 2),
(17, 'O que fazemos', 2),
(21, 'Rede Epas', 2),
(23, 'Rede Unidos', 2),
(24, 'Eventos', 2),
(25, 'Testemunhos', 2),
(26, 'Perguntas Frequentes', 2);

-- --------------------------------------------------------

--
-- Table structure for table `Escolas`
--

CREATE TABLE `Escolas` (
  `id` int NOT NULL,
  `nome` varchar(150) NOT NULL,
  `localizacao` varchar(255) DEFAULT NULL,
  `foto` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `TipoEscola` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `PaginaWeb` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `utilizador` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `pass` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `confirmada` int NOT NULL DEFAULT '0',
  `latitude` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `longitude` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Escolas`
--

INSERT INTO `Escolas` (`id`, `nome`, `localizacao`, `foto`, `telefone`, `email`, `TipoEscola`, `PaginaWeb`, `utilizador`, `pass`, `confirmada`, `latitude`, `longitude`) VALUES
(1, 'Agrupamento de Escolas de Monserrate', 'Viana do Castelo', 'https://epas.alunos.esmonserrate.org/imagens/monserrate_logo_pequeno.png', '258801800', 'geral@esmonserrate.org', '27', 'www.esmonserrate.org', 'epasmonserrate', '202cb962ac59075b964b07152d234b70', 1, '41.69318113107479', '-8.841364587837678'),
(2, 'Escola Padrão', 'Viana do Castelo', 'https://epas.alunos.esmonserrate.org/imagens/padrao_logo_pequeno2.png', '258741954', 'escolapadrao@padrao.org', '2', 'www.escolapadrao.padrao.org', 'epaspadrao', '202cb962ac59075b964b07152d234b70', 1, '0', '0'),
(10, 'Escola Braga', 'Braga', 'asd', '25367895', 'braga@gmail.com', '14', 'epas.braga.org', 'epasbraga', '202cb962ac59075b964b07152d234b70', 1, '123', '123');

-- --------------------------------------------------------

--
-- Table structure for table `Menu`
--

CREATE TABLE `Menu` (
  `ID` int NOT NULL,
  `Opcao` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Ordem` int NOT NULL,
  `pai` int NOT NULL,
  `link` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Menu`
--

INSERT INTO `Menu` (`ID`, `Opcao`, `Ordem`, `pai`, `link`) VALUES
(18, 'Início', 0, 1, '/public/#main'),
(33, 'Contactos', 80, 1, '/public/#contacto'),
(34, 'Login', 700, 1, '/public/login'),
(36, 'Rede EPAS', 10, 1, '/public/#rede'),
(37, 'Rede Unidos', 20, 1, '/public/#seccaoUnidos'),
(38, 'Eventos', 30, 1, '/public/#eventos'),
(39, 'Testemunhos', 40, 1, '/public/#testemunhos'),
(40, 'Perguntas Frequentes', 50, 1, '/public/#PerguntasFrequentes');

-- --------------------------------------------------------

--
-- Table structure for table `Noticias`
--

CREATE TABLE `Noticias` (
  `Titulo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Imagem` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Texto` text NOT NULL,
  `CodigoCategoria` int NOT NULL,
  `ID` int NOT NULL,
  `Data` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Noticias`
--

INSERT INTO `Noticias` (`Titulo`, `Imagem`, `Texto`, `CodigoCategoria`, `ID`, `Data`) VALUES
('Quem Somos?', 'https://www.esmonserrate.org/images/portfolio/full/esm.webp', 'Somos o Rafael e o Simão', 3, 1, '2026-01-24 09:26:11'),
('O que é o Programa Escolas Embaixadoras?..............', '', '<p data-start=\'75\' data-end=\'338\'>Um programa anual de acreditação dirigido a escolas do ensino secundário e estabelecimentos de ensino profissional em Portugal e nos restantes Estados-Membros da União Europeia. Em Portugal, o programa é coordenado pelo ????? 1234567</p>\r\n<p data-start=\'340\' data-end=\'604\'>O programa permite aos alunos aprofundar o conhecimento sobre a democracia parlamentar europeia, organizar e participar em atividades práticas relacionadas com a União Europeia e envolver-se ativamente com a sua comunidade e com os Deputados ao Parlamento Europeu.</p>\r\n<p data-start=\'606\' data-end=\'694\' data-is-last-node=\'\' data-is-only-node=\'\'>A participação neste programa é gratuita para a sua escola ou estabelecimento de ensino.</p>', 1, 2, '2026-01-24 09:26:11'),
('Candidatura', '', '<strong>Candidatura ao EPAS</strong><br>\nPara a sua escola, alunos e toda a equipa (docente e não docente)<br>\nProcesso simples e acompanhado\n\n<ul>\n    <li>Certificados oficiais do Parlamento Europeu para alunos, professores e funcionários</li>\n    <li>Placa de Escola Embaixadora + logótipo oficial</li>\n    <li>Materiais de apresentação e reconhecimento</li>\n</ul>\n\n<a href=\"https://epas.alunos.esmonserrate.org/public/formulario\">Candidatura</a>', 17, 3, '2026-01-22 09:26:11'),
('Eventos', '', '<p data-start=\'34\' data-end=\'81\'>Liderança jovem, democracia e debate</p>\r\n<p data-start=\'83\' data-end=\'282\'>Os jovens são desafiados a desenvolver atividades que promovam o debate, o intercâmbio cultural e a aprendizagem<br data-start=\'195\' data-end=\'198\'>\r\nTrabalho em rede com escolas de toda a União Europeia<br data-start=\'251\' data-end=\'254\'>\r\n<strong data-start=\'254\' data-end=\'282\'>Ver projetos das escolas</strong></p>', 17, 4, '2026-01-22 09:26:11'),
('Recursos', '', '<p data-start=\'289\' data-end=\'336\'>Recursos, ideias e trabalho em rede</p><p>\r\n</p><p data-start=\'338\' data-end=\'476\' data-is-last-node=\'\' data-is-only-node=\'\'>Guias de atividades para download<br data-start=\'371\' data-end=\'374\'>\r\nApoio disponível mediante necessidade<br data-start=\'411\' data-end=\'414\'>\r\nFormação contínua gratuita para professores<br data-start=\'457\' data-end=\'460\'>\r\n<strong data-start=\'460\' data-end=\'476\' data-is-last-node=\'\'>Ver recursos</strong></p>', 17, 5, '2026-01-22 09:26:11'),
('Feliz 10.º Aniversário, EPAS!', '', '<p data-start=\'73\' data-end=\'253\'>Para celebrar 10 anos do Programa Escolas Embaixadoras do Parlamento Europeu (EPAS), temos o prazer de lançar um concurso especial para os Embaixadores Juniores de toda a Europa!</p>\r\n<p data-start=\'255\' data-end=\'487\'>Concurso: O que a Europa significa para nós, numa imagem<br data-start=\'311\' data-end=\'314\'>\r\nO que significa a Europa para ti? Liberdade, união, diversidade, oportunidade? Capta a tua visão da Europa numa fotografia marcante e conta-nos a história por detrás dela!</p>\r\n<p data-start=\'489\' data-end=\'506\'>Como participar</p>\r\n<ol data-start=\'508\' data-end=\'1470\'>\r\n<li data-start=\'508\' data-end=\'687\'>\r\n<p data-start=\'511\' data-end=\'687\'>Tira uma fotografia<br data-start=\'530\' data-end=\'533\'>\r\nPodes usar o teu telemóvel, uma câmara digital ou até uma câmara analógica/filme.<br data-start=\'614\' data-end=\'617\'>\r\nQualidade mínima: 200 DPI<br data-start=\'642\' data-end=\'645\'>\r\nImagens geradas por IA não serão aceites</p>\r\n</li>\r\n<li data-start=\'689\' data-end=\'842\'>\r\n<p data-start=\'692\' data-end=\'842\'>Escreve uma legenda<br data-start=\'711\' data-end=\'714\'>\r\nEm até 500 caracteres (incluindo espaços), explica o que a Europa significa para ti.<br data-start=\'798\' data-end=\'801\'>\r\nO texto deve ser coerente com a imagem.</p>\r\n</li>\r\n<li data-start=\'844\' data-end=\'1164\'>\r\n<p data-start=\'847\' data-end=\'1164\'>Submete a tua participação<br data-start=\'873\' data-end=\'876\'>\r\nPublica a fotografia e a legenda no teu perfil pessoal ou no perfil da escola no Instagram (público)<br data-start=\'976\' data-end=\'979\'>\r\nOU<br data-start=\'981\' data-end=\'984\'>\r\nSe não tiveres conta, envia para o correspondente nacional do EPLO (aplicam-se procedimentos em conformidade com a proteção de dados — o teu EPLO dará as indicações necessárias).</p>\r\n</li>\r\n<li data-start=\'1166\' data-end=\'1359\'>\r\n<p data-start=\'1169\' data-end=\'1359\'>Marca e usa hashtags<br data-start=\'1189\' data-end=\'1192\'>\r\nIdentifica o Gabinete de Ligação do Parlamento Europeu (EPLO) do teu país<br data-start=\'1265\' data-end=\'1268\'>\r\nUsa a hashtag #10yearsEPAS (e o seu equivalente na tua língua nacional, quando aplicável)</p>\r\n</li>\r\n<li data-start=\'1361\' data-end=\'1470\'>\r\n<p data-start=\'1364\' data-end=\'1470\'>Mantém a publicação pública<br data-start=\'1391\' data-end=\'1394\'>\r\nA publicação deve permanecer pública até ao final do processo do concurso.</p>\r\n</li>\r\n</ol>\r\n<p data-start=\'1472\' data-end=\'1567\'>Importante: Participações incompletas ou que não cumpram os requisitos poderão ser excluídas.</p>\r\n<p data-start=\'1569\' data-end=\'1676\'>Prazo: 30 de janeiro de 2026 (23h59 CET)<br data-start=\'1609\' data-end=\'1612\'>\r\nParticipações submetidas fora do prazo não serão consideradas.</p>\r\n<p data-start=\'1678\' data-end=\'1799\'>Processo de seleção<br data-start=\'1697\' data-end=\'1700\'>\r\nAs participações serão avaliadas a nível nacional pelos respetivos EPLOs.<br data-start=\'1773\' data-end=\'1776\'>\r\nCritérios de seleção:</p>\r\n<ul data-start=\'1800\' data-end=\'1921\'>\r\n<li data-start=\'1800\' data-end=\'1826\'>\r\n<p data-start=\'1802\' data-end=\'1826\'>Relevância para o tema</p>\r\n</li>\r\n<li data-start=\'1827\' data-end=\'1859\'>\r\n<p data-start=\'1829\' data-end=\'1859\'>Criatividade e originalidade</p>\r\n</li>\r\n<li data-start=\'1860\' data-end=\'1880\'>\r\n<p data-start=\'1862\' data-end=\'1880\'>Qualidade visual</p>\r\n</li>\r\n<li data-start=\'1881\' data-end=\'1921\'>\r\n<p data-start=\'1883\' data-end=\'1921\'>Coerência entre a imagem e a legenda</p>\r\n</li>\r\n</ul>\r\n<p data-start=\'1923\' data-end=\'1971\'>Mais detalhes serão comunicados pelo teu EPLO.</p>\r\n<p data-start=\'1973\' data-end=\'2233\'>O prémio<br data-start=\'1981\' data-end=\'1984\'>\r\nCada vencedor nacional (até três alunos da mesma escola por país)<br data-start=\'2049\' data-end=\'2052\'>\r\nMais um professor acompanhante (Embaixador Sénior)<br data-start=\'2102\' data-end=\'2105\'>\r\nSerão convidados a participar num Seminário Jovem em Bruxelas, em meados de março de 2026, organizado pelo Parlamento Europeu.</p>\r\n<p data-start=\'2235\' data-end=\'2345\'>Estamos ansiosos por ver a vossa criatividade e a vossa visão da Europa. Boa sorte a todos os participantes!</p>', 18, 6, '2026-01-27 09:26:11'),
('Estatísticas', NULL, '<p>bla bla bla bla bla</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p>', 17, 7, '2026-01-22 09:26:11'),
('Tyathsstdtyaew', 'Ggehrer', '...aesydysyuystesueyydtewayuytdyeyawudeteysuewd', 7, 14, '2026-02-04 15:00:49'),
('Rede Epas UE', NULL, '...eeee', 11, 17, '2026-02-05 11:12:33'),
('Coordenação', NULL, 'é aqui', 3, 18, '2026-02-05 11:13:23'),
('aaaaaaaa', 'aaaaaa', 'aaaaaaaaaaa', 11, 22, '2026-02-12 14:50:05'),
('bbbbb', NULL, 'bbbbbbbbbbb', 11, 23, '2026-02-12 14:50:11'),
('Escolas da Europa', '', '[ {\'nome\': \'Portugal (5)\', \'lat\': 39.5, \'lon\': -8.0},{\'nome\': \'Espanha\', \'lat\': 40.0, \'lon\': -4.0},{\'nome\': \'França\', \'lat\': 46.5, \'lon\': 2.0}, {\'nome\': \'Alemanha\', \'lat\': 51.0, \'lon\': 10.0}, {\'nome\': \'Itália\', \'lat\': 42.8, \'lon\': 12.8}, {\'nome\': \'Bélgica\', \'lat\': 50.8, \'lon\': 4.0}, {\'nome\': \'Países Baixos\', \'lat\': 52.2, \'lon\': 5.3}, {\'nome\': \'Luxemburgo\', \'lat\': 49.8, \'lon\': 6.1}, {\'nome\': \'Irlanda\', \'lat\': 53.0, \'lon\': -8.0}, {\'nome\': \'Dinamarca\', \'lat\': 56.0, \'lon\': 10.0}, {\'nome\': \'Suécia\', \'lat\': 60.0, \'lon\': 15.0}, {\'nome\': \'Finlândia\', \'lat\': 64.0, \'lon\': 26.0}, {\'nome\': \'Áustria\', \'lat\': 47.5, \'lon\': 14.5}, {\'nome\': \'Polónia\', \'lat\': 52.0, \'lon\': 19.0}, {\'nome\': \'Chéquia\', \'lat\': 49.8, \'lon\': 15.5}, {\'nome\': \'Eslováquia\', \'lat\': 48.7, \'lon\': 19.3}, {\'nome\': \'Hungria\', \'lat\': 47.0, \'lon\': 19.0}, {\'nome\': \'Roménia\', \'lat\': 46.0, \'lon\': 25.0}, {\'nome\': \'Bulgária\', \'lat\': 42.7, \'lon\': 25.5}, {\'nome\': \'Grécia\', \'lat\': 39.0, \'lon\': 22.0}, {\'nome\': \'Croácia\', \'lat\': 45.1, \'lon\': 15.2}, {\'nome\': \'Eslovénia\', \'lat\': 46.1, \'lon\': 14.8}, {\'nome\': \'Letónia\', \'lat\': 57.0, \'lon\': 25.0}, {\'nome\': \'Lituânia\', \'lat\': 55.0, \'lon\': 24.0}, {\'nome\': \'Estónia\', \'lat\': 59.0, \'lon\': 26.0}, {\'nome\': \'Chipre\', \'lat\': 35.0, \'lon\': 33.0}, {\'nome\': \'Malta\', \'lat\': 35.9, \'lon\': 14.5} ]', 1, 24, '2026-02-12 14:52:58'),
('Rede unidos 1', 'https://img.freepik.com/fotos-gratis/closeup-tiro-de-uma-linda-borboleta-com-texturas-interessantes-em-uma-flor-de-petalas-de-laranja_181624-7640.jpg?semt=ais_hybrid&w=740&q=80', '\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus viverra urna vitae sagittis. Vestibulum neque arcu, maximus pulvinar malesuada id, rhoncus sed purus. Fusce ornare, est a pulvinar facilisis, ligula libero dictum odio, non pulvinar purus lectus ut nibh. Duis lobortis, felis quis lobortis hendrerit, nisl mi aliquam nibh, id cursus neque ex non urna. Integer gravida euismod magna, non tristique magna. Nunc id erat vitae nibh luctus ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque posuere et dolor in suscipit. Donec feugiat leo ante, nec fermentum libero sollicitudin vitae.', 23, 25, '2026-02-19 08:53:21'),
('rede unidos 2', 'https://media.istockphoto.com/id/517188688/pt/foto/paisagem-de-montanha.jpg?s=612x612&w=0&k=20&c=uFGUrUT6gA8FrTWhE10YYzngWPlDLssKxJiDs1Qw2Qs=', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus viverra urna vitae sagittis. Vestibulum neque arcu, maximus pulvinar malesuada id, rhoncus sed purus. Fusce ornare, est a pulvinar facilisis, ligula libero dictum odio, non pulvinar purus lectus ut nibh. Duis lobortis, felis quis lobortis hendrerit, nisl mi aliquam nibh, id cursus neque ex non urna. Integer gravida euismod magna, non tristique magna. Nunc id erat vitae nibh luctus ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque posuere et dolor in suscipit. Donec feugiat leo ante, nec fermentum libero sollicitudin vitae.', 23, 26, '2026-02-19 09:23:49'),
('rede unidos 3', 'https://cdn.pixabay.com/photo/2016/11/22/23/53/starfish-1851289_1280.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus viverra urna vitae sagittis. Vestibulum neque arcu, maximus pulvinar malesuada id, rhoncus sed purus. Fusce ornare, est a pulvinar facilisis, ligula libero dictum odio, non pulvinar purus lectus ut nibh. Duis lobortis, felis quis lobortis hendrerit, nisl mi aliquam nibh, id cursus neque ex non urna. Integer gravida euismod magna, non tristique magna. Nunc id erat vitae nibh luctus ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque posuere et dolor in suscipit. Donec feugiat leo ante, nec fermentum libero sollicitudin vitae.', 23, 27, '2026-02-19 09:24:41'),
('Evento 1º', 'https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-abstract-cloudy-background-beautiful-natural-streaks-of-sky-and-clouds-red-image_15684333.jpg', '\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus viverra urna vitae sagittis. Vestibulum neque arcu, maximus pulvinar malesuada id, rhoncus sed purus. Fusce ornare, est a pulvinar facilisis, ligula libero dictum odio, non pulvinar purus lectus ut nibh. Duis lobortis, felis quis lobortis hendrerit, nisl mi aliquam nibh, id cursus neque ex non urna. Integer gravida euismod magna, non tristique magna. Nunc id erat vitae nibh luctus ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque posuere et dolor in suscipit. Donec feugiat leo ante, nec fermentum libero sollicitudin vitae.', 24, 28, '2026-02-19 09:34:24'),
('Evento 2', 'https://t.ctcdn.com.br/JlHwiRHyv0mTD7GfRkIlgO6eQX8=/640x360/smart/i257652.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus viverra urna vitae sagittis. Vestibulum neque arcu, maximus pulvinar malesuada id, rhoncus sed purus. Fusce ornare, est a pulvinar facilisis, ligula libero dictum odio, non pulvinar purus lectus ut nibh. Duis lobortis, felis quis lobortis hendrerit, nisl mi aliquam nibh, id cursus neque ex non urna. Integer gravida euismod magna, non tristique magna. Nunc id erat vitae nibh luctus ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque posuere et dolor in suscipit. Donec feugiat leo ante, nec fermentum libero sollicitudin vitae.', 24, 29, '2026-02-19 09:50:21'),
('Evento 3', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsMA_ZP5tZcj-5mU4kPBfOmypKNxC7Z4gSEQ&s', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus viverra urna vitae sagittis. Vestibulum neque arcu, maximus pulvinar malesuada id, rhoncus sed purus. Fusce ornare, est a pulvinar facilisis, ligula libero dictum odio, non pulvinar purus lectus ut nibh. Duis lobortis, felis quis lobortis hendrerit, nisl mi aliquam nibh, id cursus neque ex non urna. Integer gravida euismod magna, non tristique magna. Nunc id erat vitae nibh luctus ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque posuere et dolor in suscipit. Donec feugiat leo ante, nec fermentum libero sollicitudin vitae.', 24, 30, '2026-02-19 09:54:32'),
('Rede EPAS - Mapas Interativos', '', 'Explore os mapas interativos das escolas participantes no programa EPAS em Portugal e no Reino Unido. Clique nos pins para mais informações.', 1, 31, '2026-02-19 14:58:18'),
('Rede Unidosssss', '', 'Conheça a colaboração entre escolas e comunidades no âmbito do programa EPAS.ssssssss', 1, 32, '2026-02-19 15:35:20'),
('Saul Goodman', '/templates/site/assets/img/testimonials/testimonials-1.jpg', 'Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.', 25, 33, '2026-02-24 08:50:54'),
('Jena Karlis', '/templates/site/assets/img/testimonials/testimonials-3.jpg', 'Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.', 27, 35, '2026-02-24 08:50:54'),
('Sara Wilsson', '/templates/site/assets/img/testimonials/testimonials-2.jpg', 'Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.', 25, 36, '2026-02-24 08:52:54'),
('Jena Karlis', '/templates/site/assets/img/testimonials/testimonials-3.jpg', 'Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.', 25, 37, '2026-02-24 08:52:54'),
('Matt Brandon', '/templates/site/assets/img/testimonials/testimonials-4.jpg', 'Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.', 25, 38, '2026-02-24 08:52:54'),
('Qual é a faixa etária pretendida?', NULL, 'Jovens entre os 14 e os 18 anos.', 26, 39, '2026-02-24 09:09:21'),
('Existem recursos que possam ser partilhados com os Embaixadores?', NULL, 'Sim, existem guias para os Jovens Embaixadores nos Recursos para Escolas Embaixadoras e planos de aulas e materiais nesta página de Recursos Pedagógicos.', 26, 40, '2026-02-24 09:10:39'),
('Como funciona a acreditação e a certificação para os alunos?', NULL, 'Todos os anos, atribuímos certificados a todos os Jovens e Seniores Embaixadores das escolas/colégios que concluíram o programa com sucesso. Cada instituição recebe também uma placa para exibição e logótipos que pode utilizar no seu website, papel timbrado, etc. Realizamos uma cerimónia de entrega de prémios na Europe House e organizamos cerimónias regionais sempre que possível.', 26, 41, '2026-02-24 09:10:39'),
('Países fora do Reino Unido podem participar?', NULL, 'O programa EPAS (Escolas Embaixadoras do Parlamento Europeu) funciona em todos os países da UE e no Reino Unido. Nós prestamos apoio especificamente às escolas britânicas participantes. Se a sua escola quiser participar mas não estiver no Reino Unido, contacte o seu Gabinete de Ligação do Parlamento Europeu (EPLO) local para saber como se envolver no seu país.', 26, 42, '2026-02-24 09:10:39'),
('Eventos?!?!?!?', '', 'Conheça alguns dos eventos realizados no âmbito do programa EPAS.\r\n\r\n', 1, 43, '2026-02-24 09:31:39'),
('Testemunhos?!?!?!?!', '', 'Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit', 1, 44, '2026-02-24 09:35:41'),
('Perguntas Frequentes', '', '<span style=\'color: rgb(68, 68, 68); font-family: Roboto, system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; text-align: center;\'>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</span>', 1, 45, '2026-02-24 09:43:18'),
('Contacte-nos', NULL, 'Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit', 1, 46, '2026-02-24 11:11:43');

-- --------------------------------------------------------

--
-- Table structure for table `TipoEscolas`
--

CREATE TABLE `TipoEscolas` (
  `Id` int NOT NULL,
  `Tipo` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `TipoEscolas`
--

INSERT INTO `TipoEscolas` (`Id`, `Tipo`) VALUES
(2, 'Outras escolas'),
(12, 'Aveiro\r'),
(13, 'Beja\r'),
(14, 'Braga\r'),
(15, 'Bragança\r'),
(16, 'Castelo Branco\r'),
(17, 'Coimbra\r'),
(18, 'Évora\r'),
(19, 'Faro\r'),
(20, 'Guarda\r'),
(21, 'Leiria\r'),
(22, 'Lisboa\r'),
(23, 'Portalegre\r'),
(24, 'Porto\r'),
(25, 'Santarém\r'),
(26, 'Setúbal\r'),
(27, 'Viana do Castelo\r'),
(28, 'Vila Real\r'),
(29, 'Viseu '),
(30, 'Açores\r'),
(31, 'Madeira');

-- --------------------------------------------------------

--
-- Table structure for table `visitas`
--

CREATE TABLE `visitas` (
  `id` int NOT NULL,
  `utilizador` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `data` datetime DEFAULT CURRENT_TIMESTAMP,
  `acao` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Categoria`
--
ALTER TABLE `Categoria`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Escolas`
--
ALTER TABLE `Escolas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `utilizador` (`utilizador`);

--
-- Indexes for table `Menu`
--
ALTER TABLE `Menu`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Noticias`
--
ALTER TABLE `Noticias`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `TipoEscolas`
--
ALTER TABLE `TipoEscolas`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `visitas`
--
ALTER TABLE `visitas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Categoria`
--
ALTER TABLE `Categoria`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `Escolas`
--
ALTER TABLE `Escolas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Menu`
--
ALTER TABLE `Menu`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `Noticias`
--
ALTER TABLE `Noticias`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `TipoEscolas`
--
ALTER TABLE `TipoEscolas`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `visitas`
--
ALTER TABLE `visitas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
