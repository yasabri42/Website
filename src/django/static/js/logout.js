(async function () {

    const logout_button = document.getElementById('logout');

    logout_button.addEventListener('click', async (event) => {
        event.preventDefault();

        try {
            const refresh = localStorage.getItem('refresh_token');
            
            if (!refresh)
                // console.error('No refresh token found.');
                return;
            
            const response = await fetch('/api/logout/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refresh }),
            });
            
            if (response.ok) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('htmx-history-cache');
                saveMessage('Logout successful !');
                window.location.replace('/login');
            } else {
                // const errorData = await response.json();
                // console.error('Logout failed:', errorData);
                return;
            }
        } catch (error) {
            // console.error('Logout error:', error);
            return;
        }
    });
})();