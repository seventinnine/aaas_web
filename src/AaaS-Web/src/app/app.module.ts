import { NgModule } from '@angular/core';

// devextreme-angular
import { DxListModule, DxDataGridModule, DxCheckBoxModule, DxSelectBoxModule, DxPopupModule, DxToastModule, DxButtonModule, DxTextBoxModule, DxChartModule, DxAccordionModule, DxFormModule, DxAutocompleteModule } from 'devextreme-angular';

// controllers
import { AppComponent } from './app.component';
import { MetricOverviewComponent } from './controller/metric-overview/metric-overview.component';
import { LogOverviewComponent } from './controller/log-overview/log-overview.component';
import { DetectorOverviewComponent } from './controller/detector-overview/detector-overview.component';
import { DetectorDetailsComponent } from './controller/detector-details/detector-details.component';
import { DetectorListComponent } from './component/detector-list/detector-list.component';
import { LoginComponent } from './component/login/login.component';

// components
import { HomeComponent } from './controller/home/home.component';
import { DetectorDeletionComponent } from './component/detector-deletion/detector-deletion.component';
import { DetectorFormComponent } from './controller/detector-form/detector-form.component';
import { LogListComponent } from './component/log-list/log-list.component';
import { LogSearchComponent } from './component/log-search/log-search.component';
import { MinMaxDetectorDetailsComponent } from './component/details/min-max-detector-details/min-max-detector-details.component';
import { SlidingWindowDetectorDetailsComponent } from './component/details/sliding-window-detector-details/sliding-window-detector-details.component';
import { WebHookActionDetailsComponent } from './component/details/web-hook-action-details/web-hook-action-details.component';
import { MailActionDetailsComponent } from './component/details/mail-action-details/mail-action-details.component';
import { ItemNotFoundComponent } from './component/item-not-found/item-not-found.component';
import { LoadingComponent } from './component/loading/loading.component';
import { AppkeySelectComponent } from './component/appkey-select/appkey-select.component';
import { MinMaxDetectorFormComponent } from './component/form/min-max-detector-form/min-max-detector-form.component';
import { SlidingWindowDetectorFormComponent } from './component/form/sliding-window-detector-form/sliding-window-detector-form.component';
import { WebHookActionFormComponent } from './component/form/web-hook-action-form/web-hook-action-form.component';
import { MailActionFormComponent } from './component/form/mail-action-form/mail-action-form.component';

// imports
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { IntervalToReadableTimePipe } from './pipe/interval-to-readable-time.pipe';
import { WordToComparisonOpPipe } from './pipe/word-to-comparison-op.pipe';

@NgModule({
  declarations: [
    // controllers
    AppComponent,
    MetricOverviewComponent,
    LogOverviewComponent,
    DetectorOverviewComponent,
    DetectorListComponent,
    DetectorDetailsComponent,
    LoginComponent,

    // components
    AppkeySelectComponent,
    HomeComponent,
    MinMaxDetectorDetailsComponent,
    SlidingWindowDetectorDetailsComponent,
    WebHookActionDetailsComponent,
    MailActionDetailsComponent,
    DetectorDeletionComponent,
    DetectorFormComponent,
    LogListComponent,
    LogSearchComponent,
    ItemNotFoundComponent,
    LoadingComponent,
    MinMaxDetectorFormComponent,
    SlidingWindowDetectorFormComponent,
    MailActionFormComponent,
    WebHookActionFormComponent,
    
    // pipes
    IntervalToReadableTimePipe,
    WordToComparisonOpPipe
         
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OAuthModule.forRoot(),
    
    // devextreme-angular
    DxDataGridModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxPopupModule,
    DxToastModule,
    DxButtonModule,
    DxTextBoxModule,
    DxListModule,
    DxChartModule,
    DxAccordionModule,
    DxFormModule,
    DxAutocompleteModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);