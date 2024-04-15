/*
*
*
*/
var GoogServices, map, L;
var gOpt = {
	pop: { sticky: true, interactive: false, permanent: false },
	tip: { closeOnClick: true, autoClose: true, closeButton: true },
	fir: { title: '0', headers: '1', dataStart: '2', decodeLatLon: true },
	draw: { circle: false, rectangle: false, marker: false, circlemarker: false }
};

const isLoaded = [false, false, false, false, false, false];

const goog = {
	Satelite: 0,
	Terrain: 1,
	Hybrid: 2,
	Traffic: 3,
	Streets: 4,
	WorldView: 5
};

(async () => {
	while (!L) // define the condition as you like
		await new Promise(resolve => setTimeout(resolve, 1000));
	GoogServices = {
		Satelite: L.tileLayer(`https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}`, {
			maxZoom: 20,
			subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
		}),
		Terrain: L.tileLayer(`https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}`, {
			maxZoom: 20,
			subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
		}),
		Hybrid: L.tileLayer(`https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}`, {
			maxZoom: 20,
			subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
		}),
		Traffic: L.tileLayer(`https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}`, {
			maxZoom: 20,
			subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
		}),
		Streets: L.tileLayer(`https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}`, {
			maxZoom: 20,
			subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
		}),
		WorldView: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: '&copy;',
			maxZoom: 18
		})
	}
})();
/*
*
*
*/











function ResetToHomeLocation() {
	function showUserLocation(lat, long) {
		map.setView([lat, long], 15);
	};
	navigator.geolocation.getCurrentPosition(
		function (position) { showUserLocation(position.coords.latitude, position.coords.longitude); },
		function (error) { console.log("The Locator was denied :(") }
	)
}

function GetHomeLocation() {
	function getUserLocation(coords) { console.log(coords.latitude, coords.longitude); };
	navigator.geolocation.getCurrentPosition(
		function (position) { getUserLocation(position.coords); },
		function (error) { console.log("The Locator was denied :(") }
	);
}

function ClickToPray(_e) {

	$("#dd").html("Praying...");

	map = L.map('map').setView([38, -97], 4);

	L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(map);

	var query = window.location.search.substring(1);
	var qs = parse_query_string(query);

	if (qs.ShowStateBorders !== undefined)
		showStateBoundaries();

	//Add the user to the screen with a marker
	//var marker = L.marker([27.976790, -80.668460]).addTo(map);

	for (let v = 0; v < tmpDataset.length; v++) {
		var circle = L.circle([tmpDataset[v].lat, tmpDataset[v].long], {
			color: 'blue',
			fillColor: '#00' + toString(v),
			fillOpacity: 0.15,
			radius: 2000
		}).addTo(map);

		circle.bindPopup(
			'<a href="?v=' + v + '">' + tmpDataset[v].name + '</a >  : ' + tmpDataset[v].description
			, { closeOnClick: true, autoClose: true, closeButton: true }
		);
	}

	var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(map);
	}

	function onMapZoomEnd(e) {
		let clusters = 0;
		map.eachLayer((l) => {
			if (
				(
					l instanceof L.Circle
					||
					l instanceof L.Marker
				)
				&& map.getBounds().contains(l.getLatLng()))
				clusters++;

		});
		const updatedZoomLevel = map.getZoom();
		$("#GETCnt")[0].textContent = '-' + clusters.toString() + '-';
		$("#slider").slider("option", "value", updatedZoomLevel);
		e.preventBubble = true;

	}

	// CLICK MAP
	map.on('click', onMapClick);

	map.on('zoomend', onMapZoomEnd);
	map.on('moveend', onMapZoomEnd);

	$('.TopActions > button').each(function () { $(this).click(onMapZoomEnd); });

	$('#GETCnt').show();
	$(_e).hide();

}

function parse_query_string(query) {
	var vars = query.split("&");
	var query_string = {};
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		var key = decodeURIComponent(pair.shift());
		var value = decodeURIComponent(pair.join("="));
		if (typeof query_string[key] === "undefined") {
			query_string[key] = value;
		} else if (typeof query_string[key] === "string") {
			var arr = [query_string[key], value];
			query_string[key] = arr;
		} else {
			query_string[key].push(value);
		}
	}
	return query_string;
}

