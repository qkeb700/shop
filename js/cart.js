$(function(){
  // $.ajax({
  //   url:"json/cart.json",
  //   dataType: "json",
  //   success: function(rs){
  //     console.log(rs);
  //   }
  // })

  let data = {};
  $.get("json/cart.json", data, function(result){
    let rs = result.cart;
    let cartlist='';
    let totalmoney = 0;
    let alltotalmoney = 0;
    let point;
    let n = rs.length;

    for(let i =0; i<rs.length; i++){
      totalmoney = rs[i].dcmoney*rs[i].quantity;
      alltotalmoney += totalmoney
      point = rs[i].point*rs[i].quantity;
      cartlist += '<tr>'+ 
                  '<td class="text-center">'+
                  '<input type="checkbox" name="pnum" value="'+rs[i].prd+'" checked>'+
                  '</td>'+
                  '<td class="d-flex">'+
                  '<div class="imgbox">' +
                  '<img src="'+rs[i].img+'" alt="'+rs[i].title+'">' +
                  '</div>' +
                  '<div class="prdbox">' +
                  '<h1>'+rs[i].title+'</h1>' +
                  '<p>색상: '+rs[i].color+', 사이즈: '+rs[i].size+', 수량: '+rs[i].quantity+', '+rs[i].description+'</p>' +
                  '<button type="button" id="btn-update" class="btn btn-dark btnFix">옵션수정</button>' +
                  '<div class="option-update">' +
                    '<div class="option-header">' +
                      '<h4>옵션변경</h4>' +
                      '<a href="#" class="option-close">X</a>' +
                    '</div>' +
                    '<div class="option-body">' +
                      '<p><strong>상품정보 1</strong></p>' +
                      '<p>상품 내용</p>' +
                      '<hr>' +
                      '<h4>상품옵션</h4>' +
                      '<form action="" method="POST">' +
                        '<div class="form-group">' +
                          '<div class="row">' +
                            '<div class="col-3">' +
                              'COLOR' +
                            '</div>' +
                            '<div class="col-9">' +
                              '<select name="color" class="form-control" id="">' +
                                '<option value="">검정색</option>' +
                              '</select>' +
                            '</div>' +
                          '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                          '<div class="row">' +
                            '<div class="col-3">' +
                              'SIZE' +
                            '</div>' +
                            '<div class="col-9">' +
                              '<select name="color" class="form-control" id="">' +
                                '<option value="">검정색</option>' +
                              '</select>' +
                            '</div>' +
                          '</div>' +
                        '</div>' +
                        '<div class="btn-group text-center py-4">' +
                          '<button class="btn btn-secondary">변경</button>' +
                        '</div>' +
                      '</form>' +
                    '</div>' +
                  '</div>' +
                  '</div>' +
                  '</td>' +
                  '<td class="text-center">' +
                  '<del>'+comma(rs[i].ormoney)+'</del><br>' +
                  ''+comma(rs[i].dcmoney)+'' +
                  '</td>' +
                  '<td>' +
                  '<div class="btn-group">' +
                  '<a href="#" class="minus">-</a>' +
                  '<span class="qt">'+rs[i].quantity+'</span>' +
                  '<a href="#" class="plus">+</a>' +
                  '<input type="hidden" name="qt" id="qt" value="'+rs[i].quantity+'"><br>' +
                  '</div>' +
                  '</td>' +
                  '<td>' +
                  comma(totalmoney)+
                  '</td>' +
                  '<td>' +
                  comma(point)+
                  '</td>' +
                  '<td>' +
                  '4,000원' +
                  '</td>' +
                  '<td>' +
                  '<button type="button" class="btn btn-outline-danger">삭제</button>' +
                  '</td>' +
                  '</tr> \n\n';
                  

    }
    let totalMoney = comma(alltotalmoney) + "원 + 배송료 : 4000 = " + comma(alltotalmoney+4000);
    $('.total-money').html(totalMoney);
    $('#cart-body').html(cartlist);
    
  });
  // live로 생성된 요소를 클릭할 때는 문서가 써진 후에 클릭이 발생할 수 있도록
  // $(아이디).click()이 아니라 $(document).on('click', '아이디')로 만들어야한다.
  $(document).on("click", "#btn-update", function(){
    $(this).next().show();
  })
  $(document).on("click", ".option-close", function(){
    $('.option-update').hide();
  })
});