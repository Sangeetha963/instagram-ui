import { Component, OnInit } from '@angular/core';
// import { StoryService } from '../services/story.service';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-story-feed',
  templateUrl: './story-feed.component.html',
  styleUrls: ['./story-feed.component.scss'],
})
export class StoryFeedComponent implements OnInit {
  previewUrl: string | null = null;
  stories: { id?: string; imageUrl: string; author: string; createdAt?: string }[] = [];
  currentUser = 'Sangeetha';

  selectedStory: { imageUrl: string; author: string } | null = null;

  constructor(private storyService: StoryService) {}

  ngOnInit() {
    this.fetchStories();
  }

  handleStoryUpload(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  postStory() {
    if (this.previewUrl) {
      const input = {
        imageUrl: this.previewUrl,
        author: this.currentUser,
      };

      this.storyService.createStory(input).subscribe(() => {
        this.previewUrl = null;
        this.fetchStories();
      });
    }
  }

  fetchStories() {
    this.storyService.getAllStories().subscribe((stories) => {
      this.stories = stories;
    });
  }

  viewStory(story: { imageUrl: string; author: string }) {
    this.selectedStory = story;
  }

  convertToDisplayable(base64: string) {
    return base64;
  }
  showAddStoryPopup = false;

closeModal() {
  this.selectedStory = null;
  this.showAddStoryPopup = false;
}
}
