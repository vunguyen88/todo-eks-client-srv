export const authReducer = (state=null,  action) => {
  switch(action.type) {
    case 'SIGN_IN_SUCCESS':
      return {
        accessToken: action.auth.token,
        isSignedIn: true,
      }
    case 'SIGN_OUT':
      return null;
    default: 
      return state
  }
}