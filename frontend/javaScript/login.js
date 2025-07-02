
const form = document.getElementById('login-form');



form.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const usernameInput = document.getElementById('username').value;
  try{
          if (usernameInput.trim() === '') {
            alert('Please enter a username'); 
            return;
          } else {

            const response = await fetch("/api/users/create", { 
              method: "POST",
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ username: usernameInput })
            })

            const data= await response.json();

            if (response.ok){
              localStorage.setItem('username', usernameInput); 
              window.location.href = "home.html";
            }else {
              alert(data.error);

            }
            
          }

      } catch(error) {
        console.error();
        
      }

});


