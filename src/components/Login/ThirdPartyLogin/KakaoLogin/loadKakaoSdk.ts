import loadExternalJsASync from '../../../../utils/loadExternalJsASync';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let promise: Promise<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let Kakao: any;

const id = 'kakao-jssdk';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function loadKakaoSdk(): Promise<any> {
  if (!promise) {
    promise = loadExternalJsASync(id, '//developers.kakao.com/sdk/js/kakao.min.js')
      .then(() => {
        Kakao.init('9961b823fe0a81d417fe53fb96b12fa6');
      });
  }
  return promise;
}
