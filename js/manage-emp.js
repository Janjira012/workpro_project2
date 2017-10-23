$(document).ready(function() {
    if (!!$.cookie('keep')) {
        $.urlParam = function(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            return results[1] || 0;
        }
        var id = $.urlParam('id');
        var url = "http://localhost:3000/data" + id;
        console.log(url);
        $.get(url, function(data, status) {
            console.log("id" + data);
            $('.username').html(data.UserName);
            $('.account').attr('href', "account.html?id=" + data.Id);
            $(".add-emp").attr('href', "add-emp.html?id=" + data.Id);
            $(".dashboard").attr('href', "dashboard.html?id=" + data.Id);
            $(".manage-emp").attr('href', "manage-emp.html?id=" + data.Id);
            $(".my-profile").attr('href', "my-profile.html?id=" + data.Id);
            $.ajax({
                type: 'GET',
                url: 'hhttp://localhost:3000/data',
                mimeType: 'json',
                success: function(info) {
                    $.each(info, function(i, info) {
                        var body = "<tr>";
                        body += "<td>" + "emp-" + info.Id + "</td>";
                        body += "<td>" + info.FirstName + "</td>";
                        body += "<td>" + info.LastName + "</td>";
                        body += "<td>" + info.Email + "</td>";
                        body += "<td>" + info.Tel + "</td>";
                        body += "<td>" + info.url+ "</td>";
                        body += "<td>" + "<center>" +
                            "<a onClick='ShowModal(this)' info-id='" + info.Id +
                            "' href='view-emp.html?id=" + data.Id + "&uid=" + info.Id + "'><i class='fa fa-search'></i></a>&nbsp;&nbsp;" +
                            "<a onClick='ShowModal(this)' info-id='" + info.Id +
                            "' href='edit-emp.html?id=" + data.Id + "&uid=" + info.Id + "'><i class='fa fa-edit'></i></a>&nbsp;&nbsp;" +
                            "</center>" + "</td>";
                        body += "</tr>";
                        $("#summary-table tbody").append(body);
                    });
                    $("#summary-table").DataTable();
                },
                error: function() {
                    alert('Fail!');
                }
            });
        });

        function ShowModal(elem) {
            var dataId = $(elem).data("id");
            console.log(dataId);
        }
    } else {
        console.log('no cookie');
        window.location.href = "signin.html"
    }
});
