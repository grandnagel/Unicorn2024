USE [AllPray]
GO

/****** Object:  Table [dbo].[Message]    Script Date: 8/2/2022 2:46:13 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Message](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Subject] [varchar](100) NOT NULL,
	[SenderUserID] [int] NOT NULL,
	[Message] [varchar](100) NOT NULL,
	[ParentMessageID] [int] NULL,
	[DateExpires] [datetime] NOT NULL,
	[DateCreated] [datetime] NOT NULL,
	[IsReminder] [int] NOT NULL,
	[DateRemind] [datetime] NULL,
	[FrequencyID] [int] NULL,
	[IsActive] [int] NOT NULL,
 CONSTRAINT [PK_Message] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Message] ADD  CONSTRAINT [DF_Message_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[Message]  WITH CHECK ADD  CONSTRAINT [FK_Message_Message] FOREIGN KEY([ParentMessageID])
REFERENCES [dbo].[Message] ([Id])
GO

ALTER TABLE [dbo].[Message] CHECK CONSTRAINT [FK_Message_Message]
GO

ALTER TABLE [dbo].[Message]  WITH CHECK ADD  CONSTRAINT [FK_Message_ReminderFrequency] FOREIGN KEY([FrequencyID])
REFERENCES [dbo].[Frequency] ([Id])
GO

ALTER TABLE [dbo].[Message] CHECK CONSTRAINT [FK_Message_ReminderFrequency]
GO

ALTER TABLE [dbo].[Message]  WITH CHECK ADD  CONSTRAINT [FK_Message_Users] FOREIGN KEY([SenderUserID])
REFERENCES [dbo].[Users] ([Id])
GO

ALTER TABLE [dbo].[Message] CHECK CONSTRAINT [FK_Message_Users]
GO


