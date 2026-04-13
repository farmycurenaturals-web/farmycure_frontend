const TOKEN_KEYS = ['farmycure_token', 'token']

export const isUserLoggedIn = () => {
  if (typeof window === 'undefined') return false
  return TOKEN_KEYS.some((key) => Boolean(localStorage.getItem(key)))
}

