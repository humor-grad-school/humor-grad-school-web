import React, { Component, ReactNode } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalState } from '../../GlobalState/globalState';
import { getGlobalStateForReactComponent } from '../../GlobalState/getGlobalState';
import BoardActions from '../../GlobalState/ActionAndStates/BoardActions';
import renderPostViewContent from './renderBoardViewContent';
import BoardPostListHeaderComponent from './BoardPostListHeaderComponent';
import BoardPostListFooterComponent from './BoardPostListFooterComponent';

type PostViewPageProps = RouteComponentProps<PostViewPageParams>

interface PostViewPageParams {
  boardName: string;
  pageNum: string;
}

const Container = styled.div`
  margin: 0 3em;
  max-width: 100%;
  padding: 2em 1em;
  justify-content: center;
  background-color: #EEE;
`;

const Board = styled.div`
  margin-bottom: 1em;
  font-weight: bold;
  font-size: 1.75em;

  a {
    text-decoration: none;
    color: #333;
    transition: color 0.25s;
  }

  a:hover {
    color: #777;
  }
`;

const PostList = styled.ol`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
`;

// TODO: Check etag and then update
function forceLoad(props: PostViewPageProps): void {
  const {
    match,
  } = props;

  const { boardName } = match.params;
  const pageNumber = parseInt(match.params.pageNum, 10) || 1;

  BoardActions.loadBoard(boardName, pageNumber - 1);
}

export default class PostViewPage extends Component<PostViewPageProps, {}> {
  private globalState: GlobalState = getGlobalStateForReactComponent(this);

  // TODO: Check etag and then update
  public componentWillMount(): void {
    forceLoad(this.props);
  }

  public componentWillReceiveProps(nextProps: PostViewPageProps): void {
    forceLoad(nextProps);
  }

  public render(): ReactNode {
    const {
      match,
    } = this.props;

    const { boardName } = match.params;
    const pageNumber = parseInt(match.params.pageNum, 10) || 1;

    // TODO: Check etag and then update
    const boardData = this.globalState.boardState.boards[boardName];
    if (!boardData) return false;

    const {
      name,
      posts,
    } = boardData;
    return (
      <Container>
        <Board><Link to={`/board/${name}`}>{ name }</Link></Board>
        <BoardPostListHeaderComponent />
        <PostList>{renderPostViewContent(posts)}</PostList>
        <BoardPostListFooterComponent {...{ boardName, pageNumber }} />
      </Container>
    );
  }
}
