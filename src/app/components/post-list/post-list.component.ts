import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { PostService } from 'src/app/services/post.service';



const ADD_LIKE = gql`
  mutation AddLike($postId: Int!, $user: String!) {
    addLike(postId: $postId, user: $user) {
      postId
      user
      createdAt
    }
  }
`;

const ADD_COMMENT = gql`
  mutation AddComment($postId: Int!, $user: String!, $text: String!) {
    addComment(postId: $postId, user: $user, text: $text) {
      postId
      user
      text
      createdAt
    }
  }
`;
const GET_COMMENTS = gql`
  query GetAllComments {
    getAllComments {
      postId
      user
      text
      createdAt
    }
  }
`;

const GET_LIKES = gql`
  query GetAllLikes {
    getAllLikes {
      postId
      user
      createdAt
    }
  }
`;



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  commentInputs: { [postId: number]: string } = {};
  showDetails: { [postId: number]: boolean } = {};
  comments: { [postId: number]: any[] } = {};
  likes: { [postId: number]: any[] } = {};
  constructor(private apollo: Apollo,private postService: PostService) {}

  ngOnInit(): void {
     this.postService.getAllPosts().subscribe((posts) => {
      this.posts = posts;
      console.log(posts, 'this.posts');
    });

  }

convertToDisplayable(url: string): string {
  if (url.startsWith('data:image/heic')) {
    return url.replace('image/heic', 'image/jpeg'); // may render in supported cases
  }
  return url;
}
 likePost(postId: number) {
    const user = prompt('Enter your name to like this post:');
    if (!user) return;

    this.apollo
      .mutate({
        mutation: ADD_LIKE,
        variables: { postId, user },
      })
      .subscribe(() => {
        alert('❤️ Liked!');
      });
  }

commentPost(postId: number) {
    const user = prompt('Enter your name to comment:');
    const text = this.commentInputs[postId];

    if (!user || !text) return;

    this.apollo
      .mutate({
        mutation: ADD_COMMENT,
        variables: { postId, user, text },
      })
      .subscribe(() => {
        alert('💬 Comment posted!');
        this.commentInputs[postId] = ''; // clear input
      });
  }

toggleDetails(postId: number) {
    this.showDetails[postId] = !this.showDetails[postId];

    if (this.showDetails[postId]) {
      this.loadComments(postId);
      this.loadLikes(postId);
    }
  }

loadComments(postId: number) {
  this.apollo
    .watchQuery({
      query: GET_COMMENTS,
      fetchPolicy: 'network-only',
    })
    .valueChanges.subscribe((result: any) => {
      const all = result?.data?.getAllComments || [];
      this.comments[postId] = all.filter((c: any) => c.postId === postId);
    });
}

loadLikes(postId: number) {
  this.apollo
    .watchQuery({
      query: GET_LIKES,
      fetchPolicy: 'network-only',
    })
    .valueChanges.subscribe((result: any) => {
      const all = result?.data?.getAllLikes || [];
      this.likes[postId] = all.filter((l: any) => l.postId === postId);
    });
}


}
