import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

const GET_ALL_STORIES = gql`
  query {
    getAllStories {
      id
      imageUrl
      author
      createdAt
    }
  }
`;

const CREATE_STORY = gql`
  mutation CreateStory($input: CreateStoryInput!) {
    createStory(input: $input) {
      id
      imageUrl
      author
      createdAt
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  constructor(private apollo: Apollo) {}

  getAllStories() {
    return this.apollo
      .watchQuery<any>({
        query: GET_ALL_STORIES,
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(map(result => result?.data?.getAllStories));
  }

  createStory(input: { imageUrl: string; author: string }) {
    return this.apollo.mutate({
      mutation: CREATE_STORY,
      variables: { input },
    });
  }
}
