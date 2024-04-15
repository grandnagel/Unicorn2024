

var startColor = [255, 0, 0];
var endColor = [0, 255, 0];
var gamma = 3;
var duration = 2000;
var div = document.getElementById("foo");
var start = new Date().getTime();

animate();

var interval = window.setInterval(animate, 10);
function animate() {
	var step = (new Date().getTime() - start) / duration;

	if (step > 1) {
		window.clearInterval(interval);
	}
	step = Math.min(1, step);
	var c = colorString(
		average(startColor[0], endColor[0], step),
		average(startColor[1], endColor[1], step),
		average(startColor[2], endColor[2], step)
	);
	foo.style.backgroundColor = c;
}

function colorString(r, g, b) {
	r = Math.min(255, Math.max(0, Math.round(r)));
	g = Math.min(255, Math.max(0, Math.round(g)));
	b = Math.min(255, Math.max(0, Math.round(b)));
	return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2)
}

function average(a, b, percent) {
	var a_2 = Math.pow(a, gamma);
	var b_2 = Math.pow(b, gamma);
	var c_2 = a_2 + (b_2 - a_2) * percent
	return Math.pow(c_2, 1 / gamma);
}