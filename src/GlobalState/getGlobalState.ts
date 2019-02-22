import { Component } from 'react';
import createObserverProxy, { Observer } from 'observer-proxy';
import { initialGlobalState, GlobalState } from './globalState';

export function getGlobalState(observer: Observer | undefined = undefined): GlobalState {
  return createObserverProxy(initialGlobalState, observer);
}

export function getGlobalStateForReactComponent(reactComponent: Component): GlobalState {
  const observer = new Observer({
    onStateUpdate: () => {
      reactComponent.forceUpdate();
    },
  });

  if (reactComponent.componentWillUnmount) {
    const originalComponentWillUnmount = reactComponent.componentWillUnmount;

    // eslint-disable-next-line
    reactComponent.componentWillUnmount = () => {
      observer.stopObserving();

      originalComponentWillUnmount.call(reactComponent);
    };
  }

  return getGlobalState(observer);
}
