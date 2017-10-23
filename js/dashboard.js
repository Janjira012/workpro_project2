$(document).ready(function() {
    //if (!!$.cookie('keep')) {
        $.urlParam = function(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            return results[1] || 0;
        }
        $(function() {
            var id = $.urlParam('id');
            var url = "http://localhost:3000/data/" + id;
            console.log(url);  
            $.get(url, function(data, status) {
                console.log(data);
                console.log(status)

                $('.account').attr('href', "account.html?id=" + data.id);
                $(".my-profile").attr('href', "my-profile.html?id=" + data.id);
                $(".manage-emp").attr('href', "manage-emp.html?id=" + data.id);
                $('.username').html(data.username);
                $(".add-emp").attr('href', "add-emp.html?id=" + data.id);
                $(".dashboard").attr('href', "dashboard.html?id=" + data.id);
            });
        });
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/data',
            mimeType: 'json',
            success: function(inf) {
                var ArrayContent = inf.length;
                document.getElementById("conunt").innerHTML = ArrayContent;
            },
        });
    // } else {
    //     console.log('no cookie');
    //     //window.location.href = "signin.html"
    // }
});
