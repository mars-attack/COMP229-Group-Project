import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';


const routing = RouterModule.forChild([
  { path: 'login', component: LoginComponent },
  { path: 'main', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: '**', redirectTo: 'surveys' },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' },
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing],
  providers: [AuthGuard],
  declarations: [LoginComponent, AdminComponent, RegisterComponent]
})
export class AdminModule {}
