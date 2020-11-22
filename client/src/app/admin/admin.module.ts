import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CommonModule } from '@angular/common';


const routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
  { path: 'main', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: '**', redirectTo: 'surveys' },
    ]
  },
  { path: '**', redirectTo: 'auth' },
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing],
  providers: [AuthGuard],
  declarations: [AuthComponent, AdminComponent]
})
export class AdminModule {}
