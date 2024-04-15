USE [AllPray]
GO

/****** Object:  Table [dbo].[MessageRecipient]    Script Date: 8/2/2022 2:46:33 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[MessageRecipient](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecipientUserID] [int] NOT NULL,
	[RecipientGroupID] [int] NULL,
	[MessageID] [int] NOT NULL,
	[IsRead] [int] NOT NULL,
	[DateCreated] [datetime] NOT NULL,
	[IsActive] [int] NOT NULL,
 CONSTRAINT [PK_MessageRecipient] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[MessageRecipient] ADD  CONSTRAINT [DF_MessageRecipient_IsRead]  DEFAULT ((0)) FOR [IsRead]
GO

ALTER TABLE [dbo].[MessageRecipient] ADD  CONSTRAINT [DF_MessageRecipient_DateCreated]  DEFAULT (getdate()) FOR [DateCreated]
GO

ALTER TABLE [dbo].[MessageRecipient] ADD  CONSTRAINT [DF_MessageRecipient_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[MessageRecipient]  WITH CHECK ADD  CONSTRAINT [FK_MessageRecipient_Group] FOREIGN KEY([RecipientGroupID])
REFERENCES [dbo].[Groups] ([Id])
GO

ALTER TABLE [dbo].[MessageRecipient] CHECK CONSTRAINT [FK_MessageRecipient_Group]
GO

ALTER TABLE [dbo].[MessageRecipient]  WITH CHECK ADD  CONSTRAINT [FK_MessageRecipient_Message] FOREIGN KEY([MessageID])
REFERENCES [dbo].[Message] ([Id])
GO

ALTER TABLE [dbo].[MessageRecipient] CHECK CONSTRAINT [FK_MessageRecipient_Message]
GO

ALTER TABLE [dbo].[MessageRecipient]  WITH CHECK ADD  CONSTRAINT [FK_MessageRecipient_Users] FOREIGN KEY([RecipientUserID])
REFERENCES [dbo].[Users] ([Id])
GO

ALTER TABLE [dbo].[MessageRecipient] CHECK CONSTRAINT [FK_MessageRecipient_Users]
GO


