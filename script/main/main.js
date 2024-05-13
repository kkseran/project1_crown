// #header
$('#menuWeb').hover(
	function () {
		$(this).find('.subWeb').stop().slideDown();
		$('#gnbBg').stop().css('opacity', '1').animate({ height: '340px' });
		$('#menuWeb>ul>li>a').css('color', '#222');
	},
	function () {
		$(this).find('.subWeb').stop().slideUp();
		$('#gnbBg').stop().css('opacity', '0').animate({ height: '0px' });
		$('#menuWeb>ul>li>a').css('color', '#fff');
	}
);
$('.btnDown').click(function () {
	$(this).toggleClass('active');
	$('.subMo').toggleClass('active');
});

// #slide
// Initialize Swiper
const progressCircle = document.querySelector('.autoplay-progress svg');
const progressContent = document.querySelector('.autoplay-progress span');
var swiper = new Swiper('.mySwiper', {
	spaceBetween: 30,
	effect: 'fade',
	centeredSlides: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: true,
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: false,
	},
	loop: true,
	speed: 1000,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	on: {
		autoplayTimeLeft(s, time, progress) {
			progressCircle.style.setProperty('--progress', 1 - progress);
			progressContent.textContent = `${Math.ceil(time / 1000)}s`;
		},
	},
});

// #products
$('.contentBox').mouseenter(function () {
	$(this).addClass('on');
});
$('.contentBox').mouseleave(function () {
	$(this).removeClass('on');
});

let contentBox = document.querySelectorAll('.contentBox');
console.log(contentBox.length);
for (let i = 0; i < contentBox.length; i++) {
	contentBox[i].addEventListener('click', (e) => {
		for (let j = 0; j < contentBox.length; j++) {
			contentBox[j].className = 'contentBox';
		}
		contentBox[i].className = 'contentBox on';
		let bg = document.querySelectorAll('.productBg');
		bg[i + 1].classList.add('on');
	});
}
