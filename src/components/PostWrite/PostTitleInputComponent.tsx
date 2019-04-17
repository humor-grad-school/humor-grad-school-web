import styled from 'styled-components';
import React, { Component } from 'react';

type PostTitleInputComponentStates = {
  title: string;
}

const TitleInput = styled.input`
margin-bottom: 1em;
padding: 0.5em;
border: 4px solid #999;
width: calc(100% - 1em - 8px);
`;

export default class PostTitleInputComponent extends Component<{}, PostTitleInputComponentStates> {
  public constructor(props: {}) {
    super(props);

    this.state = {
      title: '',
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  public getTitle(): string {
    const { title } = this.state;
    return title;
  }

  private handleTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      title: event.target.value,
    });
  }

  public render(): JSX.Element {
    const {
      title,
    } = this.state;

    return (
      <TitleInput
        type="text"
        value={title}
        onChange={this.handleTitleChange}
        placeholder="[여기에 제목 입력]"
      />
    );
  }
}
