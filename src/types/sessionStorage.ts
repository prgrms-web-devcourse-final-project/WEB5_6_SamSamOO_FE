export function setSessionLogin(loginWay: 'email' | 'social') {
  sessionStorage.removeItem('loginWay');
  sessionStorage.setItem('loginWay', loginWay);
}
