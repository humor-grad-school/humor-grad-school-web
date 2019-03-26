import React, { Component, ReactNode } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import './BoardViewPage.scss';
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

export default class PostViewPage extends Component<PostViewPageProps, {}> {
  private globalState: GlobalState = getGlobalStateForReactComponent(this);

  public render(): ReactNode {
    const {
      match,
    } = this.props;

    const { boardName } = match.params;
    const pageNumber = parseInt(match.params.pageNum, 10) || 1;

    const boardData = this.globalState.boardState.boards[boardName];
    if (!boardData) {
      BoardActions.loadBoard(boardName, pageNumber);
      return false;
    }

    const {
      name,
      posts,
    } = boardData;
    return (
      <div className="board-view-page container">
        <div className="board">
          <Link to={`/board/${name}`}>
            { name }
          </Link>
        </div>
        <BoardPostListHeaderComponent />
        <ol className="post-list">
          {renderPostViewContent(posts)}
        </ol>
        <BoardPostListFooterComponent {...{ boardName, pageNumber }} />
      </div>
    );
  }
}
