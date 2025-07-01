import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
 posts: any[] = [];
  username = 'Sangeetha'; // Or dynamically load from user auth

  constructor(private postService: PostService) {}

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
  console.log(url,'url-----')
  return url;
}
}
