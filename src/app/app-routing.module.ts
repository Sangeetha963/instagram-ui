import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostFeedComponent } from './components/post-feed/post-feed.component';
import { PostListComponent } from './components/post-list/post-list.component';

const routes: Routes = [
  { path: '', component: PostListComponent },          // Home
  { path: 'post-feed', component: PostFeedComponent }, // Post form
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