function showStateBoundaries() {

	var tiles = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

	L.geoJson(statesData).addTo(map);

	function getColor(d) {
		return d > 1000 ? '#800026' :
			d > 500 ? '#BD0026' :
				d > 200 ? '#E31A1C' :
					d > 100 ? '#FC4E2A' :
						d > 50 ? '#FD8D3C' :
							d > 20 ? '#FEB24C' :
								d > 10 ? '#FED976' :
									'#FFEDA0';
	}

	function style(feature) {
		return {
			fillColor: getColor(feature.properties.density),
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.16
		};
	}

	var obj = L.geoJson(statesData, { style: style }).addTo(map);

}

function resetZIndex(obj) {
	for (o in GoogServices)
		if (GoogServices[o]._container) {
			GoogServices[o]._container.style.zIndex = 400;
			GoogServices[o].setOpacity(0)
		}
	obj._container.style.zIndex = 500;
	switch (obj) {
		case GoogServices.WorldView:
			obj._container.style.zIndex = 501;
			GoogServices.Satelite.setOpacity(1);
			break;
	}

	obj.setOpacity(1);
}


function GoogClick(objGoogSvc, idxGoogSvc) {
	if (isLoaded[idxGoogSvc]) {
		resetZIndex(objGoogSvc);
	} else {
		objGoogSvc = objGoogSvc.addTo(map);
		isLoaded[idxGoogSvc] = true;
	}
}


String.prototype.left = function (n) {
	return this.substring(0, n);
}

function LoadQuakes() {

	var infoDisplay = $('#QuakesInfo');
	var logLines = [];
	var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

	if (window.XMLHttpRequest) { xhttp = new XMLHttpRequest(`${url}`); } else { xhttp = new ActiveXObject("Microsoft.XMLHTTP"); }
	logLines.push('GLOBAL Data Source Location: <span style="color:blue">' + url + '</span>');

	xhttp.open("GET", url, false);
	xhttp.send();

	const obj = JSON.parse(xhttp.responseText);

	logLines.push('There are -' + obj.features.length + '- lines of data in this data stream.');

	for (let v = 0; v < obj.features.length; v++) {
		let e = new Object();

		e.coords = {};
		e.coords.lat = obj.features[v].geometry.coordinates[1];
		e.coords.long = obj.features[v].geometry.coordinates[0];
		e.id = obj.features[v].id;
		e.mag = obj.features[v].properties.mag;
		e.place = obj.features[v].properties.place;
		e.time = obj.features[v].properties.time;
		e.title = obj.features[v].properties.title;
		e.type = obj.features[v].properties.type;
		e.tsunami = obj.features[v].properties.tsunami;
		e.url = obj.features[v].properties.url;

		if (e.mag >= 0) {
			var c = [e.coords.lat, e.coords.long];
			var d = { color: 'black', opacity: 0.65, fillColor: '#090', fillOpacity: 0.15, radius: 1200 * e.mag * 8 };
			//var h = { color: 'green', opacity: 0.15, fillColor: '#090', fillOpacity: 0.15, radius: 200 * e.mag * 5 };

			var f = '<a href="' + e.url + '">' + e.type + (e.tsunami === 1 ? ' *** TSUNAMI ***' : '') + '</a >  : ' + e.title + '<div>' + '[ ' + e.coords.lat + ', ' + e.coords.long + ' ]</div>'

			//L.circle(c, d).addTo(map).bindPopup(f, g).bindTooltip(f, {permanent: false}).openTooltip();
			L.circle(c, d).addTo(map).bindPopup(f, gOpt.pop).bindTooltip(f, gOpt.tip);
			//L.marker(c, d).addTo(map).bindPopup(f, h);
		}
	}

	//Canada Quakes
	// xml 
	// .feed.entry[]

	function GetXML() {

		if (window.XMLHttpRequest) { xhttp = new XMLHttpRequest(); } else { xhttp = new ActiveXObject("Microsoft.XMLHTTP"); }

		var url = 'https://www.earthquakescanada.nrcan.gc.ca/cache/earthquakes/canada-30-en.atom';

		var q = new Date(Date.now());
		logLines.push('Stream retrieve Start Time :' + q.toISOString());
		logLines.push('CANADA ONLY Data Source Location: <span style="color:blue">' + url + '</span>');

		url = 'SERVICES/Conflicts/PainInTheCORB.cfm';

		xhttp.open("GET", url, false);
		xhttp.send();

		const obj = JSON.parse(xhttp.responseText);

		logLines.push('There are -' + obj.DATA.length + '- lines of data in this data stream.');

		for (let v = 0; v < obj.DATA.length; v++) {
			let e = new Object();
			e.coords = {};
			e.coords.lat = obj.DATA[v][3];
			e.coords.long = obj.DATA[v][4];
			e.id = v;
			e.mag = obj.DATA[v][0].split(": M")[1].split(" ")[0];
			e.place = obj.DATA[v][0].split(" of ")[1];
			e.time = obj.DATA[v][0].left(10);
			e.title = obj.DATA[v][0].split(" of ")[1];
			e.type = 'Earthquake';
			e.tsunami = 0;
			e.url = obj.DATA[v][1];

			if (e.mag >= 0) {
				var c = [e.coords.lat, e.coords.long];
				var d = { color: 'black', opacity: 0.65, fillColor: '#090', fillOpacity: 0.15, radius: 1200 * e.mag * 8 };
				//var h = { color: 'green', opacity: 0.15, fillColor: '#090', fillOpacity: 0.15, radius: 200 * e.mag * 5 };

				var f = '<a href="' + e.url + '">' + e.type + (e.tsunami === 1 ? ' *** TSUNAMI ***' : '') +
					'</a >  : M' + e.mag + ' - ' + e.title + '<div>' + '[ ' + e.coords.lat + ', ' + e.coords.long + ' ]</div>'

				L.circle(c, d).addTo(map).bindPopup(f, gOpt.pop).bindTooltip(f, gOpt.tip);

				//L.marker(c, d).addTo(map).bindPopup(f, h);
			}
		}

	}

	GetXML();
	var q = new Date(Date.now());
	logLines.push('Stream retrieve End Time :' + q.toISOString());

	//
	var stream = '<p>' + logLines.join('</p><p>') + '</p>';
	infoDisplay.html(stream).focus();

	DutchsinseForceMap()

	map.setView([38, -97], 5);
}



