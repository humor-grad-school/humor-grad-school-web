import loadExternalJsASync from '../../../../utils/loadExternalJsASync';

let promise: Promise<any>;
declare let FB: any;

const id = 'facebook-jssdk';
export default function loadFacebookSdk(): Promise<void> {
  if (!promise) {
    // tslint:disable-next-line:max-line-length
    promise = loadExternalJsASync(id, 'https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v3.2&appId=1981226042178093&autoLogAppEvents=1')
      .then(() => {
        FB.init({
          appId: '1981226042178093',
          xfbml: true,
          version: 'v3.2',
        });
        FB.AppEvents.logPageView();
      });
  }
  return promise;
}
