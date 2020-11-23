import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SurveyManagementComponent } from '../survey-library/survey-management/survey-management.component';

// ? Do we need this?

@Injectable()
export class StoreFirstGuard
{
  private firstNavigation = true;

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  {
    if (this.firstNavigation)
    {
      this.firstNavigation = false;
      if (route.component !== SurveyManagementComponent)
      {
        this.router.navigateByUrl('/');
        return false;
      }
    }
    return true;
  }
}
