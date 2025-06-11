
const form = document.getElementById('login-form');



form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita el envío del formulario por defecto

  const usernameInput = document.getElementById('username').value;
  
  if (usernameInput.trim() === '') {
    alert('Please enter a username'); // Verifica que el campo no esté vacío
    return;
  } else {
    localStorage.setItem('username', usernameInput); // Guarda el nombre de usuario en localStorage
    window.location.href = "home.html"; // Redirige a home.html
  }

});


