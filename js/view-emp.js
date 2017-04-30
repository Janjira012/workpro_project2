$(document).ready(function() {
    if (!!$.cookie('keep')) {
        function getContain() {
            $.urlParam = function(name) {
                var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
                return results[1] || 0;
            }
            $(function() {
                var uid = $.urlParam('uid');
                var url = "http://membershipwebapi977290.azurewebsites.net/api/Members/" + uid;
                console.log(url);
                $.get(url, function(data, status) {
                    console.log(data);
                    $('#id').val("emp-" + data.Id);
                    $('#fname').val(data.FirstName);
                    $('#lname').val(data.LastName);
                    $('#email').val(data.Email);
                    $('#tel').val(data.Tel);
                });
            });
        }
        document.getElementsByClassName("contain").innerHTML = getContain();
        function getUser() {
      $.urlParam = function(name) {
          var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
          return results[1] || 0;
      }
      $(function() {
          var id = $.urlParam('id');
          var url = "http://membershipwebapi977290.azurewebsites.net/api/Members/" + id;
          console.log(url);
          $.get(url, function(data, status) {
              console.log(data);
              $('.username').html(data.UserName);
              $('.account').attr('href', "account.html?id=" + data.Id);
              $(".add-emp").attr('href', "add-emp.html?id=" + data.Id);
              $(".dashboard").attr('href', "dashboard.html?id=" + data.Id);
              $(".manage-emp").attr('href', "manage-emp.html?id=" + data.Id);
              $(".my-profile").attr('href', "my-profile.html?id=" + data.Id);
              $('#id').val("emp-" + data.Id);
              $('#fname').val(data.FirstName);
              $('#lname').val(data.LastName);
              $('#email').val(data.Email);
              $('#tel').val(data.Tel);
              $(".back").click(function() {
                  window.location.href = "manage-emp.html?id=" + data.Id;
              });
          });
      });
  }
  document.getElementsByClassName("contain").innerHTML = getUser();
    } else {
        console.log('no cookie');
        window.location.href = "signin.html"
    }
});
