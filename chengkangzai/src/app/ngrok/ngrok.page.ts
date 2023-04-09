import {Component} from '@angular/core';
import {AlertController, IonButton, IonicModule, ToastController} from '@ionic/angular';
import {NgrokInterface, NgrokService} from "../services/ngrok.service";
//@ts-ignore
import {Subscription} from 'rxjs';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Ngrok} from "../model/ngrok";
import {CommonModule} from "@angular/common";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {NgxAuthFirebaseUIModule} from "ngx-auth-firebaseui";

@Component({
  selector: 'app-ngrok',
  templateUrl: 'ngrok.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, CommonModule, ClipboardModule, NgxAuthFirebaseUIModule,],
})
export class NgrokPage {

  ngrok: NgrokInterface[] = [];
  ngrokSub: Subscription | undefined;
  isLoading: boolean = true;

  constructor(
    public ngrokService: NgrokService,
    private toaster: ToastController,
    private alertController: AlertController,
    private router: Router,
    private auth: AngularFireAuth,
  ) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.ngrokSub = this.ngrokService.ngrok
      .subscribe((ngrok: NgrokInterface[]) => {
        this.ngrok = ngrok;
      });
    this.ngrokService.fetch().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.ngrokSub) {
      this.ngrokSub.unsubscribe();
    }
  }

  async buttonColor(event: MouseEvent, mode: 'Tunnel' | 'Mstsc' | 'VPN') {
    const button: IonButton = (event.target as unknown as IonButton);
    button.color = button.color === 'primary' ? 'medium' : 'primary';
    button.disabled = button.color === 'primary';
    const toast = await this.toaster.create({
      message: mode + ' has Copied to your clipboard',
      duration: 1000
    });
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
          await this.ngrokService.delete(ngrok);
        }
      }]
    });
    return await alert.present();
  }

  doRefresh(event: any) {
    this.ngrokService.fetch().subscribe(() => {
      event.target.complete();
    });
  }

  async onSignOut() {
    await this.auth.signOut().then(() => this.router.navigateByUrl('/login'));
  }
}
