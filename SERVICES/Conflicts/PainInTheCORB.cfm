<cfsilent>
	<cfhttp result="result" method="GET" charset="utf-8" 
		url = "https://www.earthquakescanada.nrcan.gc.ca/cache/earthquakes/canada-30-en.atom" >
		<cfhttpparam name="callback" type="url" value="foo">
	</cfhttp>
	
	<CFSet x =  XmlParse(result.filecontent) >

	<cfset numItems = ArrayLen(x.feed.entry)>

	<cfset q = QueryNew("title, id, content, lat, lon, elev") >
	<cfset temp = QueryAddRow(q, #numItems#)>
	<cfloop index="i" from = "1" to = #numItems#>
		<CFSet d1 = dateformat( x.feed.entry[i].title.XmlText.left(20) )>
		<CFSet d2 = dateformat( now()-5 )>
		<cfif DateCompare(d1,d2,"d") EQ 1>
			<cfset temp = QuerySetCell(q, "title", #x.feed.entry[i].title.XmlText#,#i#)>
			<cfset temp = QuerySetCell(q, "id", #x.feed.entry[i].id.XmlText#, #i#)>
			<cfset temp = QuerySetCell(q, "content", #x.feed.entry[i].content.XmlText#, #i#)>
			<cfset p = x.feed.entry[i].XmlChildren[6].XmlText.split(" ")>
			<cfset temp = QuerySetCell(q, "lat", #p[1]#, #i#)>
			<cfset temp = QuerySetCell(q, "lon", #p[2]#, #i#)>
			<cfif arrayLen(x.feed.entry[i].XmlChildren) gt 6>
				<cfset temp = QuerySetCell(q, "elev", "#x.feed.entry[i].XmlChildren[7].XmlText#", #i#)>
			<CFElse>
				<cfset temp = QuerySetCell(q, "elev", 0, #i#)>
			</cfif>
		</cfif>
	</cfloop>
	<CFQuery name="q2" dbtype="query">
		Select * from q where title != ''
	</cfquery>
	<cfscript> 
		//local.ConflictData = deserializeJSON( xmlTransform( x["feed"], expandPath('xmlToJSON.xsl') ) );
	</cfscript>
</cfsilent><cfoutput>#serializeJSON( q2 )#</cfoutput>