// Hospitals
// https://ertrack.net/api/hospitals/
//
/*
* 
* 
Field	Explanation	Type	Example
hospital_id	Unique ID for querying data from ERTrack	Integer	“347”
hospital_name	Name of facility	String	“Medical City Weatherford”
address	Street address of facility	String	“713 East Anderson Street, Weatherford, TX 76086”
lat	Latitude	Float	“32.748191”
lng	Longitude	Float	“-97.78565”
county	County in which facility is located	String	“Parker”
state	State in which facility is located	String	“TX”
fips	15 digit FIPS code	String	“483671402003000”
* 
*/

function LoadHospitals() {

	if (window.XMLHttpRequest) { xhttp = new XMLHttpRequest(); } else { xhttp = new ActiveXObject("Microsoft.XMLHTTP"); }

	xhttp.open("GET", "https://ertrack.net/api/hospitals/", false);
	xhttp.send();

	const obj = JSON.parse(xhttp.responseText);

	function isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	for (let v = 0; v < obj.length; v++) {

		let o = obj[v];
		let e = new Object();

		e.lat = o.lat;
		e.long = o.lng;
		e.id = o.fips;
		e.title = o.hospital_name;
		e.type = 'Hospital';
		e.hospital_id = o.hospital_id;

		if (isNumeric(e.lat)) {

			var circle = L.circle(
				[e.lat, e.long],
				{
					color: 'blue',
					opacity: 0.25,
					fillColor: '#00A',
					fillOpacity: 0.25,
					radius: 50
				})

			circle.addTo(map);

			var f = '<a href="javascript:GetHospitalData( ' + e.hospital_id + ',' + e.lat + ',' + e.long + ' )">' + e.type + '</a >  : ' + e.title + '<div>' + '[ ' + e.lat + ', ' + e.long + ' ]</div>'

			circle.bindPopup(f, gOpt.pop).bindTooltip(f, gOpt.tip);
		}
	}
}

