import { getGlobalState } from '../getGlobalState';
import { HgsRestApi } from '../../generated/client/ClientApis';
import { setSessionTokenInLocalStorage, getSessionTokenFromLocalStorage } from '../../utils/localStoreageSessionToken';
import { ResponseType } from '../../generated/ResponseType';

const globalState = getGlobalState();

const thirdPartyLogoutFunctions: Map<string, () => void> = new Map();

const LoginActions = {
  setThirdPartyLogoutFunction(origin: string, thirdPartyLogoutFunction: () => void): void {
    thirdPartyLogoutFunctions.set(origin, thirdPartyLogoutFunction);
  },

  logoutThirdParty(origin?: string): void {
    if (origin) {
      const thirdPartyLogoutFunction = thirdPartyLogoutFunctions.get(origin);
      if (!thirdPartyLogoutFunction) {
        return;
      }
      thirdPartyLogoutFunction();
    } else {
      thirdPartyLogoutFunctions.forEach(thirdPartyLogoutFunction => (
        thirdPartyLogoutFunction()
      ));
    }
  },

  async login(
    origin: string,
    idToken: string,
    autoLogin?: boolean,
  ): Promise<ResponseType.AuthenticateResponseType> {
    const response = await HgsRestApi.authenticate({
      origin,
      authenticationRequestData: {
        idToken,
      },
    });

    if (response.isSuccessful) {
      const { sessionToken } = response.data;
      HgsRestApi.setSessionToken(sessionToken);

      if (autoLogin) {
        setSessionTokenInLocalStorage(sessionToken);
      }

      globalState.loginState.isLoggedIn = true;
    }

    return response as ResponseType.AuthenticateResponseType;
  },

  logout(): void {
    HgsRestApi.setSessionToken('');

    setSessionTokenInLocalStorage('');

    globalState.loginState.isLoggedIn = false;

    LoginActions.logoutThirdParty();
  },

  loginFromLocalStorage(): void {
    const sessionToken = getSessionTokenFromLocalStorage();
    if (!sessionToken) {
      return;
    }

    HgsRestApi.setSessionToken(sessionToken);

    globalState.loginState.isLoggedIn = true;
  },

  async signUp(
    origin: string,
    username: string,
    idToken: string,
  ): Promise<ResponseType.SignUpResponseType> {
    const response = await HgsRestApi.signUp({
      origin,
      username,
      authenticationRequestData: {
        idToken,
      },
    });

    return response;
  },

  openOverlay() {
    globalState.loginState.isOverlayActived = true;
  },

  closeOverlay() {
    globalState.loginState.isOverlayActived = false;
  },
};

export default LoginActions;
