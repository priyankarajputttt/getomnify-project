/**focus on input box */

$(document).ready(() => {
    $("#signup_modal").on('shown.bs.modal', () => {
        $(".f-name").focus();
    });
    $("#login_modal").on('shown.bs.modal', () => {
        $(".l-email").focus();
    });
});

$(document).ready(() => {
    $(".signup_form").submit((e) => {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/registration",
            data: new FormData(e.target),
            processData: false,
            contentType: false,
            beforeSend: () => {
                $(".signup_form").css({
                    pointerEvents: 'none',
                    cursor: 'not-allowed'
                });
                $(".signup-btn").addClass('d-none');
                $('.signup-process-btn').removeClass('d-none');
            },
            success: (response) => {
                if (response.status) {
                    $("#signup_modal").modal('hide');
                    $("#login_modal").modal('show');
                }
            },
            error: (response) => {
                $(".signup_form").css({
                    pointerEvents: '',
                    cursor: ''
                });
                $(".signup-btn").removeClass('d-none');
                $('.signup-process-btn').addClass('d-none');
                if (response.responseJSON.message === 'Duplicate Email Id') {
                    $(".s-email").addClass("border border-danger");
                    $(".s-email-error").html('Email is already exists');
                    $(".s-email").click(() => {
                        $(".s-email").removeClass("border border-danger");
                        $(".s-email-error").html('');
                    });
                }
            }
        });
    });
});

/**
 * login
 */

$(document).ready(() => {
    $(".login_form").submit((e) => {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/login",
            data: new FormData(e.target),
            processData: false,
            contentType: false,
            beforeSend: () => {
                $(".signup_form").css({
                    pointerEvents: 'none',
                    cursor: 'not-allowed'
                });
                $(".login-btn").addClass('d-none');
                $('.login-process-btn').removeClass('d-none');
            },
            success: (response) => {
                if (response.status) {
                    document.cookie = `auth=${response.data}; expires=Thu, 18 Dec 2022 12:00:00 UTC; path=/`;
                    window.localStorage.setItem('auth', 'ok');
                    window.location = "profile";
                }
            },
            error: (response) => {
                $(".signup_form").css({
                    pointerEvents: '',
                    cursor: ''
                });
                $(".login-btn").removeClass('d-none');
                $('.login-process-btn').addClass('d-none');
                if (response.responseJSON.message == "Invalid username and password") {
                    $(".l-email, .l-password").addClass("border border-danger");
                    $(".l-error-alert").html(`<div class="alert alert-danger" role="alert">
                    Invalid username and password
                  </div>`);
                    $(".l-email").click(() => {
                        $(".l-email, .l-password").removeClass("border border-danger");
                        $(".l-error-alert").html('');
                    });
                }
            }
        });
    });
}); 