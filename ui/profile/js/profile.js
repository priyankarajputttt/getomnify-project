$(document).ready(() => {
    $("#schedule_modal").on('shown.bs.modal', () => {
        $(".event-name").focus();
    });
});
$(document).ready(() => {
    $(".event_form").submit((e) => {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/event",
            data: new FormData(e.target),
            processData: false,
            contentType: false,
            beforeSend: () => {
                $(".event_form").css({
                    pinterEvents: 'none',
                    cursor: 'not-allowed'
                });
                $(".event-btn").addClass('d-none');
                $('.event-process-btn').removeClass('d-none');
            },
            success: (response) => {
                if (response.status) {
                    window.location.reload();
                }
            },
            error: (response) => {
                $(".event_form").css({
                    pointerEvents: '',
                    cursor: ''
                });
                $(".event-btn").removeClass('d-none');
                $('.event-process-btn').addClass('d-none');
                if (response.responseJSON.message === 'Duplicate event') {
                    $(".event-name").addClass("border border-danger");
                    $(".event-name-error").html('Event is already exists');
                    $(".event-name").click(() => {
                        $(".event-name").removeClass("border border-danger");
                        $(".event-name-error").html('');
                    });
                }
            }
        });
    });
});

/**
 * profile update
 */

$(document).ready(() => {
    let result;
    let cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        result = cookies[i].split('=');
    }
    const token = result[1];
    const userData = JSON.parse(atob(token.split('.')[1]));
    console.log(userData)
    $(".user-pic-box").html(userData.abbr)
    $("#profile_modal").on('show.bs.modal', () => {
        $(".profile-fullname").html('welcome, ' + userData.fullname)
        $(".profile-pic-box").html(userData.abbr);
        $('.profile-email').html('<b>Email-Id</b>: ' + userData.au);

        //logout

        $(".logout-btn").click(function () {
            $(this).html(`<div class="spinner-border spinner-border-lg"></div>`);
            $("body").css({
                pointerEvents: 'none'
            });
            document.cookie = `auth=; expires=Thu, 18 Dec 2010 12:00:00 UTC; path=/`;
            window.localStorage.removeItem('auth');

            //redirect to homepage
            window.location.href = "/";
        });
    });
}); 
