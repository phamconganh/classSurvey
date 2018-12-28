import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Permission, loadToken, loadPermission, deleteFromLocal } from "../app.entity";

@Injectable()
export class AdminGuard implements CanActivate {

    Permission = Permission;

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let permission = loadPermission();
        if (loadToken() && permission == Permission.Admin) {
            // logged in so return true
            return true;
        }

        deleteFromLocal();
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
    
}