import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication-service.service";

@Component({
    selector: 'app-more',
    templateUrl: 'more.page.html',
    styleUrls: ['more.page.scss']
})
export class MorePage {

    constructor(
        private router: Router,
        private authService: AuthenticationService,
    ) {
    }

    Logout() {
        this.authService.SignOut().then(() => this.router.navigateByUrl('/login'))
    }
}
