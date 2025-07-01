import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const CREATE_POST = gql`
  mutation CreatePost($caption: String!, $imageUrl: String!, $author: String!) {
    createPost(caption: $caption, imageUrl: $imageUrl, author: $author) {
      id
      caption
      imageUrl
      author
      createdAt
    }
  }
`;

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss'],
})
export class PostFeedComponent {
  newPost = {
    caption: '',
    imageUrl: '',
    author: '',
  };

  selectedImageFile: File | null = null;

  constructor(private apollo: Apollo) {}

  onImageSelected(event: any) {
    this.selectedImageFile = event.target.files[0];
    if (this.selectedImageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newPost.imageUrl = reader.result as string; // Base64 string
      };
      reader.readAsDataURL(this.selectedImageFile);
    }
  }
handleImageUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    // force MIME type to image/jpeg or image/png
    const result = reader.result as string;
    const jpegData = result.replace(/^data:.*?;base64/, 'data:image/jpeg;base64');
    this.newPost.imageUrl = jpegData;
  };

  reader.readAsDataURL(file); // convert image to base64
}

  createPost() {
    if (!this.newPost.imageUrl || !this.newPost.caption || !this.newPost.author) {
      alert('All fields are required!');
      return;
    }

    this.apollo
      .mutate({
        mutation: CREATE_POST,
        variables: {
          caption: this.newPost.caption,
          imageUrl: this.newPost.imageUrl, // Base64 image
          author: this.newPost.author,
        },
      })
      .subscribe(() => {
        this.newPost = { caption: '', imageUrl: '', author: '' };
        this.selectedImageFile = null;
        alert('✅ Post created!');
      });
  }
}