function parseXml(xml) {
	var dom = null;
	if (window.DOMParser) {
		try {
			dom = (new DOMParser()).parseFromString(xml, "text/xml");
		}
		catch (e) { dom = null; }
	}
	else if (window.ActiveXObject) {
		try {
			dom = new ActiveXObject('Microsoft.XMLDOM');
			dom.async = false;
			if (!dom.loadXML(xml)) // parse error ..

				window.alert(dom.parseError.reason + dom.parseError.srcText);
		}
		catch (e) { dom = null; }
	}
	else
		alert("cannot parse xml string!");
	return dom;
}


//
//
// https://reliefweb.int/disasters/rss.xml
// https://firms.modaps.eosdis.nasa.gov/api/area/csv/6e7c20d3e4962a5e6d0a8d79c172d16f/VIIRS_SNPP_NRT/world/1/2022-07-16
//
//
//

/* 
* CSVToJSON('col1,col2\na,b\nc,d');
* // [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
* CSVToJSON('col1;col2\na;b\nc;d', ';');
* // [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
*/

const CSVToJSON = (data, delimiter = ',') => {
	const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
	return data
		.slice(data.indexOf('\n') + 1)
		.split('\n')
		.map(v => {
			const values = v.split(delimiter);
			return titles.reduce(
				(obj, title, index) => ((obj[title] = values[index]), obj),
				{}
			);
		});
};


function getFireData() {
	if (window.XMLHttpRequest) { xhttp = new XMLHttpRequest(); } else { xhttp = new ActiveXObject("Microsoft.XMLHTTP"); }

	var url = 'https://firms.modaps.eosdis.nasa.gov/usfs/api/area/csv/6e7c20d3e4962a5e6d0a8d79c172d16f/MODIS_NRT/world/1'
	var logLines = [];
	var q = new Date(Date.now());

	xhttp.open("GET", url, false);
	xhttp.send();
	txt = xhttp.responseText;

	logLines.push('Stream retrieve Start Time :' + q.toISOString());
	logLines.push('GLOBAL Data Source Location: <span style="color:blue">' + url + '</span>');

	var objText = CSVToJSON(txt);
	var infoDisplay = $('#FiresInfo');

	logLines.push('There are -' + objText.length + '- lines of data in this data stream.');

	for (let v = 0; v < objText.length; v++) {
		let e = objText[v];
		e.brightness = parseInt(e.brightness);

		if (e.brightness > 0) {
			var circle = L.circle(
				[e.latitude, e.longitude],
				{
					color: 'red',
					opacity: 0.25,
					fillColor: '#900',
					fillOpacity: 0.15,
					radius: 100 * (e.brightness - 200),
				}
			)

			var f = '<div>' + 'FIRE:' + e.acq_date + ' ' + e.acq_time + ': ' + e.brightness + '</div>'

			circle.addTo(map).bindPopup(f, gOpt.pop).bindTooltip(f, gOpt.tip);
		}
	}

	q = new Date(Date.now());
	logLines.push('Stream retrieve End Time :' + q.toISOString());

	var stream = '<p>' + logLines.join('</p><p>') + '</p>';
	infoDisplay.html(stream).focus();

	fireServiceData(map);

}




//
//
//

function isObject(v) {
	return '[object Object]' === Object.prototype.toString.call(v);
};

JSON.sort = function (o) {
	if (Array.isArray(o)) {
		return o.sort().map(JSON.sort);
	} else if (isObject(o)) {
		return Object
			.keys(o)
			.sort()
			.reduce(function (a, k) { a[k] = JSON.sort(o[k]); return a; }, {});
	}

	return o;
}


//
//
//
//
// function getSomeXML() {
// 	if (window.XMLHttpRequest) { xhttp = new XMLHttpRequest(); } else { xhttp = new ActiveXObject("Microsoft.XMLHTTP"); }

// 	xhttp.open("GET", "https://alerts.weather.gov/cap/us.php?x=0", false);
// 	xhttp.send();
// 	xmlDoc = xhttp.responseText;

// 	var dom = parseXml(xmlDoc);
// 	var json = xml2json(dom);
// 	var txt = '{"' + json.substring(12, json.length - 17) + ']}}'
// }






/* Get Conflicts is a weird fucker */


async function getConflicts() {
	let url = 'SERVICES/Conflicts/getjson.cfm';
	try {
		let res = await fetch(url);
		return await res.json();
	} catch (error) {
		console.log(error);
	}
}

function getConflictData() {
	(async function () {
		await getConflictDataPromise();
	})();
}

