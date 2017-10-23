// $(document).ready(function() {
//     if (!!$.cookie('keep')) {
    $(function() {
        function getContain() {
            
            $.urlParam = function(name) {
                var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
                return results[1] || 0;
            }
            
                var uid = $.urlParam('uid');
                var url = "http://localhost:3000/data/" + uid;
                console.log(url);
                $.get(url, function(data, status) {
                    console.log(data);
                    $('#id').val("emp-" + data.id);
                    $('#fname').val(data.firstname);
                    $('#lname').val(data.lastname);
                    $('#email').val(data.email);
                    $('#tel').val(data.tel);
                    $('#url').val(data.url);
                });
          
      
        document.getElementsByClassName("contain").innerHTML = getContain();
        function getUser() {
      $.urlParam = function(name) {
          var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
          return results[1] || 0;
      }
      $(function() {
          var id = $.urlParam('id');
          var url = "http://localhost:3000/data + id";
          console.log(url);
          $.get(url, function(data, status) {
              console.log(data);
              $('.username').html(data.username);
              $('.account').attr('href', "account.html?id=" + data.id);
              $(".add-emp").attr('href', "add-emp.html?id=" + data.id);
              $(".dashboard").attr('href', "dashboard.html?id=" + data.id);
              $(".manage-emp").attr('href', "manage-emp.html?id=" + data.id);
              $(".my-profile").attr('href', "my-profile.html?id=" + data.id);
              $('#id').val("emp-" + data.id);
              $('#fname').val(data.firstname);
              $('#lname').val(data.lastname);
              $('#email').val(data.email);
              $('#tel').val(data.tel);
              $('#url').val(data.url);
              $(".back").click(function() {
                  window.location.href = "manage-emp.html?id=" + data.id;
              });
          });
      });
  }
  document.getElementsByClassName("contain").innerHTML = getUser();
    // } else {
    //     console.log('no cookie');
    //     window.location.href = "signin.html"
    // }
}
    });
