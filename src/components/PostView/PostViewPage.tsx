import React, { Component, ReactNode } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import './PostViewPage.scss';
import renderPostViewContent from './renderPostViewContent';
import { GlobalState } from '../../GlobalState/globalState';
import { getGlobalStateForReactComponent } from '../../GlobalState/getGlobalState';
import PostActions from '../../GlobalState/ActionAndStates/PostActions';
import PostHeaderComponent from './PostHeaderComponent';
import PostFooterComponent from './PostFooterComponent';

type PostViewPageProps = RouteComponentProps<PostViewPageParams>

interface PostViewPageParams {
  postId: string;
}

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
      id,
      board,
      content,
    } = postData;
    // TODO: Findout why {...postData} not work
    return (
      <div className="post-view-page container">
        <div className="board">
          <Link to={`/board/${board.id}`}>
            { board.name }
          </Link>
        </div>
        <PostHeaderComponent postData={postData} />
        <div className="body">{renderPostViewContent(content)}</div>
        <PostFooterComponent postId={id} />
      </div>
    );
  }
}
