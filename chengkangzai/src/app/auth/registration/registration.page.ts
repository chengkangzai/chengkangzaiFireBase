import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";


@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {
    form: FormGroup;

    constructor(
        public authService: AuthenticationService,
        public router: Router,
        private alertController: AlertController,
        private loadingController: LoadingController,
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, {
                updateOn: 'change',
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl(null, {
                updateOn: 'change',
                validators: [Validators.required, Validators.minLength(8)]
            })
        })
    }

    async signUp() {

        if (this.form.invalid) {
            const alert = await this.alertController.create({
                header: 'Error',
                message: 'Hey ... This form is invalid la ',
                buttons: [{
                    text: 'Okay',
                    role: 'cancel'
                }]
            })
            return await alert.present();
        }

        const loading = await this.loadingController.create({
            message: 'Hold on... '
        })
        await loading.present();

        this.authService.RegisterUser(this.form.value.email, this.form.value.password)
            .then(async (res) => {
                //TODO
                await this.router.navigateByUrl('/tabs/ngrok');
            })
            .catch(async (error) => {
                const alert = await this.alertController.create({
                    header: 'Error',
                    message: 'Hey ... This form is invalid la ',
                    buttons: [{
                        text: 'Okay',
                        role: 'cancel'
                    }]
                })
                await alert.present();
            }).finally(async () => await loading.dismiss())

    }
}
