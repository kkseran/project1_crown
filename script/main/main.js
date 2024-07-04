enable_event = true;

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

$header.on('mouseenter', function () {
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
$header.on('mouseleave', function () {
	setTimeout(function () {
		if ($(document).scrollTop() > offset.top) return;
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

// #header_media
$('#header .inner .btnCall').click(function (event) {
	event.preventDefault();
	$('#header .inner #menuMo').addClass('on');
});
$('#header .inner #menuMo .close').click(function (event) {
	event.preventDefault();
	$('#header .inner #menuMo').removeClass('on');
	$('#header .inner #menuMo ul > li > .wrap > .btnDown').removeClass('active');
});
$('#menuMo>ul>li>.wrap').click(function () {
	let $btnDown = $(this).find('.btnDown');
	let $sub = $(this).siblings('.subMo');
	$('#menuMo > ul > li > .wrap')
		.not(this)
		.siblings('.subMo')
		.stop()
		.slideUp(500);
	$('#menuMo > ul > li > .wrap')
		.not(this)
		.find('.btnDown')
		.removeClass('active');
	if ($sub.is(':visible')) {
		$sub.stop().slideUp(500);
		$btnDown.removeClass('active');
	} else {
		$sub.stop().slideDown(500);
		$btnDown.addClass('active');
	}
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
		clickable: true,
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
let productsTitle_default = document.querySelector('.productsTitle').innerText;
let productsTxt_default = document.querySelector('.productsTxt').innerText;
let productsInfoTxt_default =
	document.querySelector('.productsInfoTxt').innerText;

for (let i = 0; i < contentBox.length; i++) {
	contentBox[i].addEventListener('click', (e) => {
		let isActive = contentBox[i].classList.contains('on');
		let productsTitle_active =
			e.currentTarget.querySelector('.contentTitle').innerText;
		let productsTxt_active =
			e.currentTarget.querySelector('.contentTxt').innerText;
		let productsInfoTxt_active =
			e.currentTarget.querySelector('.contentInfoTxt').innerText;
		document.querySelectorAll('.productBg.on').forEach(function (el) {
			el.classList.remove('on');
		});
		for (let j = 0; j < contentBox.length; j++) {
			contentBox[j].className = 'contentBox';
		}
		if (isActive && i >= 0 && i <= 5) {
			console.log('??');
			bg[0].classList.add('on');
			productsTexts.querySelector('.productsTitle').innerText =
				productsTitle_default;
			productsTexts.querySelector('.productsTxt').innerText =
				productsTxt_default;
			productsTexts.querySelector('.productsInfoTxt').innerText =
				productsInfoTxt_default;
		} else {
			contentBox[i].classList.add('on');
			bg[i + 1].classList.add('on');
			productsTexts.querySelector('.productsTitle').innerText =
				productsTitle_active;
			productsTexts.querySelector('.productsTxt').innerText =
				productsTxt_active;
			productsTexts.querySelector('.productsInfoTxt').innerText =
				productsInfoTxt_active;
		}
	});
}

// #social
// tab
$('.socialTab>.tabName>li>a').click(function (event) {
	event.preventDefault();
	$('.socialTab>.tabName>li>a').removeClass('on');
	$(this).addClass('on');
	$('.socialContent > .tabList').removeClass('on');
	let $tabContent = $(this).attr('href');
	$($tabContent).addClass('on');
});

// Initialize Swiper
var swiper = new Swiper('.socialSlide', {
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 20,
	loop: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
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
			<div class="before"><i class="fa-brands fa-youtube"></i></div>
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

// youtube_popup
let popDelay = parseFloat($('#pop').css('transitionDuration')) * 1000;
$(vidList).on('click', '.swiper-slide', function (e) {
	e.preventDefault();
	if (!e.target.closest('.swiper-slide')) return;
	if (!enable_event) return;
	enable_event = false;
	let vidId = e.currentTarget.children[1].getAttribute('href');
	$('#pop').addClass('on');
	$('#pop .popInfo').removeClass('youtube');
	$('#pop .popInfo').before(`<div class="imgWrap"></div>`);
	$(
		'#pop > .popWrap > .imgWrap'
	).prepend(`<iframe class="video" src='https://www.youtube.com/embed/${vidId}?rel=0&playsinline=1&autoplay=1' frameborder='0' width='100%' height='100%' allowfullscreen></iframe>
	`);
	$('#pop > .popTitle').text($(this).find('h3').text());
	$('#pop > .popWrap > .popInfo')
		.html($(this).find('.infotext').html())
		.addClass('youtube');
	$('#pop > .popDate').text($(this).find('.date').text());
});
// social_popup
$('.socialSlide .slideList .swiper-slide').click(function () {
	if (!enable_event) return;
	enable_event = false;
	$('#pop').removeClass('on');
	$('#pop').addClass('on');
	$('#pop .popInfo').before(`<div class="imgWrap"></div>`);
	let imgSrc = 'url(' + $(this).find('img').attr('src') + ')';
	$('#pop > .popWrap > .imgWrap').css('background-image', imgSrc);
	$('#pop > .popTitle').text($(this).find('h3').text());
	$('#pop > .popWrap > .popInfo').html($(this).find('.infotext').html());
	$('#pop > .popDate').text($(this).find('.date').text());
});
$('#pop > .closeBtn').click(function (e) {
	e.preventDefault();
	$('#pop').removeClass('on');
	$('#pop .popInfo').removeClass('youtube');
	setTimeout(function () {
		$('#pop .imgWrap').remove();
		enable_event = true;
	}, popDelay);
});

// esg
let = $esgArticle = $('#esg .inner .contentWrap article');
$esgArticle.each(function (el) {
	$(this).click(function () {
		if (!enable_event) return;
		enable_event = false;
		let isOn = $(this).hasClass('on');
		for (let el of $esgArticle) {
			$(el).removeClass('on');
		}
		if (!isOn) {
			$(this).addClass('on');
		}
		let esgDelay =
			parseFloat(
				$('#esg .inner .contentWrap article').css('transitionDuration')
			) * 1000;
		setTimeout(function () {
			enable_event = true;
		}, esgDelay);
	});
});

// footer
$('#familySite .selected').click(function () {
	if (!enable_event) return;
	enable_event = false;
	$('#familySite').toggleClass('on');
	let footerDelay =
		parseFloat($('#familySite .selected').css('transitionDuration')) * 1000;
	setTimeout(function () {
		enable_event = true;
	}, footerDelay);
});

// scroll
let $clickScroll = $('#clickScroll');
let $clickScroll_lis = $('#clickScroll .map ul li');
let $sections = $('section');
let exposurePercentage = 30;
$(window).scroll(function () {
	if ($(document).scrollTop() > offset.top) {
		$clickScroll.addClass('on');
	} else {
		$clickScroll.removeClass('on');
	}
	$($sections).each(function (index) {
		let $el = $(this);
		let rect = $el[0].getBoundingClientRect();
		let winHeight = window.innerHeight;
		let contentHeight = rect.bottom - rect.top;
		if (
			rect.top <= winHeight - (contentHeight * exposurePercentage) / 100 &&
			rect.bottom >= (contentHeight * exposurePercentage) / 100
		) {
			$el.addClass('scroll');
			$($clickScroll_lis).removeClass('on');
			$($clickScroll_lis[index]).addClass('on');
		}
	});
});

$($clickScroll_lis).click(function (event) {
	event.preventDefault();
	let index = $($clickScroll_lis).index(this);
	console.log(index);
	if (index >= 0 && index < $sections.length) {
		let $targetSection = $($sections[index]);
		let targetTop = $targetSection.offset().top;
		console.log($targetSection);
		console.log(targetTop);
		$('html, body').animate(
			{
				scrollTop: targetTop - 150,
			},
			500
		);
	}
});
