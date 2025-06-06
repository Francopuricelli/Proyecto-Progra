
const form = document.getElementById('login-form');



form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita el envío del formulario por defecto

  const usernameInput = document.getElementById('username').value;
  
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: usernameInput }),
    });

       const data = await response.json();

    localStorage.setItem('username', usernameInput); // Guarda el nombre de usuario en localStorage


    if (response.ok) {
      alert(data.message); // Muestra un mensaje de éxito
      window.location.href = "home.html"; // Redirige a home.html
    } else {
      alert(data.message); // Muestra un mensaje de error
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while logging in.');
  }


});


