import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/model/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.user.password = '';
    this.user.newPassword = '';
  }

  onUpdateSubmit(): void {

    // So the user can update info without changing password
    if (this.user.newPassword === '' || this.user.newPassword === null) {
      this.user.newPassword = this.user.password;
    }
    this.authService.updateUser(this.user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Account updated', {cssClass: 'alert-success', timeOut: 6000});
        // this.router.navigate(['/surveys']);
      } else {
        this.flashMessage.show('Error updating account, please try again.', {cssClass: 'alert-danger', timeOut: 6000});
      }
    });
    console.log(this.user);

    localStorage.setItem('user', JSON.stringify(this.user));
    this.user.password = '';
    this.user.newPassword = '';
  }

}
