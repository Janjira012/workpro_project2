$(function () {
    // if (!!$.cookie('keep')) {
    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }

    var ids = $.urlParam('id');
    var url = "http://localhost:3000/data/" + ids;
    console.log(url);
    $.get(url, function (data, status) {
        console.log(data);
        $('.username').html(data.username);
        $('.account').attr('href', "account.html?id=" + data.id);
        $(".add-emp").attr('href', "add-emp.html?id=" + data.id);
        $(".dashboard").attr('href', "dashboard.html?id=" + data.id);
        $(".manage-emp").attr('href', "manage-emp.html?id=" + data.id);
        $(".my-profile").attr('href', "my-profile.html?id=" + data.id);
        $('.fname').html(data.firstname);
        $('#id').val("emp-" + data.id);
        $('#fname').val(data.firstname);
        $('#lname').val(data.lastname);
        $('#email').val(data.email);
        $('#tel').val(data.tel);
        $('#url').val(data.url);
        $('#username').val(data.username);
        $('#password').val(data.password);
        $(".cancel").click(function () {
            window.location.href = "dashboard.html?id=" + data.id;
        });
        $("#save").click(function () {
            var newuser = {};
           // newuser.id = data.id;
            newuser.username = $("#username").val();
            newuser.password = $("#password").val();
            newuser.firstname = $("#fname").val();
            newuser.lastname = $("#lname").val();
            newuser.email = $("#email").val();
            newuser.tel = $("#tel").val();
            newuser.url = $("#url").val();
            console.log(JSON.stringify(newuser));
            var updateUrl = "http://localhost:3000/data/" + data.id;
            $.ajax({
                url: updateUrl,
                type: 'PUT',
                data: newuser,
                success: function (result) {
                    console.log('Updated!');
                }
            });
            $("#err").show();
            setTimeout(location.reload.bind(location), 900);
        });
    });

    // } else {
    //     console.log('no cookie');
    //     window.location.href = "signin.html"
});
