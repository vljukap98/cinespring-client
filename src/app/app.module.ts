import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { MovieComponent } from './movie/movie/movie.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { WatchedComponent } from './watched/watched.component';
import { RandomComponent } from './movie/random/random.component';
import { SearchComponent } from './search/search/search.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { RegisterSuccessComponent } from './auth/register-success/register-success.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    MovieComponent,
    MovieDetailsComponent,
    WatchlistComponent,
    WatchedComponent,
    RandomComponent,
    SearchComponent,
    SearchResultComponent,
    SignUpComponent,
    FavoriteComponent,
    RegisterSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
