export interface LoginState {
  isOverlayActived: boolean;
  isLoggedIn: boolean;
}

export const initialLoginState: LoginState = {
  isOverlayActived: false,
  isLoggedIn: false,
};
