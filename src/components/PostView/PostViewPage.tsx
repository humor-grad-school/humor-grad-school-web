import React, { Component, ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './PostViewPage.scss';
import renderPostViewContent from './renderPostViewContent';
import { GlobalState } from '../../GlobalState/globalState';
import { getGlobalStateForReactComponent } from '../../GlobalState/getGlobalState';
import PostActions from '../../GlobalState/ActionAndStates/PostActions';

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

    const { content } = postData;
    return (
      <div className="post-view-page container">
        <div className="header">i am header. put title here</div>
        <div className="body">{renderPostViewContent(content)}</div>
      </div>
    );
  }
}
