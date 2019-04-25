const promiseMap: {[id: string]: Promise<any>} = {};

export default function loadExternalJsASync(id: string, url: string) {
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
    scriptElement.onload = function () {
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
