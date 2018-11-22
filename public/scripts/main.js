$(document).ready(function(){
  $('#signup').click(function(){
    let space = +($('.login').css('margin-right').split('px')[0]) + 750;
    $('.login').css('margin-left', -space + 'px');
  });

  $('#goSignup').click(function(){
    $('#signup').click();
  });
});