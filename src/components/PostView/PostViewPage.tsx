import React, { Component, ReactNode } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalState } from '../../GlobalState/globalState';
import { getGlobalStateForReactComponent } from '../../GlobalState/getGlobalState';
import PostActions from '../../GlobalState/ActionAndStates/PostActions';
import { startRenderContent } from '../ContentView/renderContent';
import PostHeaderComponent from './PostHeaderComponent';
import PostFooterComponent from './PostFooterComponent';
import CommentViewComponent from './CommentViewComponent/CommentViewComponent';

type PostViewPageProps = RouteComponentProps<PostViewPageParams>

interface PostViewPageParams {
  postId: string;
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
    
    :hover {
      color: #777;
    }
  }
`;

const Body = styled.div`
  width: 100%;
`;

export default class PostViewPage extends Component<PostViewPageProps, {}> {
  private globalState: GlobalState = getGlobalStateForReactComponent(this);

  public render(): ReactNode {
    const {
      match,
    } = this.props;

    const postId = parseInt(match.params.postId, 10);

    const postData = this.globalState.postState.posts[postId];
    if (!postData) {
      PostActions.loadPost(postId);
      return false;
    }

    const {
      board,
      content,
      comments,
    } = postData;
    // TODO: Findout why {...postData} not work
    return (
      <Container>
        <Board>
          <Link to={`/board/${board.id}`}>{ board.name }</Link>
        </Board>
        <PostHeaderComponent postData={postData} />
        <Body>{startRenderContent(content)}</Body>
        <PostFooterComponent postData={postData} />
        <CommentViewComponent
          postWriterId={postData.writer.id}
          comments={comments}
          postId={postId}
        />
      </Container>
    );
  }
}
