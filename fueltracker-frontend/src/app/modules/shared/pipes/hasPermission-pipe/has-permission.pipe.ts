import { LoginService } from './../../../login/login.service';
import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';

@Pipe({
  name: 'hasPermission'
})

export class HasPermissionPipe implements PipeTransform {

  constructor(
    private loginService: LoginService,
    private store: Store
  ) {}

  transform(roles: string[]): any {
   /*  const user = this.store.selectSnapshot(LoginState.loggedUser);
    const hasPermission = this.loginService.hasPermission(user, roles);
    return hasPermission; */
  }
}
