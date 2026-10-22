-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE TourWise;

USE TourWise;

CREATE TABLE agencia (
	id_agencia INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL, 
	email VARCHAR(45) UNIQUE
);

CREATE TABLE usuario (
	cod_usuario INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(45) UNIQUE,
	senha VARCHAR(45) NOT NULL,
	cargo VARCHAR(20),
	fk_supervisor INT,
	FOREIGN KEY (fk_supervisor) REFERENCES usuario (cod_usuario),
	fk_agencia INT,
	FOREIGN KEY (fk_agencia) REFERENCES agencia (id_agencia)
);

CREATE TABLE contato (
	id_contato INT PRIMARY KEY AUTO_INCREMENT,
	nome_representante VARCHAR(45),
	nome_empresa VARCHAR(45),
	email VARCHAR(100),
	assunto VARCHAR(200),
	descricao VARCHAR(300),
	dt_envio DATETIME
);

CREATE TABLE pesquisa (
	id_pesquisa INT PRIMARY KEY AUTO_INCREMENT,
	nome_cliente VARCHAR(45),
	preferencia_lugar VARCHAR(45),
	quantidade_pessoas INT,
	precisa_acessibilidade TINYINT,
	idioma VARCHAR(45),
	dt_viagem DATE,
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario (cod_usuario)
);

CREATE TABLE idioma (
	id_idioma INT PRIMARY KEY AUTO_INCREMENT,
	idioma VARCHAR(300),
	codigo_idioma CHAR(2)
);

CREATE TABLE cnae (
id_cnae INT PRIMARY KEY AUTO_INCREMENT,
codigo CHAR(7),
descricao VARCHAR(200)
);

CREATE TABLE hospedagem (
	id_hospedagem INT PRIMARY KEY AUTO_INCREMENT,
	cnpj CHAR(14),
	tipo_hospedagem VARCHAR(70),
	nome_fantasia VARCHAR(200),
	email_comercial VARCHAR(100),
	uni_habit INT,
	leitos INT,
	uni_habit_acess INT,
	leito_acess INT,
	dt_abertura DATE,
	website VARCHAR(150),
	porte VARCHAR(60)
);

CREATE TABLE cnaes_hospedagem(
	fk_cnae INT,
    fk_hospedagem INT,
    CONSTRAINT pk_cnaes PRIMARY KEY (fk_cnae, fk_hospedagem),
    FOREIGN KEY (fk_cnae) REFERENCES cnae (id_cnae),
    FOREIGN KEY (fk_hospedagem) REFERENCES hospedagem (id_hospedagem)
);

CREATE TABLE idiomas_hospedagem (
	fk_idioma INT,
    fk_hospedagem INT,
    CONSTRAINT pk_idiomas PRIMARY KEY (fk_idioma, fk_hospedagem),
    FOREIGN KEY (fk_idioma) REFERENCES idioma (id_idioma),
    FOREIGN KEY (fk_hospedagem) REFERENCES hospedagem (id_hospedagem)
);

CREATE TABLE localizacao (
	id_localizacao INT PRIMARY KEY AUTO_INCREMENT,
	endereco VARCHAR(300),
	municipio VARCHAR(100),
	uf CHAR(2),
	fk_hospedagem INT,
	FOREIGN KEY (fk_hospedagem) references hospedagem(id_hospedagem)
);

CREATE TABLE recomendacao (
	id_recomendacao INT AUTO_INCREMENT,
	fk_hospedagem INT,
	fk_pesquisa INT,
	PRIMARY KEY (id_recomendacao, fk_hospedagem, fk_pesquisa),
	indice_compatibilidade CHAR(4),
	posicao_rank INT,
	FOREIGN KEY (fk_hospedagem) REFERENCES hospedagem (id_hospedagem),
	FOREIGN KEY (fk_pesquisa) REFERENCES pesquisa (id_pesquisa)
);

