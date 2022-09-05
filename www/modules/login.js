$('#login').on('submit', login)

async function login(e){
  e.preventDefault()
  let login = await fetch('/data/login',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: $('#email').val(),
      password: $('#password').val()
    })
  })
  if(login.status === 200){
    location.assign('/')
  }
}

