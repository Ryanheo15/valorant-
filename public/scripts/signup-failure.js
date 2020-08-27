const urlParams = new URLSearchParams(window.location.search);
const loginStatus = urlParams.get('error');

if (loginStatus === 'emailTaken') {
    $('#emailTakenMessage').removeClass('d-none');
    $('#passwordDiv').removeClass('mt-4');
    $('#passwordDiv').addClass('mt-3');
}