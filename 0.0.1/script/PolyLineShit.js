function tryPolyLines() {

	//var drawControl = new L.Control.Draw(gOpt.draw);
	//map.addControl(drawControl);

	var trackRoute = [];
	trackRoute.push(JSON.parse('[ {"lat": 46.385358651385, "lng": -72.798560742368}, {"lat": 41.396358466357 , "lng": -75.785771842518} ]'));
	trackRoute.push(JSON.parse('[ {"lat": 41.396358466357, "lng": -75.785771842518},{"lat": 41.396358466357 , "lng": -75.785771842518} ]'));
	trackRoute.push(JSON.parse('[ {"lat": 36.396338219788, "lng": -102.804358243468},{"lat": 41.396358466357 , "lng": -75.785771842518} ]'));
	trackRoute.push(JSON.parse('[ {"lat": 35.384328701378, "lng": -81.698661826443},{"lat": 41.396358466357 , "lng": -75.785771842518} ]'));
	trackRoute.push(JSON.parse('[ {"lat": 35.396358630727, "lng": -89.788262763530},{"lat": 41.396358466357 , "lng": -75.785771842518} ]'));
	trackRoute.push(JSON.parse('[ {"lat": 47.386338516917, "lng": -96.837258866710},{"lat": 41.396358466357 , "lng": -75.785771842518} ]'));
	trackRoute.push(JSON.parse('[ {"lat": 45.396338132960, "lng": -78.738569284579},{"lat": 41.396358466357 , "lng": -75.785771842518} ]'));
	trackRoute.push(JSON.parse('[ {"lat": 42.385358662081, "lng": -74.477269347161},{"lat": 41.396358466357 , "lng": -75.785771842518} ]'));
	trackRoute.push(JSON.parse('[ {"lat": 28.384318528735, "lng": -82.468964814595},{"lat": 41.396358466357 , "lng": -75.785771842518} ]'));
	trackRoute.push(JSON.parse('[ {"lat": 39.394308229332, "lng": 88.565273382957},{"lat": 41.396358466357 , "lng": -75.785771842518} ]'));
	trackRoute.push(JSON.parse('[ {"lat": 33.395318102903, "lng": -96.694363179630},{"lat": 41.396358466357 , "lng": -75.785771842518} ]'));

	var seqGroup = L.motion.seq([

		L.motion.polyline(trackRoute[0], { color: "orangered" }, { easing: L.Motion.Ease.easeOutBounce }, { removeOnEnd: false, icon: L.divIcon({ iconSize: L.point(56.5, 56), html: "<i class='fa fa-heart fa-pulse fa-spin fa-2x fa-flip-horizontal' aria-hidden='true'></i>" }) }).motionDuration(3000),
		L.motion.polyline(trackRoute[1], { color: "orangered" }, { easing: L.Motion.Ease.easeOutBounce }, { removeOnEnd: false, icon: L.divIcon({ iconSize: L.point(56.5, 56), html: "<i class='fa fa-cross fa-pulse fa-spin fa-2x fa-flip-vertical' aria-hidden='true'></i>" }) }).motionDuration(3000),
		L.motion.polyline(trackRoute[2], { color: "orangered" }, { easing: L.Motion.Ease.easeOutBounce }, { removeOnEnd: false, icon: L.divIcon({ iconSize: L.point(56.5, 56), html: "<i class='fa fa-crown fa-pulse fa-spin fa-2x fa-flip-horizontal' aria-hidden='true'></i>" }) }).motionDuration(3000),
		L.motion.polyline(trackRoute[3], { color: "orangered" }, { easing: L.Motion.Ease.easeOutBounce }, { removeOnEnd: false, icon: L.divIcon({ iconSize: L.point(56.5, 56), html: "<i class='fa fa-dharmachakra fa-pulse fa-spin fa-2x fa-flip-vertical' aria-hidden='true'></i>" }) }).motionDuration(3000),
		L.motion.polyline(trackRoute[4], { color: "orangered" }, { easing: L.Motion.Ease.easeOutBounce }, { removeOnEnd: false, icon: L.divIcon({ iconSize: L.point(56.5, 56), html: "<i class='fa fa-dragon fa-pulse fa-spin fa-2x fa-flip-horizontal' aria-hidden='true'></i>" }) }).motionDuration(3000),
		L.motion.polyline(trackRoute[5], { color: "orangered" }, { easing: L.Motion.Ease.easeOutBounce }, { removeOnEnd: false, icon: L.divIcon({ iconSize: L.point(56.5, 56), html: "<i class='fa fa-edge fa-pulse fa-spin fa-2x fa-flip-vertical' aria-hidden='true'></i>" }) }).motionDuration(3000),
		L.motion.polyline(trackRoute[6], { color: "orangered" }, { easing: L.Motion.Ease.easeOutBounce }, { removeOnEnd: false, icon: L.divIcon({ iconSize: L.point(56.5, 56), html: "<i class='fa fa-empire fa-pulse fa-spin fa-2x fa-flip-horizontal' aria-hidden='true'></i>" }) }).motionDuration(3000),
		L.motion.polyline(trackRoute[7], { color: "orangered" }, { easing: L.Motion.Ease.easeOutBounce }, { removeOnEnd: false, icon: L.divIcon({ iconSize: L.point(56.5, 56), html: "<i class='fa fa-hands-bound fa-pulse fa-spin fa-2x fa-flip-horizontal' aria-hidden='true'></i>" }) }).motionDuration(3000),
		L.motion.polyline(trackRoute[8], { color: "orangered" }, { easing: L.Motion.Ease.easeOutBounce }, { removeOnEnd: false, icon: L.divIcon({ iconSize: L.point(56.5, 56), html: "<i class='fa fa-hands-praying fa-pulse fa-spin fa-2x fa-flip-horizontal' aria-hidden='true'></i>" }) }).motionDuration(3000),
		L.motion.polyline(trackRoute[9], { color: "orangered" }, { easing: L.Motion.Ease.easeOutBounce }, { removeOnEnd: false, icon: L.divIcon({ iconSize: L.point(56.5, 56), html: "<i class='fa fa-life-ring fa-pulse fa-spin fa-2x fa-flip-horizontal' aria-hidden='true'></i>" }) }).motionDuration(3000),
		L.motion.polyline(trackRoute[10], { color: "orangered" }, { easing: L.Motion.Ease.easeOutBounce }, { removeOnEnd: false, icon: L.divIcon({ iconSize: L.point(56.5, 56), html: "<i class='fa fa-person-rays fa-pulse fa-spin fa-2x fa-flip-horizontal' aria-hidden='true'></i>" }) }).motionDuration(3000)

	]).addTo(map);

	//seqGroup.on("click", function () { seqGroup.motionStart(); });
	//seqGroup.on("dblclick", function (e) { seqGroup.motionToggle(); });
	setTimeout(function () { seqGroup.motionStart(); }, 1000);
	setTimeout(function () { seqGroup.remove(); }, 36000);

}