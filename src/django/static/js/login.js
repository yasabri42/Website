(async function () {

    const token = localStorage.getItem('access_token');

    if (token) {
        window.location.replace('/profile');
        return;
    }

    const login_form = document.getElementById('login-form');

    login_form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const data = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.access) {
                localStorage.setItem('access_token', result.access);
                localStorage.setItem('refresh_token', result.refresh);
                localStorage.removeItem('htmx-history-cache');
                saveMessage('Login successful !');
                window.location.replace('/profile');
            } else {
                showMessage('Invalid credentials !');
            }
        } catch (error) {
            // console.error('Error:', error);
            // alert('An error occurred. Please try again later.');
            return;
        }
    });
})();