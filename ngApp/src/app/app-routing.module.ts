import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import {ServicesComponent} from './services/services.component';
import { EbillsubscribeComponent } from './ebillsubscribe/ebillsubscribe.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ServicesHomeComponent } from './services-home/services-home.component';
import { EbillEditComponent } from './ebill-edit/ebill-edit.component';
import { TasksComponent } from './tasks/tasks.component';
import {TaskDetailComponent} from './task-detail/task-detail.component';
import {AuthGuard} from './auth.guard';
import { UsersComponent } from './users/users.component';
import { LabHomeComponent } from './lab-home/lab-home.component';
import { LabEditComponent } from './lab-edit/lab-edit.component';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [ 
    {path:"",component:HomeComponent},
    {path:"register",component:RegisterComponent},
    {path:"login",component:LoginComponent},
    {path:"serviceshome/ebillsubscribe",component:EbillsubscribeComponent,canActivate:[AuthGuard]},
    {path:"profile",component:ProfileComponent,canActivate:[AuthGuard]},
    {path:'editprofile',component:EditProfileComponent,canActivate:[AuthGuard]},
    {path:'serviceshome',component:ServicesHomeComponent,canActivate:[AuthGuard]},
    {path:'ebilledit',component:EbillEditComponent,canActivate:[AuthGuard]},
    {path:'tasks',component:TasksComponent,canActivate:[AuthGuard]},
    {path:'taskdetail/:id',component:TaskDetailComponent,canActivate:[AuthGuard]},
    {path:'users',component:UsersComponent,canActivate:[AuthGuard]},
    {path:'serviceshome/labsubscribe',component:LabHomeComponent,canActivate:[AuthGuard]},
    {path:'labedit',component:LabEditComponent,canActivate:[AuthGuard]},
    {path:'payment',component:PaymentComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
