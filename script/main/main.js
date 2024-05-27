// #header
$('#menuWeb').hover(
	function () {
		$(this).find('.subWeb').stop().slideDown();
		$('#gnbBg').stop().css('opacity', '1').animate({ height: '250px' });
		$('#header').addClass('scroll');
	},
	function () {
		$(this).find('.subWeb').stop().slideUp();
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
var swiper = new Swiper('.mainSlide', {
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
let contentBox = document.querySelectorAll('.contentBox');
let bg = document.querySelectorAll('.productBg');
let productsTexts = document.querySelector('.productsTexts');
let contentBoxOn = document.querySelector('.contentBox.on');
console.log(contentBoxOn);

for (let i = 0; i < contentBox.length; i++) {
	contentBox[i].addEventListener('click', (e) => {
		document.querySelectorAll('.productBg.on').forEach(function (el) {
			el.classList.remove('on');
		});
		for (let j = 0; j < contentBox.length; j++) {
			contentBox[j].className = 'contentBox';
		}
		contentBox[i].className = 'contentBox on';
		bg[i + 1].classList.add('on');

		let productsTitle = e.currentTarget.querySelector('.contentTitle').innerText;
		let productsTxt = e.currentTarget.querySelector('.contentTxt').innerText;
		let productsInfoTxt = e.currentTarget.querySelector('.contentInfoTxt').innerText;

		productsTexts.querySelector('.productsTitle').innerText = productsTitle;
		productsTexts.querySelector('.productsTxt').innerText = productsTxt;
		productsTexts.querySelector('.productsInfoTxt').innerText = productsInfoTxt;
	});
}

// #social
// tab
$('.socialTab>.titList>li>a')
	.click(function (event) {
		event.preventDefault();
		$(this.hash).siblings().hide().end().show(0);
		$('.socialTab>.titList>li>a').click(function () {
			$(this).addClass('on');
		});
		$('.socialTab>.titList>li>a').removeClass('on');
	})
	.filter(':eq(0)')
	.click()
	.addClass('on');
// Initialize Swiper
var swiper = new Swiper('.socialSlide', {
	slidesPerView: 3,
	spaceBetween: 30,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
});
// youtube
let vidList = document.querySelector('.slideList');
let key = 'AIzaSyBUOCxCOPILmnFIM5-h5jjQhoqGKFnvFnU';
let playListId = 'PLyMO-9HsK5ZFBY_oefb3G5mvDVLyC3yH7';
let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=6`;

let img = document.querySelectorAll('#con03 .pic');
console.log(img);
let title = document.querySelectorAll('#con03 .content h3');

let date = document.querySelectorAll('#con03 .date');

fetch(url)
	.then((data) => {
		return data.json();
	})
	.then((json) => {
		let items = json.items;
		console.log(items);
		items.map((el) => {
			img.setAttribute('src', '${el.snippet.thumbnails.high.url}');
		});
	});
