export async function processAuthentication(){
  let loggedIn = await fetch('/data/login')
  loggedIn = await loggedIn.json()
  return loggedIn
}
