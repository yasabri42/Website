function showMessage(message) {
    const message_content = document.getElementById('message-content');

    const message_section = document.createElement('section');
    message_section.className = `message_section`;

    message_section.innerHTML = `
        ${message}
    `;

    message_content.appendChild(message_section);

    setTimeout(() => {
        message_section.classList.add('fade-out');

        setTimeout(() => {
            message_section.remove();
        }, 1000);
    }, 2000);
}

function saveMessage(message) {
    sessionStorage.setItem('flash_message', JSON.stringify(message));
}

function displaySavedMessage() {
    const flash_message = sessionStorage.getItem('flash_message');

    if (flash_message) {
        const message = JSON.parse(flash_message);
        showMessage(message);
        sessionStorage.removeItem('flash_message');
    }
}

function isTokenExpired(token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = payload.exp * 1000;
    const currentTime = Date.now();

    if (currentTime >= expiryTime) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('htmx-history-cache');
        window.location.replace('/login');
        return;
    } else if (currentTime < (expiryTime - 120)) {
        refreshToken();
        return;
    };
}

async function refreshToken() {
    try {
        const refresh = localStorage.getItem('refresh_token');
        
        if (!refresh) {
            console.error('No refresh token found.');
            return;
        }

        const response = await fetch('/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: refresh }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('access_token', data.access);
            // console.log('Token refreshed successfully');
        } else {
            // console.error('Failed to refresh token:', response.status);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('htmx-history-cache');
            window.location.replace('/login');
            return;
        }
    } catch (err) {
        // console.error('Error refreshing token:', err);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('htmx-history-cache');
        window.location.replace('/login');
        return;
    }
}