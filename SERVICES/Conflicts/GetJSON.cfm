<cfsilent>
	<cfquery name="ConflictData" datasource="Unicorn" >
		Select 
			top 1000 
			[location], latitude, longitude, source, notes 
		from Conflict
	</cfquery>
</cfsilent><cfoutput>#serializeJSON(ConflictData)#</cfoutput>