import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../model/user.model';
import { AuthService } from '../../model/auth.service';


@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit
{
  public user: User;
  public errorMessage: string;

  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void
  {
    this.user = new User();
  }

    authenticate(form: NgForm): void
    {
      if (form.valid)
      {
        // perform authentication

        this.auth.authenticate(this.user).subscribe(data => {
          if (data.success)
          {
            this.auth.storeUserDate(data.token, data.user);
            this.router.navigateByUrl('admin/main');
          }
        });
      }
      else
      {
        // TODO: switch to flash msg.
        this.errorMessage = 'Form Data Invalid';
      }
    }

}
