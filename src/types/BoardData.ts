export type Posts = Post[];

export type BoardInfo = {
  name: string;
  posts: Posts;
}

export type BoardData = {
  name: string;
  posts: Posts;
}

export type Post = {
  id: number;
  title: string;
  writer: Writer;
  likes: number;
  commentCount: number;
  createdAt: Date;
}

export type Writer = {
  username: string;
}
