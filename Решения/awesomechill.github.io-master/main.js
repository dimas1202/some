// Модальное окно



// открыть по кнопке
$('.js-button-campaign').click(function() { 
	$('main').css('filter', 'blur(5px)');
	$('.js-overlay-campaign').fadeIn();
	$('.js-overlay-campaign').addClass('disabled');
	
});

// закрыть на крестик
$('.js-close-campaign').click(function() { 
	$('.js-overlay-campaign').fadeOut();
	$('main').css('filter', 'none');
});

// закрыть по клику вне окна
$(document).mouseup(function (e) { 
	var popup = $('.js-popup-campaign');
	if (e.target!=popup[0]&&popup.has(e.target).length === 0){
		$('.js-overlay-campaign').fadeOut();
		$('main').css('filter', 'none');
	}
});

// открыть по таймеру 
$(window).on('load', function () { 
	setTimeout(function(){
		if($('.js-overlay-campaign').hasClass('disabled')) {
			return false;
		} else {
			
			$(".js-overlay-campaign").fadeIn();
		}
	}, 5000);
});


// Scratch canvas
var bridge = document.getElementById("bridge"),
bridgeCanvas = bridge.getContext('2d'),
brushRadius = (bridge.width / 100) * 5,
img = new Image();

if (brushRadius < 50) {
brushRadius = 25
}

img.onload = function() {
bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
}
img.loc = './img/';
img.filename = 's.jpg';
if (window.devicePixelRatio >= 2) {
var nameParts = img.filename.split('.');
img.src = img.loc + nameParts[0] + "" + "." + nameParts[1];
} else {
// img.src = img.loc + img.filename;
img.src = './img/s.jpg'
}

function detectLeftButton(event) {
if ('buttons' in event) {
	return event.buttons === 1;
} else if ('which' in event) {
	return event.which === 1;
} else {
	return event.button === 1;
}
}

function getBrushPos(xRef, yRef) {
var bridgeRect = bridge.getBoundingClientRect();
return {
	x: Math.floor((xRef - bridgeRect.left) / (bridgeRect.right - bridgeRect.left) * bridge.width),
	y: Math.floor((yRef - bridgeRect.top) / (bridgeRect.bottom - bridgeRect.top) * bridge.height)
};
}

function drawDot(mouseX, mouseY) {
bridgeCanvas.beginPath();
bridgeCanvas.arc(mouseX, mouseY, brushRadius, 0, 2 * Math.PI, true);
bridgeCanvas.fillStyle = '#000';
bridgeCanvas.globalCompositeOperation = "destination-out";
bridgeCanvas.fill();
}

bridge.addEventListener("mousemove", function(e) {
var brushPos = getBrushPos(e.clientX, e.clientY);
var leftBut = detectLeftButton(e);
if (leftBut == 1) {
	drawDot(brushPos.x, brushPos.y);
}
}, false);

bridge.addEventListener("touchmove", function(e) {
e.preventDefault();
var touch = e.targetTouches[0];
if (touch) {
	var brushPos = getBrushPos(touch.pageX, touch.pageY);
	drawDot(brushPos.x, brushPos.y);
}
}, false);
