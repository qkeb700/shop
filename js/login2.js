function checkForm(){
  let form = document.loginForm;
  if(form.username.value == "") {
    alert("아이디를 입력하세요.");
    form.username.focus();
    return false;
  }
  if(form.userpass.value == "") {
    alert("비밀번호를 입력하세요.");
    focus.userpass.focus();
    return false;
  }
}