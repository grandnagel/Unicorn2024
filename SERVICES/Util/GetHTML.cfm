<CFSilent>
<!--- https://magicmerlin.ddns.net/SERVICES/Util/GetHTML.cfm?url=http://www.wildcad.net/WAopen.asp --->
	<cfhttp result="result" method="GET" charset="utf-8" url = "#url.url#" >
		<cfhttpparam name="callback" type="url" value="foo">
	</cfhttp>
</CFSilent><cfoutput>#result.filecontent#</CFOutput>