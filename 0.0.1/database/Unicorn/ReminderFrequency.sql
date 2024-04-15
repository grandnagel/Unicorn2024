USE [AllPray]
GO

/****** Object:  Table [dbo].[Frequency]    Script Date: 8/2/2022 2:45:32 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Frequency](
	[Id] [int] NOT NULL,
	[Title] [varchar](250) NULL,
	[Frequency] [int] NULL,
 CONSTRAINT [PK_ReminderFrequency] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Frequency] ADD  CONSTRAINT [DF_Frequency_Frequency]  DEFAULT ((1)) FOR [Frequency]
GO


