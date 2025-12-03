USE BR_IpsosPainelPostos
GO

/****** Object:  StoredProcedure [dbo].[pr_Lista_Traducao]    Script Date: 25/09/2025 21:10:07 ******/


ALTER TABLE [dbo].[tblTraducaoIdioma] DROP CONSTRAINT [FK_tblIdioma_tblIdioma]
GO
ALTER TABLE [dbo].[tblUser] DROP CONSTRAINT [DF__tblUser__FlagAti__173876EA]
GO
ALTER TABLE [dbo].[tblUser] DROP CONSTRAINT [DF__tblUser__CreateD__164452B1]
GO
/****** Object:  Table [dbo].[tblUserPerfil]    Script Date: 25/09/2025 21:01:05 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tblUserPerfil]') AND type in (N'U'))
DROP TABLE [dbo].[tblUserPerfil]
GO
/****** Object:  Table [dbo].[tblUserIdioma]    Script Date: 25/09/2025 21:01:05 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tblUserIdioma]') AND type in (N'U'))
DROP TABLE [dbo].[tblUserIdioma]

GO
/****** Object:  Table [dbo].[tblUser]    Script Date: 25/09/2025 21:01:05 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tblUser]') AND type in (N'U'))
DROP TABLE [dbo].[tblUser]
GO

/****** Object:  Table [dbo].[tblUser]    Script Date: 25/09/2025 21:01:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUser](
	[CodUser] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Password] [varchar](100) NULL,
	[Email] [varchar](50) NOT NULL,
	[CreateDate] [date] NOT NULL,
	[UpdateDate] [date] NULL,
	[CodUserPerfil] [int] NOT NULL,
	[FlagAtivo] [bit] NOT NULL,
	[Token] [varchar](100) NULL,
	[FlagPopUp] [tinyint] NULL,
 CONSTRAINT [PK__tblUser__BFF6081A4D7D7AB7] PRIMARY KEY CLUSTERED 
(
	[CodUser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[tblUserIdioma]    Script Date: 25/09/2025 21:01:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUserIdioma](
	[CodUser] [int] NOT NULL,
	[CodIdioma] [int] NOT NULL,
 CONSTRAINT [PK_tblUserIdioma] PRIMARY KEY CLUSTERED 
(
	[CodUser] ASC,
	[CodIdioma] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUserPerfil]    Script Date: 25/09/2025 21:01:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUserPerfil](
	[CodUserPerfil] [int] IDENTITY(1,1) NOT NULL,
	[DescUserPerfil] [varchar](50) NULL,
 CONSTRAINT [PK_tblPerfil] PRIMARY KEY CLUSTERED 
(
	[CodUserPerfil] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


SET IDENTITY_INSERT [dbo].[tblUser] ON 

INSERT [dbo].[tblUser] ([CodUser], [Name], [Password], [Email], [CreateDate], [UpdateDate], [CodUserPerfil], [FlagAtivo], [Token], [FlagPopUp]) VALUES (1, N'Ipsos - Teste', N'*ø°Fì†¬Ïg—¨Ž¯ j¼‹Ï†x©	ç;e`ìRÐð¥zèà~kI·rñ¼Å–¾ZP†¡¡â€YÉÇp‹‰¶³M', N'ipsos@teste.com.br', CAST(N'2022-09-11' AS Date), CAST(N'2024-03-21' AS Date), 1, 1, NULL, 1)
SET IDENTITY_INSERT [dbo].[tblUser] OFF
GO

INSERT [dbo].[tblUserIdioma] ([CodUser], [CodIdioma]) VALUES (1, 1)
GO
SET IDENTITY_INSERT [dbo].[tblUserPerfil] ON 

INSERT [dbo].[tblUserPerfil] ([CodUserPerfil], [DescUserPerfil]) VALUES (1, N'Admin')
INSERT [dbo].[tblUserPerfil] ([CodUserPerfil], [DescUserPerfil]) VALUES (2, N'Comum')
SET IDENTITY_INSERT [dbo].[tblUserPerfil] OFF
GO
ALTER TABLE [dbo].[tblUser] ADD  CONSTRAINT [DF__tblUser__CreateD__164452B1]  DEFAULT (getdate()) FOR [CreateDate]
GO
ALTER TABLE [dbo].[tblUser] ADD  CONSTRAINT [DF__tblUser__FlagAti__173876EA]  DEFAULT ((1)) FOR [FlagAtivo]
GO
ALTER TABLE [dbo].[tblTraducaoIdioma]  WITH CHECK ADD  CONSTRAINT [FK_tblIdioma_tblIdioma] FOREIGN KEY([CodIdioma])
REFERENCES [dbo].[tblTraducaoIdioma] ([CodIdioma])
GO
ALTER TABLE [dbo].[tblTraducaoIdioma] CHECK CONSTRAINT [FK_tblIdioma_tblIdioma]
GO


/****** Object:  StoredProcedure [dbo].[pr_Lista_Traducao]    Script Date: 25/09/2025 21:10:07 ******/
DROP PROCEDURE [dbo].[pr_Lista_Traducao]
GO
ALTER TABLE [dbo].[tblTraducaoIdioma] DROP CONSTRAINT [FK_tblIdioma_tblIdioma]
GO
ALTER TABLE [dbo].[tblTraducaoComponenteObjetoTraducao] DROP CONSTRAINT [FK_tblTraducaoComponenteObjetoTraducao_tblTraducaoComponenteObjetoTraducao]
GO
/****** Object:  Table [dbo].[tblTraducaoIdioma]    Script Date: 25/09/2025 21:10:07 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tblTraducaoIdioma]') AND type in (N'U'))
DROP TABLE [dbo].[tblTraducaoIdioma]
GO
/****** Object:  Table [dbo].[tblTraducaoComponenteObjetoTraducao]    Script Date: 25/09/2025 21:10:07 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tblTraducaoComponenteObjetoTraducao]') AND type in (N'U'))
DROP TABLE [dbo].[tblTraducaoComponenteObjetoTraducao]
GO
/****** Object:  Table [dbo].[tblTraducaoComponenteObjetoTraducao]    Script Date: 25/09/2025 21:10:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblTraducaoComponenteObjetoTraducao](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdiomaId] [int] NOT NULL,
	[Objeto] [nvarchar](150) NOT NULL,
	[Texto] [nvarchar](2000) NULL,
 CONSTRAINT [PK_tblTraducaoComponenteObjetoTraducao] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblTraducaoIdioma]    Script Date: 25/09/2025 21:10:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblTraducaoIdioma](
	[CodIdioma] [int] IDENTITY(1,1) NOT NULL,
	[DescIdioma] [varchar](50) NULL,
	[SiglaIdioma] [varchar](10) NULL,
	[FlagAtivo] [tinyint] NULL,
 CONSTRAINT [PK_tblIdioma] PRIMARY KEY CLUSTERED 
(
	[CodIdioma] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ON 

INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (1, 1, N'login.titulo', N'Ipsos Painel de Postos')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (2, 1, N'login.sub-titulo', N'Enter your credentials to access the platform')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (3, 1, N'login.usuario', N'Email')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (4, 1, N'login.email.placeholder', N'Digite seu e-mail de acesso')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (5, 1, N'login.campoobrigatorio', N'Campo obrigatório')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (6, 1, N'login.senha', N'Password')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (7, 1, N'login.usuarioInvalido', N'Email ou senha não conferem')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (8, 1, N'login.esqueceu.senha', N'Forgot password')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (9, 1, N'login.btn.acessar', N'Sign in')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (10, 1, N'login.direitos', N'Todos os direitos reservados')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (11, 1, N'login.recupera.senha', N'Recuperação de acesso')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (12, 1, N'login.enviar', N'Enviar')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (13, 1, N'login.solicita.senha', N'Solicitação enviada com sucesso!')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (14, 1, N'login.acessar.email.altera.senha', N'Acesse seu e-mail para alterar a senha!')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (15, 1, N'login.ocorreu.erro', N'Ocorreu um erro!')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (16, 1, N'login.contato.suporte', N'Entre em contato com o suporte técnico para ajudá-lo recuperar o acesso ao sistema.')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (17, 1, N'login.fechar', N'Fechar')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (18, 1, N'recuperar.alteracao.senha', N'Alteração de senha')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (19, 1, N'recuperar.valida.qtd.caracteres', N'Deve conter pelo menos 8 caracteres.')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (20, 1, N'recuperar.valida.qtd.numeros', N'Deve conter pelo menos um número.')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (21, 1, N'recuperar.valida.qtd.maiuscula', N'Deve conter pelo menos uma letra maiúscula.')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (22, 1, N'recuperar.valida.qtd.minuscula', N'Deve conter pelo menos uma letra minúscula.')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (23, 1, N'recuperar.valida.qtd.caractere.especial', N'Deve conter pelo menos 1 caractere especial.')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (24, 1, N'recuparar.confirme.senha', N'Confirme sua senha:')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (25, 1, N'recuperar.campo.obrigatorio', N'Campo Obrigatótio')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (26, 1, N'recuperar.senha.nao.confere', N'As senhas não correspondem!')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (27, 1, N'recupera.alterar.senha', N'Alterar senha')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (28, 1, N'recuperar.alteracao.sucesso', N'Senha alterada com Sucesso!')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (29, 1, N'recuperar.texto.redirecionado', N'Você será redirecionado em alguns segundos...')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (30, 1, N'recuperar.texto.erro', N'Algo deu errado!')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (31, 1, N'recuperar.contato.suporte', N'Entre em contato com o suporte técnico para ajudá-lo recuperar o acesso ao sistema.')
INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] ([Id], [IdiomaId], [Objeto], [Texto]) VALUES (32, 1, N'recuperar.voltar', N'Voltar')

SET IDENTITY_INSERT [dbo].[tblTraducaoComponenteObjetoTraducao] OFF
GO
SET IDENTITY_INSERT [dbo].[tblTraducaoIdioma] ON 

INSERT [dbo].[tblTraducaoIdioma] ([CodIdioma], [DescIdioma], [SiglaIdioma], [FlagAtivo]) VALUES (1, N'Portugues', N'por', 1)
INSERT [dbo].[tblTraducaoIdioma] ([CodIdioma], [DescIdioma], [SiglaIdioma], [FlagAtivo]) VALUES (2, N'Ingles', N'ing', 1)
INSERT [dbo].[tblTraducaoIdioma] ([CodIdioma], [DescIdioma], [SiglaIdioma], [FlagAtivo]) VALUES (3, N'Espanhol', N'esp', 1)
SET IDENTITY_INSERT [dbo].[tblTraducaoIdioma] OFF
GO
ALTER TABLE [dbo].[tblTraducaoComponenteObjetoTraducao]  WITH CHECK ADD  CONSTRAINT [FK_tblTraducaoComponenteObjetoTraducao_tblTraducaoComponenteObjetoTraducao] FOREIGN KEY([IdiomaId])
REFERENCES [dbo].[tblTraducaoIdioma] ([CodIdioma])
GO
ALTER TABLE [dbo].[tblTraducaoComponenteObjetoTraducao] CHECK CONSTRAINT [FK_tblTraducaoComponenteObjetoTraducao_tblTraducaoComponenteObjetoTraducao]
GO
ALTER TABLE [dbo].[tblTraducaoIdioma]  WITH CHECK ADD  CONSTRAINT [FK_tblIdioma_tblIdioma] FOREIGN KEY([CodIdioma])
REFERENCES [dbo].[tblTraducaoIdioma] ([CodIdioma])
GO
ALTER TABLE [dbo].[tblTraducaoIdioma] CHECK CONSTRAINT [FK_tblIdioma_tblIdioma]
GO
/****** Object:  StoredProcedure [dbo].[pr_Lista_Traducao]    Script Date: 25/09/2025 21:10:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  
create  proc [dbo].[pr_Lista_Traducao]  
 @idiomaId int  
 as  
  BEGIN
--'por'  1  
--'ing'  2  
--'esp'  3  
  
  
  select Objeto as objeto, Texto as valor from tblTraducaoComponenteObjetoTraducao t1 with(nolock)  
  JOIN tblTraducaoIdioma t2 with(nolock)  ON t1.IdiomaId = t2.CodIdioma
  where t2.CodIdioma = @idiomaId
  END
GO

