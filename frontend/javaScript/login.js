
const formulario = document.getElementById('login-form');



formulario.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const inputUsuario = document.getElementById('username').value;
  try{
          if (inputUsuario.trim() === '') {
            alert('Please enter a username'); 
            return;
          } else {

            const response = await fetch("/api/users/create", { 
              method: "POST",
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ username: inputUsuario })
            })

            const data= await response.json();

            if (response.ok){
              localStorage.setItem('usuario', JSON.stringify({ id: data.newUser.id, username: data.newUser.username }));
              window.location.href = "home.html";
            }else {
              alert(data.error);

            }
            
          }

      } catch(error) {
        console.error();
        
      }

});


