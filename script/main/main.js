// #header
$('#menuWeb').hover(
	function () {
		$(this).find('.subWeb').stop().css('opacity', '1').slideDown();
		$('#gnbBg').stop().css('opacity', '1').animate({ height: '340px' });
		$('#header').addClass('scroll');
	},
	function () {
		$(this).find('.subWeb').stop().css('opacity', '0').slideUp();
		$('#gnbBg').stop().css('opacity', '0').animate({ height: '0px' });
		$('#header').removeClass('scroll');
	}
);

let offset = $('#header').offset();
$(window).scroll(function () {
	if ($(document).scrollTop() > offset.top) {
		$('#header').addClass('scroll');
	} else {
		$('#header').removeClass('scroll');
	}
});

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
// $('.contentBox').mouseenter(function () {
// 	$(this).addClass('on');
// });
// $('.contentBox').mouseleave(function () {
// 	$(this).removeClass('on');
// });

$('.contentBox').click(function () {
	if ($('.productBg').hasClass('on')) {
		$('.productBg').removeClass('on');
	}
});

let contentBox = document.querySelectorAll('.contentBox');
let bg = document.querySelectorAll('.productBg');
let productsTexts = document.querySelector('.productsTexts');
console.log(contentBox.length);
for (let i = 0; i < contentBox.length; i++) {
	contentBox[i].addEventListener('click', (e) => {
		for (let j = 0; j < contentBox.length; j++) {
			contentBox[j].className = 'contentBox';
		}
		contentBox[i].className = 'contentBox on';
		// contentBox[i].classList.toggle('on');
		// if (bg.classList.contains('on')) {
		// 	bg.classList.remove('on');
		// }
		bg[i + 1].classList.add('on');

		let productsTitle = e.currentTarget.querySelector('.contentTitle').innerText;
		let productsTxt = e.currentTarget.querySelector('.contentTxt').innerText;
		let productsInfoTxt = e.currentTarget.querySelector('.contentInfoTxt').innerText;

		productsTexts.querySelector('.productsTitle').innerText = productsTitle;
		productsTexts.querySelector('.productsTxt').innerText = productsTxt;
		productsTexts.querySelector('.productsInfoTxt').innerText = productsInfoTxt;
	});
}
