import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostFeedComponent } from './components/post-feed/post-feed.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', component: PostListComponent },          // Home
  { path: 'post-feed', component: PostFeedComponent }, // Post form
  { path: 'profile', component: ProfileComponent }, // Profile component
  { path: 'search', component: SearchComponent }, // Search Component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
