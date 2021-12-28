import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { HomeComponent } from './controller/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { MetricOverviewComponent } from './controller/metric-overview/metric-overview.component';
import { LogOverviewComponent } from './controller/log-overview/log-overview.component';
import { DetectorOverviewComponent } from './controller/detector-overview/detector-overview.component';
import { DetectorDetailsComponent } from './controller/detector-details/detector-details.component';
import { DetectorFormComponent } from './controller/detector-form/detector-form.component';

// guards
import { CanUseClientGuard } from './guard/can-use-client.guard';
import { AppKeyGuard } from './guard/app-key.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
   },
   {
    path: 'index.html',
    pathMatch: 'full',
    redirectTo: 'home'
   },
   {
    path: 'login',
    component: LoginComponent
   },
   {
    path: 'home',
    component: HomeComponent
   },
   {
    path: 'metrics',
    component: MetricOverviewComponent,
    canActivate: [CanUseClientGuard, AppKeyGuard]
   },
   {
    path: 'logs',
    component: LogOverviewComponent,
    canActivate: [CanUseClientGuard, AppKeyGuard]
   },
   {
    path: 'detectors',
    component: DetectorOverviewComponent,
    canActivate: [CanUseClientGuard, AppKeyGuard]
   },
   {
    path: 'detector/:id',
    component: DetectorDetailsComponent,
    canActivate: [CanUseClientGuard, AppKeyGuard]
   },
   {
    path: 'detectors/form/:id',
    component: DetectorFormComponent,
    canActivate: [CanUseClientGuard, AppKeyGuard]
   },
   {
    path: 'detectors/form',
    component: DetectorFormComponent,
    canActivate: [CanUseClientGuard, AppKeyGuard]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
