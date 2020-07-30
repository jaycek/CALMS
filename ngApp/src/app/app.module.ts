import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import {UtilsService} from './utils.service';
import { FooterComponent } from './footer/footer.component';
import { ServicesComponent } from './services/services.component';
import { EbillsubscribeComponent } from './ebillsubscribe/ebillsubscribe.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ServicesHomeComponent } from './services-home/services-home.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { EbillEditComponent } from './ebill-edit/ebill-edit.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import {TokenInterceptorService} from './token-interceptor.service';
import {AuthGuard} from './auth.guard';
import { UsersComponent } from './users/users.component';
import { LabHomeComponent } from './lab-home/lab-home.component';
import { LabEditComponent } from './lab-edit/lab-edit.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ServicesComponent,
    EbillsubscribeComponent,
    LoginComponent,
    ProfileComponent,
    EditProfileComponent,
    ServicesHomeComponent,
    EbillEditComponent,
    TasksComponent,
    TaskDetailComponent,
    UsersComponent,
    LabHomeComponent,
    LabEditComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    YouTubePlayerModule
  ],
  providers: [AuthService,UtilsService,AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
