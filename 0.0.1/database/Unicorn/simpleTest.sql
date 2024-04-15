-- Write your own SQL object definition here, and it'll be included in your package.
Select U.*
from
				userGroup UG 
	inner JOIN	Users U on U.ID = UG.UserID
	inner join 	Groups G on G.ID = UG.GroupID
where 
	G.ID = 1