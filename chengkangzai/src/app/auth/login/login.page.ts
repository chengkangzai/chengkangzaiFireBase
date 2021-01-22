import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    // Check if user is logged in
    form: FormGroup;
    email: string;

    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private alertController: AlertController,
        private loadingController: LoadingController,
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.minLength(8)]
            }),
        });
    }

    async logIn() {
        if (this.form.invalid) {
            const alert = await this.alertController.create({
                header: 'Error',
                message: 'Hey ... This form is invalid la ',
                buttons: [{
                    text: 'Okay',
                    role: 'cancel'
                }]
            });
            return await alert.present();
        }

        const loading = await this.loadingController.create({
            message: 'Hold on... ',
            duration: 50000
        });
        await loading.present();

        this.authService.SignIn(this.form.value.email, this.form.value.password)
            .then(async res => {
                //TODO
                await this.router.navigateByUrl('tabs/ngrok');
            })
            .catch(async error => {
                if (error.code === "auth/user-not-found") {
                    const alert = await this.alertController.create({
                        header: 'Information',
                        message: 'Hi, either you typed a wrong password or you are not registered yet',
                        buttons: [{
                            text: 'Try Again',
                            role: 'cancel',
                        }, {
                            text: 'Register',
                            role: 'button',
                            handler: async () => {
                                await this.router.navigateByUrl('/registration')
                            }
                        }]
                    })
                    await alert.present();
                } else if (error.code === "auth/wrong-password") {
                    const alert = await this.alertController.create({
                        header: 'Information',
                        message: 'Look like you type a wrong password',
                        buttons: [{
                            text: 'Try again',
                            role: 'cancel',
                        }]
                    })
                    await alert.present();
                }

            }).finally(async () => await loading.dismiss())

    }

    async LoginWithGoogle() {
        await this.authService.GoogleAuth()
    }
}
