import { getGlobalState } from '../getGlobalState';
import { HgsRestApi } from '../../generated/client/ClientApis';
import { ErrorCode } from '../../generated/ErrorCode';
import { setSessionTokenInLocalStorage, getSessionTokenFromLocalStorage } from '../../utils/localStoreageSessionToken';

const globalState = getGlobalState();

const thirdPartyLogoutFunctions: { [key: string]: () => void } = {};

const LoginActions = {
  setThirdPartyLogoutFunction(origin: string, thirdPartyLogoutFunction: () => void): void {
    thirdPartyLogoutFunctions[origin] = thirdPartyLogoutFunction;
  },

  logoutThirdParty(origin: string): void {
    const thirdPartyLogoutFunction = thirdPartyLogoutFunctions[origin];
    if (!thirdPartyLogoutFunction) return;
    thirdPartyLogoutFunction();
  },

  async login(origin: string, idToken: string, autoLogin?: boolean): Promise<boolean> {
    const response = await HgsRestApi.authenticate({
      origin,
      authenticationRequestData: {
        idToken,
      },
    });

    if (response.isSuccessful) {
      const { sessionToken } = response.data;
      HgsRestApi.setSessionToken(sessionToken);

      if (autoLogin) setSessionTokenInLocalStorage(sessionToken);

      globalState.loginState.isLoggedIn = true;

      return true;
    }

    const { errorCode } = response;
    if (errorCode === ErrorCode.AuthenticateErrorCode.NoUser) return false;

    throw new Error(errorCode);
  },

  logout(): void {
    HgsRestApi.setSessionToken('');

    setSessionTokenInLocalStorage('');

    globalState.loginState.isLoggedIn = false;
  },

  loginFromLocalStorage(): void {
    const sessionToken = getSessionTokenFromLocalStorage();
    if (!sessionToken) return;

    HgsRestApi.setSessionToken(sessionToken);

    globalState.loginState.isLoggedIn = true;
  },

  async signUp(origin: string, username: string, idToken: string): Promise<boolean> {
    const response = await HgsRestApi.signUp({
      origin,
      username,
      authenticationRequestData: {
        idToken,
      },
    });

    if (response.isSuccessful) return true;

    const { errorCode } = response;
    if (errorCode === ErrorCode.SignUpErrorCode.CreateUserFailed) return false;

    throw new Error(errorCode);
  },

  openOverlay() {
    globalState.loginState.isOverlayActived = true;
  },

  closeOverlay() {
    globalState.loginState.isOverlayActived = false;
  },
};

export default LoginActions;
