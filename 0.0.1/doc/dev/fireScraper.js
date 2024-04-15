var map = {}

class Logger {
	constructor() {
		this.logLines = [];

		this.open = function (sURL) {
			this.log(this.template('open', sURL));
			return this;
		};

		this.log = function (txt) {
			this.logLines.push(txt);
			return this;
		};

		this.close = function () {
			this.log(this.template('close'));
			$('#FiresInfo').html($('#FiresInfo').html() + '<p>' + this.logLines.join('</p><p>') + '</p>').focus();
			this.logLines = [];
			return this;
		};

		this.template = function (i, url) {
			const q = new Date(Date.now());
			switch (i) {
				case 'open': return '<hr/><p>Stream retrieve Start Time :' + q.toISOString() +
					'<br>Data Source Location: <span style="color:blue">' + url + '</span>';
					break;
				case 'close': return 'Stream retrieve End Time :' + q.toISOString();
					break;
				case '': return '';
					break;
					defaultcase: return 'empty line';
					break;
			}
		};
	}
}

var myLog = new Logger();

function fireServiceData(argMap) {
	// list of table pages for date here -- >
	//     http://www.wildcad.net/WildCADWeb.asp

	// first implemented : 
	// www.wildcad.net/WAopen.asp
	//
	// next to try:
	// http://www.wildcad.net/WCAKCGFCopen.htm

	/*
	*
	* https://inciweb.nwcg.gov/feeds/rss/incidents/
	* This is my next target for fire data .. 
	*
	*/
	map = argMap;
	(
		async () => {
			const sleep = ms => new Promise(r => setTimeout(r, ms));
			const until = (predicateFn) => {
				const poll = (done) => (predicateFn() ? done() : setTimeout(() => poll(done), 125));
				return new Promise(poll);
			};
			const asyncLooper = async (lvw, max) => {
				while (lvw[0] < max) {
					await sleep(250);
				}
			}

			xWrapper = [0];

			var opt = [];
			function AddToOptCollection(idx, rw, tb, ur, dc) {
				opt[idx] =
				{
					fileTitles: [],
					tables: tb,
					callback: fireServiceRenderer,
					rows: rw,
					url: encodeURI(ur),
					decodeLatLon: dc === undefined ? true : dc
				}
			}

			var ii = -1;
			AddToOptCollection(++ii, gOpt.fir, [0, 2, 3, 5], 'http://www.wildcad.net/WAopen.asp');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCAKCGFCopen.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCALAICopen.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCAR-AOCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCAZ-ADCrecent.htm', false);
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCAZ-FDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCAZ-PDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCAZ-PHCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCAZ-SDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCAZ-TDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCAZ-WDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCCA-ANFrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCCA-FICCrecent.htm', false);
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCCA-GVCCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'httP://www.wildcad.net/WCCA-OVICCrecent.htm', false);
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCCA-PNFrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCCA-SNFrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCCALPFrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCCANCICrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCCARICCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCCASQCCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCCCICCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCCO-CRCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCCO-FTCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCCO-GJCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCCO-MTCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCCODRCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCCOPBCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCFL-FICrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCGAGICrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCID-CDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCID-GVCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCID-SCCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCIDBDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCIDCICrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCIDEICrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCIDPACrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCILILCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCIN-IICrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCKY-KICrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCLALICrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCMI-MIDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCMN-MNCCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCMN-MNSrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCMOMOCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCMSMICrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCMT-BRCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCMT-DDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCMT-GDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCMT-HDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCMT-KDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCMT-KICrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCMT-LECrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCMT-MCCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCMT-MDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCMTBDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCNC-NCCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCNDNDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCNH-NECrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCNM-ABCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCNM-ADCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCNM-SDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCNM-SFCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCNMTDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCNVCNCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCNVECCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCNVEICrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCNVLICrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCNVSFCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCOR-BICrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCOR-COCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCOR-EICrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCOR-JDCCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCOR-RICCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCOR-RVCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCOR-VACrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCORBMCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCORLFCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCPA-MACCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCSC-SCCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCSC-SRFrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCSD-GPCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCTN-TNCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCTX-TICCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCTXTICrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCUT-CDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCUT-MFCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCUT-NUCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCUT-RFCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCUT-UBCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCVAVICrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WArecent.asp');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCWA-CWCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCWA-NDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCWA-NECrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCWA-OLCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCWA-PCCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCWA-PSCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCWA-SPCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCWACACrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCWACCCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCWICCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCWY-CDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCWY-CPCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCWY-TDCrecent.htm');
			AddToOptCollection(++ii, gOpt.fir, [0], 'http://www.wildcad.net/WCCARICCrecent.htm');

			for (i = 0; i <= ii; i++) {
				myLog.open(opt[i].url);
				myLog.log(`Processing file for website: ${i} of ${ii}`);
				fetchFireData(opt[i]);
				asyncLooper(xWrapper, i + 1);
				await until(() => xWrapper[0] === i + 1);
				myLog.close();
			}
		}
	)();
}

