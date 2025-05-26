let button =
    document.getElementById('login');

button.addEventListener('click', () => {
    button.classList.add('flug');

    setTimeout(() => {
        button.classList.remove('flug');
    }, 1000);
});

let button2 =
    document.getElementById('regestrieren');

button2.addEventListener('click', () => {
    button2.classList.add('flug');

    setTimeout(() => {
        button2.classList.remove('flug');
    }, 1000);
});

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://online-casino-j9qk.onrender.com/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('balance', data.balance);
            alert('Willkommen zurück ' + username + '!');
            window.location.href = '/spiel.html';
        } else {
            alert('Login fehlgeschlagen: ' + data.message);
        }
    } catch (err) {
        alert('Server nicht erreichbar');
        console.error(err);
    }
}

async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://online-casino-j9qk.onrender.com/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('balance', data.balance);
            alert('Registrierung erfolgreich! Willkommen ' + username + '!');
            window.location.href = '/spiel.html';
        } else {
            alert('Registrierung fehlgeschlagen: ' + data.message);
        }
    } catch (err) {
        alert('Server nicht erreichbar.');
        console.error(err);
    }
}