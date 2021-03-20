import {Component, OnInit} from '@angular/core';
import {UserIntakeDetailService} from '../../services/user-intake-detail.service';
import {UserIntakeGroup} from '../../model/user-intake-group';
import {TimetableService} from '../../services/timetable.service';
import {TimeTable} from '../../model/time-table';
import {Feedback} from '../../model/feedback';
import {IonItemSliding} from '@ionic/angular';

@Component({
    selector: 'app-timetable',
    templateUrl: './timetable.page.html',
    styleUrls: ['./timetable.page.scss'],
})
export class TimetablePage implements OnInit {

    timeTables: TimeTable[];
    isLoading = true;


    constructor(
        private timetableService: TimetableService,
        // private userIntakeDetailService: UserIntakeDetailService
    ) {
    }


    ngOnInit() {
        this.timetableService.userIntakeGroup.subscribe((a) => {
            this.timeTables = a;
        });
        this.timetableService.fetch().then(() => {
            this.isLoading = false;
        });

    }

    testing() {
        this.timeTables.forEach(e => {
            console.log(e);
        });
    }


    async onEdit(f: TimeTable, itemSliding: IonItemSliding) {
        // const alert = await this.alertController.create({
        //     header: 'Edit ' + f.feedback,
        //     message: 'Change the value below and hit the update',
        //     inputs: [{
        //         name: 'feedback',
        //         type: 'text',
        //         placeholder: 'New Feedback',
        //         value: f.feedback,
        //     }],
        //     buttons: [{
        //         text: 'CANCEL',
        //         role: 'cancel'
        //     }, {
        //         text: 'Update',
        //         handler: (input) => {
        //             this.feedbackService.update(f, input.feedback);
        //         }
        //     }]
        // });
        // await alert.present();
        // await itemSliding.close();
    }

    async onShow(f: TimeTable, itemSliding: IonItemSliding) {
        // const alert = await this.alertController.create({
        //     header: 'Show ' + f.feedback,
        //     message: f.feedback,
        //     buttons: [{
        //         text: 'CANCEL',
        //         role: 'cancel'
        //     }],
        // });
        // await alert.present();
        // await itemSliding.close();
    }


    async onDelete(f: TimeTable) {
        // const alert = await this.alertController.create({
        //     message: `are you sure you want to delete Feedback '${f.feedback}' ?`,
        //     header: 'Warning',
        //     buttons: [{
        //         text: 'Nope',
        //         role: 'cancel',
        //     }, {
        //         text: 'I am sure',
        //         handler: () => {
        //             this.feedbackService.delete(f);
        //         }
        //     }]
        // });
        // await alert.present();
    }

}
