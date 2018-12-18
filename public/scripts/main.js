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
        alert('회원가입 완료');
        $('#login').click();
        $('#signupID').val('');
        $('#signupPW').val('');
        $('#signupPWRepeat').val('');
      },
      error: function(xhr, status, err){
        alert('회원가입 실패');
        $('#signupID').val('');
        $('#signupPW').val('');
        $('#signupPWRepeat').val('');
        console.log(xhr);
      },
    });
  });
  // $('#postLogin').click(function(){
  //   const user = {
  //     email: $('#loginID').val(),
  //     password: $('#loginPW').val()
  //   };
  //   $.ajax({
  //     type: 'POST',
  //     url: '/signin',
  //     contentType: 'application/json',
  //     data: JSON.stringify(user),
  //     success: function(results) {
  //       console.log(results);
  //     },
  //     error: function(xhr, status, err){
  //       console.log(xhr);
  //     }
  //   });
  // });

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

  $('#createFile').click(function(){
    const file = {
      name: $('#newFileName').val()
    }
    $.ajax({
      type: 'POST',
      url: '/file',
      contentType: 'application/json',
      data: JSON.stringify({file:file}),
      success: function(results) {
        $('#newFileName').val('');
        addFileHTML($('.private'),file);
      },
      error: function(xhr, status, err){
        console.log(xhr);
      }
    });
  });
});

const addFileHTML = function(p,file){
  p.append(`<a href='/texteditor/${file.id}' class='doc' draggable='true' ondragstart='drag(event)'>
              <div class='doc-img'>
                <div class='doc-icn'></div>
              </div>
              <div class='doc-title'>${file.name}</div>
            </a>`)
}

const allowDrop = function(ev){
  ev.preventDefault();
}

const drag = function(ev){
  ev.target.id = 'tempID'
  ev.dataTransfer.setData("text", ev.target.id);
}

const drop = function(ev){
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  let ele = document.getElementById(data)
  let id = $(ele).attr('href').split('/')[2];
  let file = {};
  ev.target.appendChild(ele);
  if($(ev.target).attr('class') == 'folder private'){
    // private foler로 이동
    file = {
      opened: false
    }
  }else{
    // public folder로 이동
    file = {
      opened: true
    }
  }
  $.ajax({
    type: 'PUT',
    url: `/file/${id}`,
    contentType: 'application/json',
    data: JSON.stringify({file:file}),
    success: function(results){
      console.log(results);
    },
    error: function(xhr, status, err){
      console.log(xhr);
    }
  })
  ele.removeAttribute('id');
}