/*
INSERT INTO agencia (nome, email) VALUES
('ViaMundo Turismo', 'contato@viamundo.com.br'),
('Horizonte Viagens', 'contato@horizonteviagens.com.br'),
('Brasil Experience', 'contato@brasilexperience.com.br'),
('Destino Certo', 'contato@destinocerto.com.br'),
('Travel Prime', 'contato@travelprime.com.br');

INSERT INTO usuario
(email, senha, cargo, fk_supervisor, fk_agencia)
VALUES
('eduardo@viamundo.com.br', 'Edu123', 'Supervisor', NULL, 1),
('mariana@viamundo.com.br', 'Mar123', 'Agente', 1, 1),
('lucas@horizonte.com.br', 'Luc456', 'Agente', NULL, 2),
('ana@brasilexperience.com.br', 'Ana789', 'Agente', NULL, 3),
('carlos@destinocerto.com.br', 'Car321', 'Agente', NULL, 4);

INSERT INTO contato
(nome_representante, nome_empresa, email, assunto, descricao, dt_envio)
VALUES
('Fernanda Alves', 'ViaMundo Turismo', 'fernanda@viamundo.com.br', 'Conhecer Plataforma',
 'Gostaria de conhecer a plataforma TourWise.',
 '2026-09-01 09:15:00'),

('Ricardo Souza', 'Horizonte Viagens', 'ricardo@horizonteviagens.com.br', 'Interessado na plataforma',
 'Tenho interesse em utilizar os dados de hospedagem.',
 '2026-09-03 14:30:00'),

('Juliana Martins', 'Brasil Experience', 'juliana@brasilexperience.com.br', 'Conhecer o sistema',
 'Gostaria de saber mais sobre o sistema.',
 '2026-09-05 10:45:00'),

('Paulo Mendes', 'Destino Certo', 'paulo@destinocerto.com.br', 'Conhecer Funcionalidades',
 'Gostaria de conhecer as funcionalidades da plataforma.',
 '2026-09-07 16:20:00'),

('Camila Rocha', 'Travel Prime', 'camila@travelprime.com.br', 'Cliente em potêncial',
 'Tenho interesse em utilizar o TourWise na agência.',
 '2026-09-10 11:00:00');
 
INSERT INTO pesquisa
(nome_cliente, preferencia_lugar, quantidade_pessoas,
 precisa_acessibilidade, idioma, dt_viagem, fk_usuario)
VALUES
('João Oliveira', 'Rio de Janeiro', 2, 0, 'Português',
 '2026-12-15', 2),

('Marcos Silva', 'Gramado', 4, 1, 'Português',
 '2027-01-10', 3),

('Laura Santos', 'Curitiba', 2, 0, 'Inglês',
 '2027-02-20', 4),

('Pedro Almeida', 'Fortaleza', 3, 1, 'Espanhol',
 '2027-03-05', 5),

('Beatriz Costa', 'Recife', 5, 0, 'Português',
 '2027-04-12', 2);
 
 INSERT INTO idioma (idioma) VALUES
('Português'),
('Inglês'),
('Espanhol'),
('Francês'),
('Alemão');

INSERT INTO localizacao
(endereco, municipio, uf)
VALUES
('Av. Atlântica, 1200', 'Rio de Janeiro', 'RJ'),
('Rua das Flores, 450', 'Gramado', 'RS'),
('Av. Boa Viagem, 850', 'Recife', 'PE'),
('Rua XV de Novembro, 300', 'Curitiba', 'PR'),
('Av. Beira Mar, 700', 'Fortaleza', 'CE');

INSERT INTO cnae (codigo) VALUES
('5510801'),
('5510802'),
('5590601'),
('5590699'),
('5590603');

INSERT INTO hospedagem
(
    cnpj,
    tipo_hospedagem,
    nome_fantasia,
    email_comercial,
    uni_habit,
    leitos,
    uni_habit_acess,
    leito_acess,
    dt_abertura,
    website,
    porte,
    fk_localizacao,
    fk_idioma,
    fk_cnae
)
VALUES
(
    '12345678000101',
    'Hotel',
    'Hotel Mar Azul',
    'contato@hotelmarazul.com.br',
    120,
    240,
    12,
    24,
    '2010-05-15',
    'www.hotelmarazul.com.br',
    'Médio',
    1,
    1,
    1
),

(
    '23456789000102',
    'Hotel',
    'Gramado Mountain Hotel',
    'reservas@gramadomountain.com.br',
    85,
    170,
    8,
    16,
    '2015-08-20',
    'www.gramadomountain.com.br',
    'Médio',
    2,
    1,
    1
),

(
    '34567890000103',
    'Pousada',
    'Pousada Boa Viagem',
    'contato@pousadaboaviagem.com.br',
    35,
    70,
    4,
    8,
    '2018-03-10',
    'www.pousadaboaviagem.com.br',
    'Pequeno',
    3,
    3,
    2
),

(
    '45678901000104',
    'Hotel',
    'Curitiba Central Hotel',
    'reservas@curitibacentral.com.br',
    150,
    300,
    15,
    30,
    '2008-11-25',
    'www.curitibacentral.com.br',
    'Grande',
    4,
    1,
    1
),

(
    '56789012000105',
    'Resort',
    'Fortaleza Beach Resort',
    'reservas@fortalezabeach.com.br',
    200,
    500,
    20,
    40,
    '2012-07-18',
    'www.fortalezabeach.com.br',
    'Grande',
    5,
    2,
    1
);

INSERT INTO recomendacao
(fk_hospedagem, fk_pesquisa, indice_compatibilidade, posicao_rank)
VALUES
(1, 1, '95%', 1),
(5, 1, '89%', 2),
(2, 2, '94%', 1),
(4, 3, '91%', 1),
(3, 4, '87%', 1);
*/
