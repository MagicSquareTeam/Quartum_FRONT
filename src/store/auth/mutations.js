export function loginSuccess(state, user) {
  state.loggedIn = true;
  state.user = user;
}

export function loginFailure(state) {
  state.loggedIn = false;
  state.user = null;
}

export function logout(state) {
  state.loggedIn = false;
  state.user = null;
}

export function registerSuccess(state) {
  state.loggedIn = false;
}

export function registerFailure(state) {
  state.loggedIn = false;
}
