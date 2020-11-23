import { Router } from '@angular/router';
import { AuthService } from './../model/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';

@Component({
  templateUrl : './admin.component.html'
})
export class AdminComponent implements OnInit
{
  user: User;

  constructor(private authService: AuthService,
              private router: Router){}

  ngOnInit(): void{ this.user =  this.user = JSON.parse(localStorage.getItem('user')); }

  logout(): void
  {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
