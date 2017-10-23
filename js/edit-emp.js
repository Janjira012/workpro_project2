$(document).ready(function() {
    if (!!$.cookie('keep')) {
        function getContain() {
            $.urlParam = function(name) {
                var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
                return results[1] || 0;
            }
            $(function() {
                var uid = $.urlParam('uid');
                var url = "http://localhost:3000/data" + uid;
                console.log(url);
                $.get(url, function(data, status) {
                    console.log(data);
                    $('#id').val("emp-" + data[0].id);
                    $('#username').val(data[0].username);
                    $('#password').val(data[0].password);
                    $('#fname').val(data[0].firstname);
                    $('#lname').val(data[0].lastname);
                    $('#email').val(data[0].email);
                    $('#tel').val(data[0].tel);
                    $('#url').val(data[0].url);
                    $("#save").click(function() {
                        var newuser = {};
                        newuser.id = data.id;
                        newuser.username = $("#username").val();
                        newuser.password = $("#password").val();
                        newuser.firstname = $("#fname").val();
                        newuser.lastname = $("#lname").val();
                        newuser.email = $("#email").val();
                        newuser.tel = $("#tel").val();
                        newuser.url = $("#url").val();
                        console.log(JSON.stringify(newuser));
                        var updateUrl = "http://localhost:3000/data" + data.id;
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
                var url = "http://localhost:3000/data" + id;
                console.log(url);
                $.get(url, function(data, status) {
                    console.log(data);
                    $('.username').html(data.username);
                    $('.account').attr('href', "account.html?id=" + data[0].id);
                    $(".add-emp").attr('href', "add-emp.html?id=" + data[0].id);
                    $(".dashboard").attr('href', "dashboard.html?id=" + data[0].id);
                    $(".manage-emp").attr('href', "manage-emp.html?id=" + data[0].id);
                    $(".my-profile").attr('href', "my-profile.html?id=" + data[0].id);
                    $(".cancel").click(function() {
                        window.location.href = "manage-emp.html?id=" + data[0].id;
                    });
                });
            });
        }
        document.getElementsByClassName("contain").innerHTML = getUser();
    } else {
        console.log('no cookie');
        //window.location.href = "signin.html"
    }
});
