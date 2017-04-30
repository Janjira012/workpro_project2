$.validator.setDefaults({
    submitHandler: function() {}
});
$.validator.methods.equal = function(value, element, param) {
    return value == param;
};
$().ready(function() {
    var validator = $("#form").bind("invalid-form.validate", function() {
        $("#summary").html("Your form contains " + validator.numberOfInvalids() + " errors, see details below.");
    }).validate({
        debug: true,
        errorElement: "em",
        errorContainer: $("#warning, #summary"),
        errorPlacement: function(error, element) {
            error.appendTo(element.parent("div").next("span"));
            $("#err").show();
        },
        success: function(label) {
            label.text("").addClass("success");
            $("#err").hide();
        },
        rules: {
            username: {
                required: true,
                minlength: 2
            },
            password: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            username: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 2 characters"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            }
        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
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
$("#signin").click(function() {
    var url = "http://membershipwebapi977290.azurewebsites.net/api/Members/signin?";
    url += "username=" + $("#username").val();
    url += "&password=" + $("#password").val();
    console.log(url);
    $.get(url, function(data, status) {
        console.log(data);
        if (data.Status == true) {
            $("#suc").show();
            setTimeout(window.location.href = "dashboard.html?id=" + data.CurrentUser.Id, 30000);
        } else {
            $("#err").show();
        }
    });
});
