$(function(){
// 상품가격
let price = $('#price').val();
let opt1 = 0; // 컬러
let opt2 = 0; // 사이즈
let qty = 1; // 수량
let opt1v;
let opt2v;
let totalPrice = parseInt(price);

$.ajax({
  url: "json/option.json",
  dataType: "json",
  success: function(data){
    let json = data.color;
    let radioInput = '';
    let i = 0;
    let checked ="";
    for (const key in json) {
      if(i == 0){
        checked="checked";
        $('#price-color').val(json[key]);
      }
      radioInput += '<input type="radio" name="color" class="color"'+
                    'id="'+key+'" data-opt1="'+json[key]+'" value="'+key+'" '+checked+'>'+
                    '<label for="'+key+'"></label>';
      i++;
    }
      
    let json2 = data.size;
    let option = '<option value="">사이즈를 선택하세요</option>';
    let viewSize = {
      s : "small",
      m : "medium",
      l : "large",
      xl : "xlarge"
    }
    for(const key in json2){
      option += '<option value="'+key+'"' +'data-opt2="'+json2[key]+'">' + viewSize[key]+ '</option>';
    }

    $('.colorbox').html(radioInput);
    $('#size').html(option);
  },
  error: function(xhr, status, err){
    console.log(this.props.url, status, err.toString());
  }
})



/********** VIEW ************/
$('.view-simg-list img').click(function(){
  let img = $(this).attr('src');
  $('.view-simg-list').find('img').removeClass('act');
  $(this).addClass('act');
  $('.view-bimg').children().attr('src', img);

});
let cprice = comma(price);
$('.price').find('span').text(cprice);

// 옵션정보 기록
$(document).on('change', "input[name='color']", function(){
    addOpt();
});


$(document).on('change', "#size", function(){
    addOpt();
});


// 수량점검
$('a.qty').click(function(e){
  e.preventDefault();
  let qty = $('input[name="quantity"]').val();
  let addqty = $(this).data('q');
  let totalprice = $('#total').val();
  qty = Number(qty) + Number(addqty);
  if(qty < 1){
    alert("최소단위는 1입니다.");
    return false;
  }
  let totalPrice = Number(qty)*Number(totalprice);
  $('input[name="quantity"]').val(qty);
  addOpt();
});

// 옵션 추가 삭제 함수
function addOpt(){
  opt1v = $('.color').find(':checked').val();
  opt1 = parseInt($('.color').find(':checked').data('opt1'));
  opt2v = $('#size').val();
  if(opt2v){
    opt2 = parseInt($('#size').find(':selected').data('opt2'));
  }
  qty = parseInt($("input[name='quantity']").val());
  totalPrice = (opt1 + opt2 + parseInt(price))* qty;

  // opt1 출력
  $('.result-color').html("컬러 : " + opt1v);
  $('.color').children('span').html("컬러 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + opt1v);
  // opt2 출력
  $('.result-size').html("사이즈 : " + opt2v);
  $('#price-color').val(opt1);
  $('#price-size').val(opt2);
  $('#total').val(totalPrice);
  $('.total').html(comma(totalPrice) + "원");
}
// 전송버튼 클릭
// 1. wish
$('.wish').click(function(){
  $('#viewForm').attr('action','wish.html').submit();
});
$('.cart').click(function(){
  if($('#price-size').val()==""){
    alert("옵션을 선택하세요.");
    return false;
  }
  $('#viewForm').attr('action', 'cart.html').submit();
});
$('.order').click(function(){
  if($('#price-size').val()==""){
    alert("옵션을 선택하세요.");
    return false;
  }
  $('#viewForm').attr('action', 'order.html').submit();
});
})