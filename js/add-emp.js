$(document).ready(function() {
    if (!!$.cookie('keep')) {
        $.validator.setDefaults({
            submitHandler: function() {
                $("#err").show();
            }
        });
        $.validator.methods.equal = function(value, element, param) {
            return value == param;
        };
        $().ready(function() {
            var validator = $("#addForm").bind("invalid-form.validate", function() {
                $("#summary").html("Your form contains " + validator.numberOfInvalids() + " errors, see details below.");
            }).validate({
                debug: true,
                errorElement: "em",
                errorContainer: $("#warning, #summary"),
                errorPlacement: function(error, element) {
                    error.appendTo(element.parent("div").next("span"));
                },
                success: function(label) {
                    label.text("").addClass("success");
                    $("#err2").hide();
                },
                rules: {
                    fname: "required",
                    lname: "required",
                    email: {
                        required: true,
                        email: true
                    },
                    tel: {
                        required: true,
                        minlength: 10,
                        maxlength: 10,
                    }
                },
                messages: {
                    fname: "Please enter your firstname",
                    lname: "Please enter your lastname",
                    email: "Please enter a valid email address",
                    tel: "Please enter your telephone"
                },
                highlight: function(element) {
                    $(element).closest('.form-group').addClass('has-error');
                    $("#err2").show();
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

        function validatePhone(tel) {
            var a = document.getElementById(tel).value;
            var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
            if (filter.test(a)) {
                return true;
            } else {
                return false;
            }
        };

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
                $('.fname').html(data.FirstName);
                $('.lname').html(data.LastName);
                $('.email').html(data.Email);
                $('.tel').html(data.Tel);
                $('.username').html(data.UserName);
                $('.password').html(data.Password);
            });
        });
        $("#add").click(function() {
            var newuser = {};
            newuser.username = $("#username").val();
            newuser.password = $("#password").val();
            newuser.firstname = $("#fname").val();
            newuser.lastname = $("#lname").val();
            newuser.email = $("#email").val();
            newuser.tel = $("#tel").val();
            console.log(newuser);
            var url = "http://membershipwebapi977290.azurewebsites.net/api/Members";
            $.post(url, newuser, function(data, status) {
                console.log("Added " + data);
                $("#err").show();
                setTimeout(location.reload.bind(location), 900);
            });
        });
    } else {
        console.log('no cookie');
        window.location.href = "signin.html"
    }
});
