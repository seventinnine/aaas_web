import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { HomeComponent } from './controller/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { MetricOverviewComponent } from './controller/metric-overview/metric-overview.component';
import { LogOverviewComponent } from './controller/log-overview/log-overview.component';
import { DetectorOverviewComponent } from './controller/detector-overview/detector-overview.component';
import { DetectorDetailsComponent } from './controller/detector-details/detector-details.component';

// guards
import { CanUseClientGuard } from './guard/can-use-client.guard';
import { DetectorFormComponent } from './controller/detector-form/detector-form.component';

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
    canActivate: [CanUseClientGuard]
   },
   {
    path: 'logs',
    component: LogOverviewComponent,
    canActivate: [CanUseClientGuard]
   },
   {
    path: 'detectors',
    component: DetectorOverviewComponent,
    canActivate: [CanUseClientGuard]
   },
   {
    path: 'detector/:id',
    component: DetectorDetailsComponent,
    canActivate: [CanUseClientGuard]
   },
   {
    path: 'detectors/form/:id',
    component: DetectorFormComponent,
    canActivate: [CanUseClientGuard]
   },
   {
    path: 'detectors/form',
    component: DetectorFormComponent,
    canActivate: [CanUseClientGuard]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
