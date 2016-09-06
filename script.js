(function() {
	function isDev() {
		return window.location.href === "file:///D:/Projets/Pa-Paya/index.html";
	}

	var audio = document.getElementById("audio");
	audio.volume = 0.25;

	if (isDev())
		audio.controls = true;

	audio.play();
	
	function doSprigganChase() {
		
	}
}) ();