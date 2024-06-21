document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('promesa_pago');
    const errorMessage = document.getElementById('error-message');

    inputField.addEventListener('input', () => {
        // Remove non-digit characters
        inputField.value = inputField.value.replace(/[^0-9]/g, '');

        // Validate if the input is a valid integer
        if (!/^\d+$/.test(inputField.value) && inputField.value !== '') {
            errorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none';
        }
    });
});
