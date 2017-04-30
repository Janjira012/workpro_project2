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
            $.get(url, function(data, status) {
                console.log(data);
                $('.username').html(data.UserName);
                $('.account').attr('href', "account.html?id=" + data.Id);
                $(".add-emp").attr('href', "add-emp.html?id=" + data.Id);
                $(".dashboard").attr('href', "dashboard.html?id=" + data.Id);
                $(".manage-emp").attr('href', "manage-emp.html?id=" + data.Id);
                $(".my-profile").attr('href', "my-profile.html?id=" + data.Id);
                $('.fname').html(data.FirstName);
                $(".cancel").click(function() {
                    window.location.href = "dashboard.html?id=" + data.Id;
                });
                $('#username').val(data.UserName);
                $('#email').val(data.Email);
                $('#password').val(data.Password);
                $('#fname').val(data.FirstName);
                $('#lname').val(data.LastName);
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
                            console.log('Updated E-mail!');
                        }
                    });
                    $("#suc").show();
                    setTimeout(location.reload.bind(location), 900);
                });
                $('#username').val(data.UserName);
                $('#password').val(data.Password);
                $('#fname').val(data.FirstName);
                $('#lname').val(data.LastName);
                $('#email').val(data.Email);
                $('#tel').val(data.Tel);
                $("#edit").click(function() {
                    var newuser = {};
                    newuser.oldpassword = $("#oldpassword").val();
                    newuser.password = $("#npassword").val();
                    newuser.cpassword = $("#cpassword").val();
                    newuser.username = $("#username").val();
                    newuser.firstname = $("#fname").val();
                    newuser.lastname = $("#lname").val();
                    newuser.tel = $("#tel").val();
                    newuser.email = $("#email").val();
                    newuser.Id = data.Id;
                    console.log(JSON.stringify(newuser));
                    var updateUrl = "http://membershipwebapi977290.azurewebsites.net/api/Members/" + data.Id;
                    $.ajax({
                        url: updateUrl,
                        type: 'PUT',
                        data: newuser,
                        success: function(result) {
                            console.log('Updated Password!');
                        }
                    });
                });
            });
        });

        $.validator.setDefaults({
            submitHandler: function() {
                $("#err2").show();
                setTimeout(location.reload.bind(location), 900);
            }
        });
        $.validator.methods.equal = function(value, element, param) {
            return value == param;
        };
        $().ready(function() {
            var validator = $("#change").bind("invalid-form.validate", function() {
                $("#summary4").html("Your form contains " + validator.numberOfInvalids() + " errors, see details below.");
            }).validate({
                debug: true,
                errorElement: "em",
                errorContainer: $("#warning, #summary4"),
                errorPlacement: function(error, element) {
                    error.appendTo(element.parent("div").next("span"));
                },
                success: function(label) {
                    label.text("").addClass("success");
                    $("#err4").hide();
                },
                rules: {
                    oldpassword: {
                        required: true,
                        minlength: 5
                    },
                    npassword: {
                        required: true,
                        minlength: 5
                    },
                    cpassword: {
                        required: true,
                        minlength: 5,
                        equalTo: "#npassword"
                    }
                },
                messages: {
                    oldpassword: {
                        required: "Please provide a oldpassword",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    npassword: {
                        required: "Please provide a new password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    cpassword: {
                        required: "Please provide a confirm password",
                        minlength: "Your password must be at least 5 characters long",
                        equalTo: "Please enter the same password as above"
                    }
                },
                highlight: function(element) {
                    $(element).closest('.form-group').addClass('has-error');
                    $("#err4").show();
                },
                unhighlight: function(element) {
                    $(element).closest('.form-group').removeClass('has-error');
                },
                errorElement: 'span',
                errorClass: 'help-block',
                errorPlacement: function(error, element) {
                    if (element.parent('.input-group').length) {
                        error.insertAfter(element.parent());
                    } else {
                        error.insertAfter(element);
                    }
                }
            });
        });
    } else {
        console.log('no cookie');
        window.location.href = "signin.html"
    }
});
