import React from 'react';
import styled from 'styled-components';
import BaseLoginComponent from '../BaseLoginComponent';

const DevelopLoginButton = styled.button`
  display: inline-block;
  padding: 1em;
  border-radius: 0.1em;
  border: 0px;
`;

export default class DevelopLoginComponent extends BaseLoginComponent<{}, {}> {
  public origin: string = 'local';

  public render(): JSX.Element {
    return (
      <DevelopLoginButton
        type="button"
        onClick={() => { this.onThirdPartyLoginSuccessful({ idToken: 'daff204a-079f-4a6d-96aa-2csdf3s5d85' }); }}
      >
        develop
      </DevelopLoginButton>
    );
  }
}
