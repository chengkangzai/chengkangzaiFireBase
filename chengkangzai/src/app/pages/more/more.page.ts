import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {RoleService} from '../../services/role.service';
import {Subscription} from 'rxjs';
import {ActionSheetController, ModalController, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {AboutComponent} from '../../components/about/about.component';
import {Network, NetworkStatus} from '@capacitor/core';

@Component({
    selector: 'app-more',
    templateUrl: 'more.page.html',
    styleUrls: ['more.page.scss']
})
export class MorePage implements OnInit, OnDestroy {

    isMaster = false;
    isMasterSub: Subscription;

    isOnline = true;

    constructor(
        private router: Router,
        private authService: AuthService,
        private role: RoleService,
        private actionSheet: ActionSheetController,
        private http: HttpClient,
        private toaster: ToastController,
        private modalController: ModalController,
    ) {
    }

    ngOnInit() {
        this.isMasterSub = this.role.isMaster().subscribe(master => {
            this.isMaster = master;
        });

        Network.addListener('networkStatusChange', (e: NetworkStatus) => {
            this.isOnline = e.connected;
        });
    }

    ngOnDestroy() {
        if (this.isMasterSub) {
            this.isMasterSub.unsubscribe();
        }
    }

    ionViewWillLeave() {
        if (this.isMasterSub) {
            this.isMasterSub.unsubscribe();
        }
    }

    async Logout() {
        const action = await this.actionSheet.create({
            buttons: [{
                text: 'Confirm Log Out',
                role: 'destructive',
                handler: async () => {
                    await this.authService.SignOut().then(() => this.router.navigateByUrl('/login'));
                }
            }, {
                text: 'Cancel',
                role: 'cancel'
            }]
        });
        await action.present();
    }

    async onSignOut() {
        await this.authService.SignOut().then(() => this.router.navigateByUrl('/login'));
    }

    async send(mode: 'Morning' | 'Night') {
        let msg = 'No Network !';
        if (this.isOnline) {
            await this.http.post(
                'https://discord.com/api/webhooks/802604267672305695/AzRsEHTGP01-9PItz_GmLG-dl9x8OwjEH_nLAhstZuimHjderdGdblppZwaMwCntLyRJ',
                {
                    username: 'Spokesperson',
                    embeds: [{title: `Hey My Mightiest Princess ! Good ${mode}`}]
                }, {
                    headers: {'Content-Type': 'application/json'}
                }).subscribe();
            msg = 'Done !';
        }
        const toast = await this.toaster.create({
            message: msg,
            duration: 1500
        });
        return toast.present();
    }

    async about() {
        const modal = await this.modalController.create({
            component: AboutComponent,
        });
        await modal.present();
    }
}
