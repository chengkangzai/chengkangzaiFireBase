import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgrokInterface, NgrokService} from "../../services/ngrok.service";
import {Subscription} from "rxjs";
import {AlertController, IonButton, ToastController} from "@ionic/angular";
import {Ngrok} from "../../model/ngrok";
import {Router} from "@angular/router";

@Component({
    selector: 'app-ngrok',
    templateUrl: 'ngrok.page.html',
    styleUrls: ['ngrok.page.scss']
})
export class NgrokPage implements OnInit, OnDestroy {

    ngrok: NgrokInterface[] = [];
    ngrokSub: Subscription;
    isLoading = true;

    constructor(
        public ngrokService: NgrokService,
        private toaster: ToastController,
        private alertController: AlertController,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.isLoading = true
        this.ngrokSub = this.ngrokService.ngrok
            .subscribe((ngrok) => {
                this.ngrok = ngrok;
            })
        this.ngrokService.fetch().subscribe(() => {
            this.isLoading = false;
        });
    }

    ngOnDestroy() {
        if (this.ngrokSub) {
            this.ngrokSub.unsubscribe();
        }
    }

    test() {
        console.log(this.ngrok)
    }

    async buttonColor(event: MouseEvent, mode: 'Tunnel' | 'Mstsc' | 'VPN') {
        const button = (<IonButton><unknown>event.target);
        button.color = button.color === 'primary' ? 'medium' : 'primary';
        const toast = await this.toaster.create({
            message: mode + ' has Copied to your clipboard',
            duration: 1000
        })
        return await toast.present();
    }

    async delete(ngrok: Ngrok) {
        const alert = await this.alertController.create({
            header: 'Are you sure you want to delete ' + ngrok.PCName + ' ?',
            buttons: [{
                text: 'Nope',
                role: 'cancel'
            }, {
                text: 'Yes',
                handler: async () => {
                    await this.ngrokService.delete(ngrok)
                }
            }]
        })
        return await alert.present();
    }

    doRefresh(event) {
        this.ngrokService.fetch().subscribe(() => {
            event.target.complete();
        });
    }

    async onSignOut() {
        await this.router.navigateByUrl('/login')
    }
}
