(function() {
	var SPRIGGAN_CHASE_WIDTH = 160;
	var SPRIGGAN_CHASE_HEIGHT = 177;
	var NO_EGGS = 5;
	var DIRECTION_HORIZONTAL = 0;
	var DIRECTION_VERTICAL = 1;
	
	function isDev() {
		return window.location.href === "file:///D:/Projets/Pa-Paya/index.html";
	}

	var audio = document.getElementById("audio");
	audio.volume = 0.25;

	if (isDev())
		audio.volume = 0.01;

	audio.play();
	
	startTimer();

    document.addEventListener('keypress', pressKey);

	var initialSpriggan = document.getElementsByClassName("spriggan-chase")[0];
    var templateSpriggan = initialSpriggan.cloneNode(true);

	window.addEventListener('load', function() {
		startSprigganChase(initialSpriggan);
		document.getElementById("art").addEventListener("click", togglePause);
	});
	
	function startSprigganChase(spriggan) {
		function setSprigganPos(sprigganPos, additionalTransform) {
			additionalTransform = additionalTransform || "";
			spriggan.style.transform = "translate(" + sprigganPos.x + "px, " + sprigganPos.y + "px)" + additionalTransform;
		}
	
		function getPosInitialDesti() {
			var destinationLeft = 0 - SPRIGGAN_CHASE_WIDTH;
			var destinationTop = 0 - SPRIGGAN_CHASE_HEIGHT;
			
			var posInitialDesti = {};
			
			//Set random pos+Orient by direction
			var direction = Math.random() > 0.5 ? DIRECTION_HORIZONTAL : DIRECTION_VERTICAL;
			var isInvert = Math.random() > 0.5;
			
			posInitialDesti.Initial = {};
			posInitialDesti.Destination = {};
			
			posInitialDesti.AdditionalTransform = "";
			if (direction === DIRECTION_HORIZONTAL) {
				if (!isInvert) {
					//x: 0->max
					//y: random->random
					posInitialDesti.Initial.x = destinationLeft;
					posInitialDesti.Destination.x = window.innerWidth;
				} else {
					//x: max->0
					//y: random->random
					posInitialDesti.Initial.x = window.innerWidth;
					posInitialDesti.Destination.x = destinationLeft;
					
					posInitialDesti.AdditionalTransform += " scaleX(-1) ";
				}
				posInitialDesti.Initial.y = Math.random() * window.innerHeight;
				posInitialDesti.Destination.y = Math.random() * window.innerHeight;
			} else { //direction vertical
				if (!isInvert) {
					//x: random->random
					//y: 0->max
					posInitialDesti.Initial.y = destinationTop;
					posInitialDesti.Destination.y = window.innerHeight;
				} else {
					//x: random->random
					//y: max->0
					posInitialDesti.Initial.y = window.innerHeight;
					posInitialDesti.Destination.y = destinationTop;
					
					posInitialDesti.AdditionalTransform += " scaleY(-1) ";
				}
				posInitialDesti.Initial.x = Math.random() * window.innerWidth;
				posInitialDesti.Destination.x = Math.random() * window.innerWidth;
				
				posInitialDesti.AdditionalTransform += " rotate(90deg) ";
			}
			
			return posInitialDesti;
		}
		
		function doSprigganChase() {
		
			//Set random egg
			var egg = spriggan.getElementsByClassName("egg")[0];
			egg.src = "egg/egg-" + Math.ceil(Math.random() * NO_EGGS) + ".png";
			
			var durationMS = 4000 + 4000 * Math.random();
			
			var posInitialDesti = getPosInitialDesti();
			
			//Do the animation
			spriggan.style.transition = "none";
			setSprigganPos(posInitialDesti.Initial, posInitialDesti.AdditionalTransform);
			
			setTimeout(function() {
				spriggan.style.transition = "transform " + durationMS + "ms linear";
				setSprigganPos(posInitialDesti.Destination, posInitialDesti.AdditionalTransform);
			}, 50);
		}
		
		//Setup recursion.
		spriggan.addEventListener("transitionend", doSprigganChase);
		spriggan.addEventListener('click', createNewSpriggan);
		
		doSprigganChase();
	}
	
	function createNewSpriggan() {
		var newSpriggan = templateSpriggan.cloneNode(true);
		document.body.appendChild(newSpriggan);
		startSprigganChase(newSpriggan);
	}

	function startTimer() {
		var dateStart = new Date();
		var timer = document.getElementById("timer");
		setInterval(function() {
			timer.innerHTML = ((new Date() - dateStart) / 1000).toFixed(1);
		}, 50);
	}
	
	function togglePause() {
		if (audio.paused)
			audio.play();
		else
			audio.pause();
	}

	function pressKey(event) {
		console.log(event.keyCode)

		//Finds the original spriggan
        if(event.keyCode == 102) //f key
        	initialSpriggan.children[0].src = "spriggan-inverted.png";

	}

}) ();