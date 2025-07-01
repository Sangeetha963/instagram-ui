import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_ALL_POSTS = gql`
  query {
    getAllPosts {
      id
      caption
      imageUrl
      author
      createdAt
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private apollo: Apollo) {}

  getAllPosts(): Observable<any[]> {
    return this.apollo
      .watchQuery({
        query: GET_ALL_POSTS,
        fetchPolicy: 'network-only' // Optional: always fetch fresh data
      })
      .valueChanges
      .pipe(map((result: any) => result?.data?.getAllPosts || []));
  }
}
