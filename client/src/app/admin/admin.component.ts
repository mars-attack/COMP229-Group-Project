import { Router } from '@angular/router';
import { AuthService } from './../model/auth.service';
import { Component } from '@angular/core';

@Component({
  templateUrl : './admin.component.html'
})
export class AdminComponent
{
  constructor(private auth: AuthService,
              private router: Router){}

  logout(): void
  {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
