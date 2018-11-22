$(document).ready(function(){
  $('#signup').click(function(){
    let space = +($('.login').css('margin-right').split('px')[0]) + 750;
    $('.login').css('margin-left', -space + 'px');
  });

  $('#goSignup').click(function(){
    $('#signup').click();
  });

  $('#postSignup').click(function(){
    const user = {
      name: $('#signupID').val(),
      email: $('#signupEmail').val(),
      password: $('#signupPW').val(),
    };
    $.ajax({
      type: 'POST',
      url: '/user',
      contentType: 'application/json',
      data: JSON.stringify({user:user}),
      success: function(results) {
        console.log(results);
      },
      error: function(xhr, status, err){
        console.log(xhr);
      },
    });
  });
  $('#postLogin').click(function(){
    const user = {
      email: $('#loginID').val(),
      password: $('#loginPW').val()
    };
    $.ajax({
      type: 'POST',
      url: '/signin',
      contentType: 'application/json',
      data: JSON.stringify(user),
      success: function(results) {
        console.log(results);
      },
      error: function(xhr, status, err){
        console.log(xhr);
      }
    });
  });
});