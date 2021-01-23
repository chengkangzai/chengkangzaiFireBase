import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {RoleService} from "../../services/role.service";

@Component({
    selector: 'app-more',
    templateUrl: 'more.page.html',
    styleUrls: ['more.page.scss']
})
export class MorePage {

    constructor(
        private router: Router,
        private authService: AuthService,
        public role:RoleService
    ) {
    }

    Logout() {
        this.authService.SignOut().then(() => this.router.navigateByUrl('/login'))
    }

    async onSignOut(){
        await this.router.navigateByUrl('/login')
    }
}
