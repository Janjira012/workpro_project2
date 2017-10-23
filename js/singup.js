$.validator.setDefaults({
    submitHandler: function() {
        $("#suc").show();
        setTimeout(window.location.href = "signin.html", 1000);
    }
});
$.validator.methods.equal = function(value, element, param) {
    return value == param;
};
$().ready(function() {
    var validator = $("#signupForm").bind("invalid-form.validate", function() {
        $("#summary").html("Your form contains " + validator.numberOfInvalids() + " errors, see details below.");
    }).validate({
        debug: true,
        errorElement: "em",
        errorContainer: $("#warning, #summary"),
        errorPlacement: function(error, element) {
            error.appendTo(element.parent("div").next("span"));
        },
        success: function(label) {
            //label.text("").addClass("success");
            $("#err").hide();
        },
        rules: {
            fname: "required",
            lname: "required",
            username: {
                required: true,
                minlength: 2
            },
            password: {
                required: true,
                minlength: 5
            },
            con_password: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            },
            tel: {
                required: true,
                minlength: 10,
                maxlength: 10,
            },
            url: {
                required: true,
                email: true
            },
        },
        messages: {
            fname: "Please enter your firstname",
            lname: "Please enter your lastname",
            username: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 2 characters"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            con_password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long",
                equalTo: "Please enter the same password as above"
            },
            email: "Please enter a valid email address",
            tel: "Please enter your telephone",
            url: "Please enter a valid URL address"
            
        },

        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
            $("#err").show();
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

$("#signup").click(function() {
    var newuser = {};
    newuser.username = $("#username").val();
    newuser.password = $("#password").val();
    newuser.con_password = $("#con_password").val();
    newuser.firstname = $("#fname").val();
    newuser.lastname = $("#lname").val();
    newuser.email = $("#email").val();
    newuser.tel = $("#tel").val();
    newuser.url = $("#url").val();
    console.log(newuser);
    var url = "http://localhost:3000/data";
    $.post(url, newuser, function(data, status) {
        console.log("Inserted " + data);
    });
});
