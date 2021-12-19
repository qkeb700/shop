$(function(){
  
  let navOffset = $('nav').offset().top;
  $(window).scroll(function(){
    if($(document).scrollTop() > navOffset){
      // $('nav').css({
      //   position: 'fixed',
      //   top: 0,
      //   width : "100%",
      //   height: "60px"
      // })
      // $('ul.gnb,.hamburger').css("margin-top", "20px");
      // $('nav').css("z-index", 555);
      $('nav').addClass('fixed');
    }else{
      // $('nav').css('position', 'static');
      $('nav').removeClass('fixed');
    }
  })

  $('.hamburger-mobile').click(function(event){
    // $('.navbar-nav.gnb').animate({
    //   left: 0,
    //   opacity: 1
    // })
    
    $('.navbar-nav.gnb').toggleClass('view');
    $(this).toggleClass('close');

    $('nav').toggleClass('nonfix');

    $(document).on("click", function(e){
      if($('.navbar-nav.gnb').is(e.target)){
        $('.navbar-nav.gnb').css({visibility:"hidden", opacity:0});
      }
    })
  });



  //검색창출력
  $('.search').click(function(e){
    //a링크의 권환 상실 링크가 되지않음.
    e.preventDefault();
    $(this).next('.searchbox').fadeToggle();
  });

  //서브페이지 출력
  $('.gnb>li').hover(function(){
    $(this).find('.lnb').fadeToggle();
  });
  let ct = 0;
  let imgCount = $('.imgbox').length;
  let li = "";
  for(let i = 0; i < imgCount; i++) {
    if(i == ct) {
      li += "<li class='active'></li>";
    } else {
      li += "<li></li>";
    }
  }
  $('.page').append(li);

  setInterval(fadeInOut, 3000);
  function fadeInOut() {
    ct++;
    if(ct == imgCount) {
      ct = 0;
    }
    for(let i = 0; i <imgCount; i++) {
      if(i == ct) {
        $('.page>li').removeClass('active');
        $('.page>li').eq(i).addClass('active');
      }
    }
    $('.slider .imgbox:eq(0)').fadeOut(500).next().fadeIn(500).end().appendTo('.slider');
  }

  $('.w-category a').click(function(e){
    e.preventDefault();
    let lft;
    let hf = $(this).data('link');
    let newtry = document.getElementById("try");
    console.log(newtry.dataset.link);
    $('.w-category').find('a').removeClass('active');
    $(this).addClass('active');
    switch(hf) {
      case 'best':
        lft = '20px';
      break;
      case 'top':
        lft = '-1120px';
      break;
      case 'outer':
        lft = '-2260px';
      break;
      case 'bottom':
        lft = '-3400px';
      break;
      case 'dress':
        lft = '-4540px';
      break;
    }
    
    $('.container-in').animate({
      left: lft
    }, 500);
  });

  // hover list-8 구성
  $('.list-8>a').on({
    mouseenter: function(){
      let txt = $(this).data("text");
      let txtStr = new Array();
      if(txt) {
        txtStr = txt.split("||");
      } else {
        txtStr[0] = "제목미정";
        txtStr[1] = "가격준비중";
      }
      let str = '<div class="over">' +
                '<h4 class="text-center">' + txtStr[0] +'</h4>' +
                '<p class="text-center">' + txtStr[1] + '</p>' +
                '</div>';
      $(this).append(str);
    },
    mouseleave: function(){
      $(this).find('.over').remove();
    }
  });

  // 목록 보기
  $('.list').click(function(){
    // $('.product-list').css('flex-direction', 'column');
    $('.product-list').children().removeClass().addClass("col-12 my-3 card-list");
    
  });
  $('.grid-5').click(function(){
    $('.product-list').css('flex-direction', 'row');
    $('.product-list').children().removeClass().addClass("col-25 my-3");
  });
  $('.grid-4').click(function(){
    $('.product-list').css('flex-direction', 'row');
    $('.product-list').children().removeClass().addClass("col-3 my-3");
  });
});


function comma(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
} 

// function coma(num){
//   let len, point, str;
//   num = num+"";
//   point = num.length % 3;
//   len = num.length;
//   str = num.substring(0, point);
//   while(point < len){
//     if(str != "") str += ",";
//     str += num.substring(point,point+3);
//     point += 3;
//   }
//   return str;
// }

// url 에서 parameter 추출

function getParam(sname) {

  var params = location.search.substr(location.search.indexOf("?") + 1);

  var sval = "";

  params = params.split("&");

  for (var i = 0; i < params.length; i++) {

      temp = params[i].split("=");

      if ([temp[0]] == sname) { sval = temp[1]; }

  }

  return sval;

}