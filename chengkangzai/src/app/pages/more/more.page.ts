import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {RoleService} from "../../services/role.service";
import {Subscription} from "rxjs";
import {ActionSheetController, ToastController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-more',
    templateUrl: 'more.page.html',
    styleUrls: ['more.page.scss']
})
export class MorePage implements OnInit, OnDestroy {

    isMaster = false;
    isMasterSub: Subscription;

    constructor(
        private router: Router,
        private authService: AuthService,
        private role: RoleService,
        private actionSheet: ActionSheetController,
        private http: HttpClient,
        private toaster: ToastController
    ) {
    }

    ngOnInit() {
        this.isMasterSub = this.role.isMaster().subscribe(master => {
            this.isMaster = master;
        })

    }

    ngOnDestroy() {
        if (this.isMasterSub) {
            this.isMasterSub.unsubscribe()
        }
    }

    ionViewWillLeave(){
        if (this.isMasterSub) {
            this.isMasterSub.unsubscribe()
        }
    }

    Logout() {
        this.authService.SignOut().then(() => this.router.navigateByUrl('/login'))
    }

    async onSignOut() {
        await this.router.navigateByUrl('/login')
    }

    async send(mode: 'Morning' | 'Night') {
        await this.http.post(
            'https://discord.com/api/webhooks/802604267672305695/AzRsEHTGP01-9PItz_GmLG-dl9x8OwjEH_nLAhstZuimHjderdGdblppZwaMwCntLyRJ',
            {
                username: "Spokesperson",
                embeds: [{title: `Hey My Mightiest Princess ! Good ${mode}`}]
            }, {
                headers: {'Content-Type': 'application/json'}
            }).subscribe()

        const toast = await this.toaster.create({
            message: 'Done !',
            duration: 1500
        })
        return toast.present()
    }
}