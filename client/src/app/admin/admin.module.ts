import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { UpdateUserComponent } from './update-user/update-user.component';


const routing = RouterModule.forChild([
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'update', component: UpdateUserComponent,  canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'login' },
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing],
  providers: [AuthGuard],
  declarations: [LoginComponent, RegisterComponent, UpdateUserComponent]
})
export class AdminModule {}