async function getConflictDataPromise() {
	let conflicts = await getConflicts();
	conflicts.DATA.forEach(c => {

		var circle = L.marker(
			[c[1], c[2]],
			{
				color: 'red',
				opacity: 0.65,
				fillColor: '#900',
				fillOpacity: 0.65,
				radius: 15000,
			}
		)

		circle.addTo(map);

		var f = '<di' + 'v>' + 'Conflict:' + c[3] + ' ' + c[0] + ' ' + c[4] + '</di>'

		circle.bindPopup(f, gOpt.pop).bindTooltip(c[3], gOpt.tip);

	});
}

var info;

function AddDateBox() {
	// Add Date Control
	info = L.control();

	var x = new Date();
	var jArray = [];
	// x = new Date(x + 50 * 60000);

	for (var jj = 0; jj < 10; jj++) {
		y = new Date(x - ((50 - (5 * jj)) * 60000));
		jArray.push(y.toTimeString().substr(0, 5));
	}

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (x) {
		this._div.innerHTML = "Radar time: " + jArray[x] + " local";
		this._div.style.color = 'white';
		this._div.style.backgroundColor = 'blue';
	};

	info.addTo(map);

}


Date.prototype.vbDate = function () {
	//return this.month() + ' ' + this.getDate() + ',' + this.getFullYear()
	var today = new Date();
	return Math.floor((today.valueOf() / (1000 * 60 * 60 * 24)) - 0.5) + 2440588;

};

function AddRadarLayer() {

	if (typeof AddRadarLayer.counter == 'undefined') {
		// It has not... perform the initialization
		AddRadarLayer.counter = 0;
	}
	var sURL = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0q.cgi';
	/*
	


	https://cdn.star.nesdis.noaa.gov/GOES16/ABI/CONUS/14/20222110211_GOES16-ABI-CONUS-14-5000x3000.jpg

	https://	cdn.star.nesdis.noaa.gov/GOES16/ABI/CONUS/14/20222110211_GOES16-ABI-CONUS-14-5000x3000.jpg
	http://mesonet.agron.iastate.edu/cgi-bin/wms/goes/west_ir.cgi

	202207300200"

	https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/5/6/12.png

	http://mesonet.agron.iastate.edu/cgi-bin/wms/goes/west_ir.cgi?Layer=CONUS_14
	
	layers[]=nexrad&sector=conus&ts=200806071000

	https://mesonet.agron.iastate.edu/cgi-bin/wms/goes_east.cgi?
	Layer Template: sector_chchannel ie hawaii_ch02


*/


	if (AddRadarLayer.counter == 0) {
		++AddRadarLayer.counter
		AddDateBox();

		var radarLayers = [];
		for (var hour = 0; hour <= 10; hour++) {
			time = (50) - (hour * 5);
			var layer = 'nexrad-n0q-900913-m' + time + 'm';
			radarLayers[hour] = L.tileLayer.wms(`${sURL}`, {
				layers: layer,
				format: 'image/png',
				transparent: true,
				opacity: 0.0
			});
			radarLayers[hour].addTo(map).bringToFront();
		}
	}

	var i = 0;                     //  set your counter to 1

	function myLoop() {           //  create a loop function
		setTimeout(function () {    //  call a 3s setTimeout when the loop is called
			radarLayers.map(function (layer) { layer.setOpacity(0) });
			radarLayers[i].setOpacity(0.6);
			info.update(i);                  //  increment the counter
			i++;
			if (i < 9) { myLoop(); } else { i = 0; myLoop(); }
		}, i == 0 ? 1200 : 350)
		return i;
	}

	myLoop();
}



