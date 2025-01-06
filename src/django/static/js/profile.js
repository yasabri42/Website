(async function () {

    const token = localStorage.getItem('access_token');

        if (!token) {
            window.location.replace('/login');
            return;
        }

    async function fetchUserProfile() {

        try {
            isTokenExpired(token);

            const response = await fetch('/api/profile/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok || !token) {
                throw new Error('Failed to fetch user profile');
            } else {
                const data = await response.json();
                displayUserProfile(data);
            }
        } catch (error) {
            // console.error('Error fetching user profile:', error);
            saveMessage('The session has expired. Redirecting to login...');
            window.location.replace('/login');
        }
    }

    function displayUserProfile(user) {
        const profile_content = document.getElementById('profile-content');

        const profile_section = document.createElement('section');
        profile_section.className = `profile_section`;

        profile_section.innerHTML = `
            <div class="profile">
                <img src="profile-pic-placeholder.png" alt="Profile Picture">
                <h1>${user.username}</h1>
                <button class="edit_button">⚙</button>
                <p>Your email : ${user.email}</p>
                <h2>SCORE</h2>
                <h3>${user.score}</h3>
            </div>

            <div class="challenges_div">
                <h2>Challenges Completed</h2>
                <ul class="challenges">
                    <li>Web Exploitation - SQL Injection Basics</li>
                    <li>Reverse Engineering - Binary Fun</li>
                    <li>Cryptography - Breaking Caesar</li>
                </ul>
            </div>
        `;

        profile_content.appendChild(profile_section);
    }

    await fetchUserProfile();
})();