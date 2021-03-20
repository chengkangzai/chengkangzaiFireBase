import {Injectable} from '@angular/core';
import axios from 'axios';
import {UserIntakeDetail, UserIntakeDetailService} from './user-intake-detail.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {UserIntakeGroup} from '../model/user-intake-group';
import {BehaviorSubject} from 'rxjs';
import {TimeTable} from '../model/time-table';

export interface TimeTableInterface {
    'INTAKE': string;
    'MODID': string;
    'DAY': string;
    'LOCATION': string;
    'ROOM': string;
    'LECTID': string;
    'NAME': string;
    'SAMACCOUNTNAME': string;
    'DATESTAMP': string;
    'DATESTAMP_ISO': string;
    'TIME_FROM': string;
    'TIME_TO': string;
    'TIME_FROM_ISO': string;
    'TIME_TO_ISO': string;
    'CLASS_CODE': string;
    'GROUPING': string;
    'COLOR': string;
}

@Injectable({
    providedIn: 'root'
})
export class TimetableService {

    api = 'https://s3-ap-southeast-1.amazonaws.com/open-ws/weektimetable';

    // tslint:disable-next-line:variable-name
    private _userIntakeGroup = new BehaviorSubject<TimeTable[]>([]);

    get userIntakeGroup() {
        return this._userIntakeGroup.asObservable();
    }

    constructor(
        private user: UserIntakeDetailService,
        private userIntakeDetailService: UserIntakeDetailService
    ) {
    }

    async fetch() {
        const res = await axios.get(this.api);
        this.userIntakeDetailService.fetch().subscribe((userIntake) => {
            const temp: TimeTable[] = [];
            const studentClass = (res.data as TimeTableInterface[]).filter(data => {
                return data.INTAKE === userIntake.intake && data.GROUPING === userIntake.group;
            });
            studentClass.forEach((value) => {
                temp.push(new TimeTable(
                    value.INTAKE, value.MODID, value.DAY, value.LOCATION, value.ROOM,
                    value.LECTID, value.NAME, value.SAMACCOUNTNAME, value.DATESTAMP, value.DATESTAMP_ISO,
                    value.TIME_FROM, value.TIME_TO, value.TIME_FROM_ISO, value.TIME_TO_ISO, value.CLASS_CODE,
                    value.GROUPING, value.COLOR,
                ));
            });
            this._userIntakeGroup.next(temp);
        });

    }
}
