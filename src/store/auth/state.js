export default function () {
  const user = JSON.parse(localStorage.getItem('user'))
  return {
    loggedIn: !!user,
    user: user ? user : null
  }
}
