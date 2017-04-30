$(document).ready(function() {
    if (!!$.cookie('keep')) {
        $.urlParam = function(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            return results[1] || 0;
        }
        $(function() {
            var id = $.urlParam('id');
            var url = "http://membershipwebapi977290.azurewebsites.net/api/Members/" + id;
            console.log(url);
            $.get(url, function(inf, status) {
                console.log(inf);
                $('.account').attr('href', "account.html?id=" + inf.Id);
                $(".my-profile").attr('href', "my-profile.html?id=" + inf.Id);
                $(".manage-emp").attr('href', "manage-emp.html?id=" + inf.Id);
                $('.username').html(inf.UserName);
                $(".add-emp").attr('href', "add-emp.html?id=" + inf.Id);
                $(".dashboard").attr('href', "dashboard.html?id=" + inf.Id);
            });
        });
        $.ajax({
            type: 'GET',
            url: 'http://membershipwebapi977290.azurewebsites.net/api/Members/',
            mimeType: 'json',
            success: function(inf) {
                var ArrayContent = inf.length;
                document.getElementById("conunt").innerHTML = ArrayContent;
            },
        });
    } else {
        console.log('no cookie');
        window.location.href = "signin.html"
    }
});
