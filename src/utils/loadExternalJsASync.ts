// eslint-disable-next-line @typescript-eslint/no-explicit-any
const promiseMap: {[id: string]: Promise<any>} = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function loadExternalJsASync(id: string, url: string): Promise<any> {
  if (promiseMap[id]) {
    return promiseMap[id];
  }

  promiseMap[id] = new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      return reject(new Error('kakao sdk loading has been already started'));
    }
    const scriptElement: HTMLScriptElement = document.createElement('script');
    scriptElement.id = id;
    scriptElement.src = url;
    // tslint:disable-next-line:only-arrow-functions
    scriptElement.onload = () => {
      resolve();
    };
    const firstScriptElement = document.getElementsByTagName('script')[0];
    if (!firstScriptElement || !firstScriptElement.parentNode) {
      return reject(new Error('cannot insert script'));
    }
    firstScriptElement.parentNode.insertBefore(scriptElement, firstScriptElement);
    return undefined;
  });

  return promiseMap[id];
}
