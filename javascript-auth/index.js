
var SUPABASE_URL = 'https://imdvvfcbtrfewysxgrnr.supabase.co'
var SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNDMzNzg3MSwiZXhwIjoxOTI5OTEzODcxfQ.O7Ck0RFbXxsJ9BpxdAuey5O_MJcC_lHM06xDYKTbWxg'

var supabase = Supabase.createClient(https://imdvvfcbtrfewysxgrnr.supabase.co, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNDMzNzg3MSwiZXhwIjoxOTI5OTEzODcxfQ.O7Ck0RFbXxsJ9BpxdAuey5O_MJcC_lHM06xDYKTbWxg)
window.userToken = null

document.addEventListener('DOMContentLoaded', function (event) {
  var signUpForm = document.querySelector('#sign-up')
  signUpForm.onsubmit = signUpSubmitted.bind(signUpForm)

  var logInForm = document.querySelector('#log-in')
  logInForm.onsubmit = logInSubmitted.bind(logInForm)

  var userDetailsButton = document.querySelector('#user-button')
  userDetailsButton.onclick = fetchUserDetails.bind(userDetailsButton)

  var logoutButton = document.querySelector('#logout-button')
  logoutButton.onclick = logoutSubmitted.bind(logoutButton)
})

const signUpSubmitted = (event) => {
  event.preventDefault()
  const email = event.target[0].value
  const password = event.target[1].value

  supabase.auth
    .signUp({email, password})
    .then((response) => {
      document.querySelector('#access-token').value = response.data.access_token
      document.querySelector('#refresh-token').value = response.data.refresh_token
      alert("Logged in as " + response.user.email)
    })
    .catch((err) => {
      alert(err.response.text)
    })
}

const logInSubmitted = (event) => {
  event.preventDefault()
  const email = event.target[0].value
  const password = event.target[1].value

  supabase.auth
    .signIn({email, password})
    .then((response) => {
      document.querySelector('#access-token').value = response.data.access_token
      document.querySelector('#refresh-token').value = response.data.refresh_token
      // response.error ?
      alert("Logged in as " + response.user.email)
    })
    .catch((err) => {
      alert(err.response.text)
    })
}

const fetchUserDetails = () => {
  supabase.auth
    .user()
    .then((response) => {
      alert(JSON.stringify(response))
    })
    .catch((err) => {
      alert(err.response.text)
    })
}

const logoutSubmitted = (event) => {
  event.preventDefault()

  supabase.auth
    .signOut()
    .then((response) => {
      document.querySelector('#access-token').value = ''
      document.querySelector('#refresh-token').value = ''
      alert("Logout successful")
    })
    .catch((err) => {
      alert(err.response.text)
    })
}
