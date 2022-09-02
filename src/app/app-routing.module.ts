import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { RandomComponent } from './movie/random/random.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { WatchedComponent } from './watched/watched.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  { path: 'watchlist', component: WatchlistComponent, canActivate: [AuthGuard] },
  { path: 'watched', component: WatchedComponent, canActivate: [AuthGuard] },
  { path: 'search-result/:searchQuery', component: SearchResultComponent, canActivate: [AuthGuard] },
  { path: 'random', component: RandomComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
