import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostFeedComponent } from './components/post-feed/post-feed.component';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { PostListComponent } from './components/post-list/post-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { ScrollAnimateDirective } from './directives/scroll-animate.directive';
import { StoryFeedComponent } from './components/story-feed/story-feed.component';


@NgModule({
  declarations: [
    AppComponent,
    PostFeedComponent,
    HeaderComponent,
    FooterComponent,
    PostListComponent,
    ProfileComponent,
    SearchComponent,
    ScrollAnimateDirective,
    StoryFeedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,   // ✅ Needed for Apollo HttpLink
    ApolloModule         // ✅ Import Apollo Angular module
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'http://localhost:3001/graphql',  // ✅ Your NestJS GraphQL endpoint
        }),
      }),
      deps: [HttpLink],
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