function fireServiceRenderer(aryData, options) {
	var tblIndex = -1;
	var cnt = 0;

	for (let tbl of aryData) {

		tblIndex++;
		FFT = options.fileTitles[tblIndex];
		myLog.log(`Table ${tblIndex}: There are -${tbl.length}- lines of data in this data stream.`);

		for (let recs of tbl) {

			try {
				if (recs["Lat/Lon"].length > 10) {
					coord = { latitude: "", longitude: "" }
					console.log(recs['Lat/Lon']);
					var d, m, s //48 19.680, -117 52.446

					if (options.decodeLatLon) {
						coord.latitude = recs["Lat/Lon"].split(', ')[0]
						d = coord.latitude.split(' ')[0]
						m = coord.latitude.split(' ')[1].split('.')[0]
						s = coord.latitude.split(' ')[1].split('.')[1]
						coord.latitude = parseFloat(d, 10) + parseFloat(m / 60, 10) + parseFloat(s / 3600, 10)

						coord.longitude = recs["Lat/Lon"].split(', ')[1]
						d = coord.longitude.split(' ')[0]
						m = coord.longitude.split(' ')[1].split('.')[0]
						s = coord.longitude.split(' ')[1].split('.')[1]
						coord.longitude = parseFloat(d, 10) + parseFloat(m / 60, 10) + parseFloat(s / 3600, 10)
					} else {
						coord.latitude = recs["Lat/Lon"].split(', ')[0]
						coord.longitude = recs["Lat/Lon"].split(', ')[1]
					}
					var circle = L.circle(
						[coord.latitude, coord.longitude],
						{
							color: 'red',
							opacity: 0.25,
							fillColor: '#900',
							fillOpacity: 0.15,
							radius: 2000,
						}
					)

					if (recs.WebComment === undefined) recs.WebComment = 'NONE';
					if (recs.Location === undefined) recs.Location = recs.Name;
					var f = `<div><b>${recs.Type}</b> ${FFT}: ${recs.Date} : ${recs.Location} : ${recs.Acres} acre(s)<br>Comment: ${recs.WebComment}</div>`;
					var f2 = `${recs.Type} - ${recs.Name}`;

					circle.addTo(map).bindPopup(f, gOpt.pop).bindTooltip(f2, gOpt.tip);
					++cnt;
				}
			} catch (e) { console.log(e) }
		}
	}

	myLog.log(`Table ${tblIndex}: There are -${cnt}- usable lines of data in this data stream.`);
	xWrapper[0]++
}

function fetchFireData(options) {
	/*
	*
	* Options
	*	url : string	
	*	tables : Array. represents index of tables to process [1,3,4,6]
	*			based on "BODY TABLE" selector
	* 	rows: Array Represents meta data about row data positions
	*			{ title: '0', headers: '1', dataStart: '2' }
	*/
	var url = `/services/util/GetHTML.cfm?url=${options.url}`;

	function getTableData(url) {
		fetch(url)
			.then(response => response.text())
			.then(text => processHTMLPage(text, options));
	}

	getTableData(url);
}

function processHTMLPage(text, options) {
	$('#hiddenViewport').html('');
	var $newdiv1 = $("body").append($("<div id='hiddenViewport' style=''></div>").append($(text)))

	// There are 6 tables in the example... picking table 2
	var ary = [];
	for (const tbls in options.tables) {
		const t = displayData($("#hiddenViewport table")[tbls], options);	// theres 6 in this example
		//Each table is JSON data right here...  Send to Actual renderer
		const obj = JSON.parse(t[0]);
		options = t[1]
		ary.push(obj);
	}
	//The record sets are built...  Send them back to the caller
	$('#hiddenViewport').remove();

	options.callback(ary, options);
}

function displayData(e, options) {
	var xx = scrapeTableData(e);  //gets back as CSV

	// by now we have a table... the first row is junk.
	x = xx[0];//This is all the tables data

	//	Add the title of the file we just processed to this list
	options.fileTitles.push(xx[1]);
	var retVal = csvToJson(x.split('\n'), options)
	return ([retVal, options])
}

function csvToJson(array, options) {

	/* Store the converted result into an array */
	const csvToJsonResult = [];

	/* Store the CSV column headers into seprate variable */
	let re = /"/gi;
	if (options && options.rows && options.rows.headers && array && array.length > options.rows.headers ) 
	{
		const headers = array[options.rows.headers].replace(re, '').split("|")

		/* Iterate over the remaning data rows */
		for (let i = options.rows.dataStart; i < array.length - 1; i++) {
			try {
				const jsonObject = {}
				const currentArrayString = array[i].replace(re, '')
				let string = ''

				let quoteFlag = 0
				for (let character of currentArrayString) {
					if (character === '"' && quoteFlag === 0) {
						quoteFlag = 1
					}
					else if (character === '"' && quoteFlag == 1) quoteFlag = 0
					if (character === '|' && quoteFlag === 0) character = '~'
					if (character !== '"') string += character
				}

				let jsonProperties = string.split("~")

				for (let j in headers) {
					if (jsonProperties[j].includes("|")) {
						jsonObject[headers[j]] = jsonProperties[j]
							.split("|").map(item => item.trim())
					}
					else jsonObject[headers[j]] = jsonProperties[j]
				}
				/* Push the genearted JSON object to resultant array */
				csvToJsonResult.push(jsonObject)
			} catch (e) { }
		}
	}
	/* Convert the final array to JSON */
	const json = JSON.stringify(csvToJsonResult);
	return (json)

}

function scrapeTableData($tbl) {

	try {
		var s = '', sOut = '';
		var fileHeader = $tbl.rows[0].innerText
		for (const r of $tbl.rows) {
			s += '"';
			for (const c of r.cells)
				s += c.innerHTML.replace(/[\n]/g, '').trim() + '"|"';
			s = s.slice(0, -2) + '\n';
		}
	} catch (e) { }

	sOut = $("<div id='info' style='display:none;'></div>").html(s).text()
	return ([sOut, fileHeader])
}


