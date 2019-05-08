import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import BoardActions from '../../../GlobalState/ActionAndStates/BoardActions';
import { GlobalState } from '../../../GlobalState/globalState';
import { getGlobalStateForReactComponent } from '../../../GlobalState/getGlobalState';
import PostListComponent from '../../PostList/PostListComponent';
import FeedPostListHeaderComponent from './FeedPostListHeaderComponent';

type FeedComponentProps = {
  boardName: string;
}

const Container = styled.div`
  margin: 2em;
  width: 100%;
  max-width: 32em;
`;

function forceLoadPosts(boardName: string): void {
  BoardActions.loadBoard(boardName, 0);
}

export default class FeedComponent extends Component<FeedComponentProps, {}> {
  private globalState: GlobalState = getGlobalStateForReactComponent(this);

  public componentWillMount(): void {
    const { boardName } = this.props;
    forceLoadPosts(boardName);
  }

  public componentWillReceiveProps(): void {
    const { boardName } = this.props;
    forceLoadPosts(boardName);
  }

  public render(): ReactNode {
    const {
      boardName,
    } = this.props;

    const boardData = this.globalState.boardState.boards[boardName];
    if (!boardData) {
      forceLoadPosts(boardName);
      return false;
    }

    const {
      posts,
    } = boardData;

    return (
      <Container>
        <FeedPostListHeaderComponent boardName={boardName} />
        <PostListComponent posts={posts} />
      </Container>
    );
  }
}
