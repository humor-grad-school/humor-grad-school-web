import loadExternalJsASync from '../../../../utils/loadExternalJsASync';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let promise: Promise<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let gapi: any;

function loadGapiAuth2WithPromise(): Promise<void> {
  return new Promise((resolve) => {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        // eslint-disable-next-line @typescript-eslint/camelcase
        client_id: '74489406824-dlmplsl075187spamd9a4m6g90ah56so.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      resolve();
    });
  });
}

const id = 'google-jssdk';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function loadGoogleSdk(): Promise<any> {
  if (!promise) {
    promise = loadExternalJsASync(id, '//apis.google.com/js/platform.js')
      .then(async () => {
        await loadGapiAuth2WithPromise();
      });
  }
  return promise;
}