function MainMenuHandlerProxy(e) {
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	//animate the button
	var ID = e.target.id;
	$('.info').animate({ height: 'toggle' }).delay(1000).animate({ height: 'toggle' });
	$(`#${ID}.OneUse`).animate({ visibility: 'toggle' });
	$('.LASTCLICKED').animate({ backgroundColor: "#0000cc" }, "fast").removeClass('LASTCLICKED');
	$(`#${ID}`).animate({ backgroundColor: "olive", color: "white" }, "slow").addClass('LASTCLICKED');
	//Then sleep and call the menu
	sleep(500).then(() => { MainMenuHandler(e) });
}
/* */
// Master function for handling button clicks on main page
function MainMenuHandler(e) {
	var ID = e.target.id, blockShowMap = false;
	switch (ID) {
		case 'GETRad': /* Radar	 	RadarInfo		*/ AddRadarLayer(); break;
		case 'GETLoc': /* testLoc					*/ GetHomeLocation(); break;
		case 'GETHos': /* Hospitals	HospitalsInfo	*/ LoadHospitals(); break;
		case 'GETQua': /* Quakes	QuakesInfo		*/ LoadQuakes(); break;
		case 'SHOLoc': /* My Loc 					*/ ResetToHomeLocation(); break;
		case 'SHOHyb': /* Hybrid					*/ GoogClick(GoogServices.Hybrid, goog.Hybrid); blockShowMap = true; break;
		case 'SHOSat': /* Satelite					*/ GoogClick(GoogServices.Satelite, goog.Satelite); blockShowMap = true; break;
		case 'SHOStr': /* Streets					*/ GoogClick(GoogServices.Streets, goog.Streets); blockShowMap = true; break;
		case 'SHOTer': /* Terrain					*/ GoogClick(GoogServices.Terrain, goog.Terrain); blockShowMap = true; break;
		case 'SHOTra': /* Traffic					*/ GoogClick(GoogServices.Traffic, goog.Traffic); blockShowMap = true; break;
		case 'GETCon': /* Conflicts	ConflictsInfo	*/ getConflictData(); break;
		case 'GETFir': /* Fires		FiresInfo		*/ getFireData(); break;
		case 'CLKPry': /* MapInit					*/ ClickToPray(this); blockShowMap = true;
			$('#GoogleServices,#PersonalInfo,#MapDatsets,#PeopleGroups').toggle();
			break;
		default: blockShowMap = true;
	}
	if (!blockShowMap) { $("#ui-id-1").click(); }

}



function addFireImagingLayer() {
	var imageLayers = [];
	var imageBounds = [[49.147049, -128.553619], [1.320017, -40.664912]]

	var url = new Array(1).fill('https://cdn.star.nesdis.noaa.gov/GOES16/ABI/CONUS/FireTemperature/');
	url[0] += 'GOES16-CONUS-FireTemperature-625x375.gif';

	imageLayers[0] = L.imageOverlay(url[0], imageBounds).setOpacity(0.75);

	L.layerGroup(imageLayers).addTo(map);
}

function DutchsinseForceMap() {
	var sURL = 'image/PublicDownload1.4MED.png';
	var imageBounds = [[69.8, -180], [-71, 180]]
	ll = L.imageOverlay(sURL, imageBounds).setOpacity(0.4);

	ll.addTo(map);

}








$(document).ready(async function () {
	await loadFull(tsParticles);

	// APPLICATION INITIALIZATION
	// *******
	$("#tabs").tabs();
	$('.info').hide();
	$("#slider").slider({
		max: 20,
		min: 0,
		step: 1,
		value: 10,
		slide: function (e, ui) {
			map.setZoom(ui.value);
		}
	});
	$(".TopActions Button").addClass('button', 'button-effect').click(MainMenuHandlerProxy);

	$("#CLKPry").click();	

	$("#tsparticles").particles().init({
		background: { color: { value: "#0d47a1" } },
		fpsLimit: 120,
		interactivity: {
			events: {
				onClick: { enable: true, mode: "push" },
				onHover: { enable: true, mode: "repulse" },
				resize: true
			},
			modes: {
				push: { quantity: 4 },
				repulse: { distance: 200, duration: 0.4 }
			}
		},
		particles: {
			color: { value: "#ffffff" },
			links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.5, width: 1 },
			collisions: { enable: true },
			move: {
				direction: "none", enable: true, outModes: { default: "bounce" },
				random: false, speed: 6, straight: false
			},
			number: { density: { enable: true, area: 800 }, value: 80 },
			opacity: { value: 0.5 },
			shape: { type: "circle" },
			size: { value: { min: 1, max: 5 } }
		},
		detectRetina: true
	}, function (container) {
		// container is the particles container where you can play/pause or stop/start.
		// the container is already started, you don't need to start it manually.
	});

	// or

	$("#tsparticles").particles().ajax("doc/dev/particles.json", function (container) {
		// container is the particles container where you can play/pause or stop/start.
		// the container is already started, you don't need to start it manually.
	});
});
