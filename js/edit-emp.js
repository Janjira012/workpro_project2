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
                    $('#username').val(data.UserName);
                    $('#password').val(data.Password);
                    $('#fname').val(data.FirstName);
                    $('#lname').val(data.LastName);
                    $('#email').val(data.Email);
                    $('#tel').val(data.Tel);
                    $("#save").click(function() {
                        var newuser = {};
                        newuser.Id = data.Id;
                        newuser.username = $("#username").val();
                        newuser.password = $("#password").val();
                        newuser.firstname = $("#fname").val();
                        newuser.lastname = $("#lname").val();
                        newuser.email = $("#email").val();
                        newuser.tel = $("#tel").val();
                        console.log(JSON.stringify(newuser));
                        var updateUrl = "http://membershipwebapi977290.azurewebsites.net/api/Members/" + data.Id;
                        $.ajax({
                            url: updateUrl,
                            type: 'PUT',
                            data: newuser,
                            success: function(result) {
                                console.log('Updated!');
                            }
                        });
                        $("#err").show();
                        setTimeout(location.reload.bind(location), 900);
                    });
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
                    $(".cancel").click(function() {
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
