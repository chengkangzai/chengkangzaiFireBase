import {Component, OnInit} from '@angular/core';
import {TimetableService} from '../../services/timetable.service';
import {TimeTable} from '../../model/time-table';

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

    async onShow(f: TimeTable) {
        // TODO
        // Show Complete Detail
    }

}
