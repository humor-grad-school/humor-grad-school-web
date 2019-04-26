import loadExternalJsASync from '../../../../utils/loadExternalJsASync';

let promise: Promise<any>;
declare let gapi: any;

const id = 'google-jssdk';
export default function loadGoogleSdk(): Promise<any> {
  if (!promise) {
    promise = loadExternalJsASync(id, '//apis.google.com/js/platform.js')
      .then(() => {
        gapi.load('auth2', () => {
          // Retrieve the singleton for the GoogleAuth library and set up the client.
          gapi.auth2.init({
            // eslint-disable-next-line @typescript-eslint/camelcase
            client_id: '74489406824-dlmplsl075187spamd9a4m6g90ah56so.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
          });
        });
      });
  }
  return promise;
}
