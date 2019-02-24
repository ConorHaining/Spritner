import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JourneySearchPageComponent } from './journey-search-page/journey-search-page.component';
import { StationBoardPageComponent } from './station-board-page/station-board-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
  {path: '', component: JourneySearchPageComponent},
  {path: 'station/:crs/:direction', component: StationBoardPageComponent},
  {path: '**', component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
