$(document).ready(function(){
  // if 'create account' clicked
  $('#goSignup').click(function(){
    // make #signup checked
    $('#signup').click();
  });

  $('#postSignup').click(function(){
    const user = {
      email: $('#signupID').val(),
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

  $('#signout').click(function(){
    $.ajax({
      type: 'POST',
      url: '/signout',
      success: function(results) {
        alert('logouted');
        location.href= '/';
      },
      error: function(xhr, status, err){
        console.log(xhr);
      }
    });
  });
});