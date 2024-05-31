// #header
let $header = $('#header');
let $menuWeb = $('#menuWeb');
let $menuWeb_ul_li = $menuWeb.children('ul').children('li');
let $subWeb = $('.subWeb');
let $subWeb_li = $subWeb.children('li');
let htArr = [];
let htMax = 0;
let speed = 500;

$menuWeb_ul_li.each(function (i) {
	htArr.push($(this).children('ul').height());
	htMax = Math.max(htMax, htArr[i]);
});

$menuWeb.on('mouseenter', function () {
	if ($('#bgGnb').length) return;
	$menuWeb.prepend(
		$('<div id="bgGnb">').css({
			height: htMax,
		})
	);
	$header.addClass('scroll');
	$subWeb.delay(200).slideDown(speed);
	$('#bgGnb').delay(200).slideDown(speed);
});
$menuWeb.on('mouseleave', function () {
	setTimeout(function () {
		if ($('#bgGnb').length) return;
		$header.removeClass('scroll');
	}, 550);
	$subWeb.stop().slideUp(speed);
	$('#bgGnb')
		.stop()
		.slideUp(speed, function () {
			$(this).remove();
		});
});
$menuWeb_ul_li.hover(
	function () {
		$(this).addClass('on');
	},
	function () {
		$(this).removeClass('on');
	}
);

let offset = $header.offset();
$(window).scroll(function () {
	if ($(document).scrollTop() > offset.top) {
		$header.addClass('scroll');
	} else {
		$header.removeClass('scroll');
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

$('.contentBox.on').click(function () {
	$('.contentBox').removeClass('on');
});

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
let vidList = document.querySelector('#con03>.socialSlide>.slideList');
let key = 'AIzaSyBUOCxCOPILmnFIM5-h5jjQhoqGKFnvFnU';
let playListId = 'PLncUEVpPoLRkwpBZXXFrm6U7nd0JADKsF';
let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=6`;

fetch(url)
	.then((data) => {
		return data.json();
	})
	.then((json) => {
		let items = json.items;
		console.log(items);
		let result = '';
		items.map((el) => {
			let date = el.snippet.publishedAt;
			date = date.split('T')[0];
			result += `<li class="swiper-slide">
			<a href=${el.snippet.resourceId.videoId}>
				<div class="img">
					<img src="${el.snippet.thumbnails.high.url}" alt="${el.snippet.title}" />
				</div>	
				<div class="content">
					<h3>${el.snippet.title}</h3>
					<p class="date">${date}</p>
					<p class="infotext">${el.snippet.description}</p>
				</div>
			</a>
		</li>`;
			vidList.innerHTML = result;
		});
	});

// $(vidList).click(function (e) {
// 	e.preventDefault();
// 	if (!e.target.closest('.swiper-slide')) return;
// 	let vidId = e.target.closest('a').getAttribute('href');
// 	$('#pop').addClass('on');
// 	$('#pop .popInfo').before(`<div class="imgWrap"></div>`);
// 	$(
// 		'#pop > .imgWrap'
// 	).prepend(`<iframe class="video" src='https://www.youtube.com/embed/${vidId}?rel=0&playsinline=1&autoplay=1' frameborder='0' width='100%' height='100%' allowfullscreen></iframe>
// 	`);
// });

$(vidList).on('click', '.swiper-slide', function (e) {
	e.preventDefault();
	if (!e.target.closest('.swiper-slide')) return;
	let vidId = e.target.closest('a').getAttribute('href');
	$('#pop').addClass('on');
	$('#pop .popInfo').before(`<div class="imgWrap"></div>`);
	$(
		'#pop > .imgWrap'
	).prepend(`<iframe class="video" src='https://www.youtube.com/embed/${vidId}?rel=0&playsinline=1&autoplay=1' frameborder='0' width='100%' height='100%' allowfullscreen></iframe>
	`);
	$('#pop > .popTitle').text($(this).find('h3').text());
	$('#pop > .popInfo').html($(this).find('.infotext').html());
	$('#pop > .popDate').text($(this).find('.date').text());
});

// social_popup
$('.swiper-slide').click(function () {
	$('#pop').addClass('on');
	$('#pop .popInfo').before(`<div class="imgWrap"></div>`);
	let imgSrc = 'url(' + '.' + $(this).find('img').attr('src') + ')';
	$('#pop > .imgWrap').css('background-image', imgSrc);
	$('#pop > .popTitle').text($(this).find('h3').text());
	$('#pop > .popInfo').html($(this).find('.infotext').html());
	$('#pop > .popDate').text($(this).find('.date').text());
	$('#pop > .popDate').after($(this).find('.blank'));
});
$('#pop > .closeBtn').click(function (e) {
	e.preventDefault();
	$('#pop .imgWrap').remove();
	$('#pop').removeClass('on');
});
