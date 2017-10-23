// $(document).ready(function() {
//     if (!!$.cookie('keep')) {
    $(function() {
        $.urlParam = function(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            return results[1] || 0;
        }
       
            var id = $.urlParam('id');
            var url = "http://localhost:3000/data/" + id;
            console.log(url);
            $.get(url, function(data, status) {
                console.log(data);
                $('.username').html(data.username);
                $('.account').attr('href', "account.html?id=" + data.id);
                $(".add-emp").attr('href', "add-emp.html?id=" + data.id);
                $(".dashboard").attr('href', "dashboard.html?id=" + data.id);
                $(".manage-emp").attr('href', "manage-emp.html?id=" + data.id);
                $(".my-profile").attr('href', "my-profile.html?id=" + data.id);
                $('.fname').html(data.firstname);
                $(".cancel").click(function() {
                    window.location.href = "dashboard.html?id=" + data.id;
                });
                $('#username').val(data.username);
                $('#email').val(data.email);
                $('#password').val(data.password);
                $('#fname').val(data.firstname);
                $('#lname').val(data.lastname);
                $('#tel').val(data.tel);
                $('#url').val(data.url);
                $("#save").click(function() {
                    var newuser = {};
                    //newuser.id = data.id;
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
                        success: function(result) {
                            console.log('Updated E-mail!');
                        }
                    });
                    $("#suc").show();
                    setTimeout(location.reload.bind(location), 900);
                });

                $("#delete").click(function () {
                    var deleteAcc = "http://localhost:3000/data/" + data.id;
                    $.ajax({
                        url: deleteAcc, // Pass empNo
                        type: "DELETE", // Use DELETE
                        // data: JSON.stringify(empNo), Commented these two.
                        // dataType: "json",
                        success: function(response) { setTimeout(window.location.href = "index.html", 1000) }
                      //  setTimeout(window.location.href = "home.html", 1000);
                    })
                $('#username').val(data.username);
                $('#password').val(data.password);
                $('#fname').val(data.firstname);
                $('#lname').val(data.lastname);
                $('#email').val(data.email);
                $('#tel').val(data.tel);
                $('#url').val(data.url);
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
                    newuser.url = $("#url").val();
                    newuser.Id = data.Id;
                    console.log(JSON.stringify(newuser));
                    var updateUrl = "http://localhost:3000/data/" + data.id;
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
    });
    // } else {
    //     console.log('no cookie');
    //    // window.location.href = "signin.html"
    // }

