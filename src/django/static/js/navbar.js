(async function () {

    const home_button = document.getElementById('home');
    const profile_button = document.getElementById('profile');
    const login_button = document.getElementById('login');
    const signup_button = document.getElementById('signup');
    const logout_button = document.getElementById('logout');

    const updateButtons = async () => {
        const access_token = localStorage.getItem('access_token');
        const valid_token = await isTokenValid(access_token);
        
        if (valid_token) {
            home_button.style.display = 'block';
            profile_button.style.display = 'block';
            login_button.style.display = 'none';
            signup_button.style.display = 'none';
            logout_button.style.display = 'block';

        } else {
            home_button.style.display = 'block';
            profile_button.style.display = 'none';
            login_button.style.display = 'block';
            signup_button.style.display = 'block';
            logout_button.style.display = 'none';

        }
    };
    
    const isTokenValid = async (token) => {
        if (!token) return false;
    
        try {
            const response = await fetch('/api/token/verify/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });
    
            return response.ok;
        } catch (error) {
            // console.error('Token validation error:', error);
            return false;
        }
    };
    
    let hamburger_menu_status = false;
    
    const initializeHamburgerMenu = async () => {
        const hamburger = document.querySelector('.hamburger');
        const nav_links = document.querySelector('nav ul');
        
        if (hamburger && nav_links) {
            hamburger.removeEventListener('click', toggleMenu);
            hamburger.addEventListener('click', toggleMenu);
        }
    };
    
    const toggleMenu = async () => {
        const nav_links = document.querySelector('nav ul');

        if (nav_links) {
            nav_links.classList.toggle('active');
        }
    };
    
    const setupHistoryRestoreListener = async () => {
        if (!hamburger_menu_status) {
            document.body.addEventListener('htmx:historyRestore', async () => {
                await initializeHamburgerMenu();
                
                const nav_links = document.querySelector('nav ul');

                if (nav_links) {
                    nav_links.classList.remove('active');
                }
            });
            
            hamburger_menu_status = true;
        }
    };
    
    await updateButtons();
    await initializeHamburgerMenu();
    await setupHistoryRestoreListener();
})();

document.addEventListener('DOMContentLoaded', () => {
    displaySavedMessage();
});