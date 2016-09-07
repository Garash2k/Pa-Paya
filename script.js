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

	var spriggan = document.getElementById("spriggan-chase");	
	spriggan.addEventListener("transitionend", doSprigganChase);
	doSprigganChase();
	
	function setSprigganPos(sprigganPos, additionalTransform) {
		spriggan.style.transform = "translate(" + sprigganPos.x + "px, " + sprigganPos.y + "px)" + additionalTransform;
	}
	
	function doSprigganChase() {
		//Set random egg
		var egg = document.getElementById("egg");
		egg.src = "egg/egg-" + Math.ceil(Math.random() * NO_EGGS) + ".png";
		
		var durationMS = 3000 + 9000 * Math.random();
		
		//Set random pos+Orient by direction
		var direction = Math.random() > 0.5 ? DIRECTION_HORIZONTAL : DIRECTION_VERTICAL
		var isInvert = Math.random() > 0.5;
		
		var posInitial = {x: 0, y: 0};
		var posDestination = {x: window.innerWidth, y: window.innerHeight};
		
		var additionalTransform = "";
		if (direction === DIRECTION_HORIZONTAL) {
			if (!isInvert) {
				//x: 0->max
				//y: random->random
				posInitial.x = 0;
				posDestination.x = window.innerWidth;
			} else {
				//x: max->0
				//y: random->random
				posInitial.x = window.innerWidth;
				posDestination.x = 0;
				
				additionalTransform += " scaleX(-1) ";
			}
			posInitial.y = Math.random() * window.innerHeight;
			posDestination.y = Math.random() * window.innerHeight;
		} else { //direction vertical
			if (!isInvert) {
				//x: random->random
				//y: 0->max
				posInitial.y = 0;
				posDestination.y = window.innerHeight;
			} else {
				//x: random->random
				//y: max->0
				posInitial.y = window.innerHeight;
				posDestination.y = 0;
				
				additionalTransform += " scaleY(-1) ";
			}
			posInitial.x = Math.random() * window.innerWidth;
			posDestination.x = Math.random() * window.innerWidth;
			
			additionalTransform += " rotate(90deg) ";
		}
		
		//Do the animation
		posInitial.x = posInitial.x - SPRIGGAN_CHASE_WIDTH;
		posInitial.y = posInitial.y - SPRIGGAN_CHASE_HEIGHT;
		
		spriggan.style.transition = "none";
		setSprigganPos(posInitial, additionalTransform);
		
		setTimeout(function() {
			spriggan.style.transition = "transform " + durationMS + "ms linear";
			setSprigganPos(posDestination, additionalTransform);
		}, 1);
	}
}) ();