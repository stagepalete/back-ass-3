$(document).ready(function () {
    $('#signUpButton').on('click', function (event) {
        event.preventDefault();

        const username = $('#username').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();

        const data = {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };

        console.log(data);
        $.ajax({
            type: 'POST',
            url: '/api/signup',
            data: data,
            success: function (response) {
                console.log('Signup successful');
                console.log(response);
            },
            error: function (xhr, status, error) {
                console.error('Error occurred while signing up');
                console.error(xhr.responseText);
                const response = JSON.parse(xhr.responseText);
                $('#messages').html(response.message);
                $('#messages').addClass('alert alert-danger');

            }
        });
    });
});
