import { getGlobalState } from '../getGlobalState';
import { HgsRestApi } from '../../generated/client/ClientApis';

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

  async login(origin: string, idToken: string): Promise<boolean> {
    const response = await HgsRestApi.authenticate({
      origin,
      authenticationRequestData: {
        idToken,
      },
    });

    if (response.isSuccessful) {
      const { sessionToken } = response.data;
      HgsRestApi.setSessionToken(sessionToken);

      globalState.loginState.isLoggedIn = true;

      return true;
    }

    if (response.errorCode === 'NoUser') return false;

    throw new Error(response.errorCode);
  },

  logout(): void {
    HgsRestApi.setSessionToken('');

    globalState.loginState.isLoggedIn = false;
  },

  async signUp(origin: string, username: string, idToken: string): Promise<boolean> {
    const response = await HgsRestApi.signUp({
      origin,
      username,
      authenticationRequestData: {
        idToken,
      },
    });

    if (!response.isSuccessful) return false;
    return true;
  },

  openOverlay() {
    globalState.loginState.isOverlayActived = true;
  },

  closeOverlay() {
    globalState.loginState.isOverlayActived = false;
  },
};

export default LoginActions;
