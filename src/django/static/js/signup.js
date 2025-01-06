(async function () {

    const token = localStorage.getItem('access_token');

        if (token) {
            window.location.replace('/profile');
            return;
        }

    const signup_form = document.getElementById('signup-form');
    
    signup_form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        const data = {
            username: username,
            email: email,
            password: password
        };

        try {
            const response = await fetch('/api/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                if (result.username)
                    showMessage(result.username);
                if (result.email)
                    showMessage(result.email);
                return;
            } else {
                saveMessage('Registration successful !');
                window.location.replace('/login');
            }
        } catch (error) {
            // console.error('Error:', error);
            // alert('An unexpected error occurred. Please try again later.');
            return;
        }
    });
})();