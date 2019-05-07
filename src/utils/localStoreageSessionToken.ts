export function setSessionTokenInLocalStorage(sessionToken: string): void {
  localStorage.setItem('sessionToken', sessionToken);
}

export function getSessionTokenFromLocalStorage(): string | null {
  return localStorage.getItem('sessionToken');
}
