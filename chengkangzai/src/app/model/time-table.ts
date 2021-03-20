export class TimeTable {
    constructor(
        public INTAKE: string,
        public MODID: string,
        public DAY: string,
        public LOCATION: string,
        public ROOM: string,
        public LECTID: string,
        public NAME: string,
        public SAMACCOUNTNAME: string,
        public DATESTAMP: string,
        public DATESTAMP_ISO: string,
        public TIME_FROM: string,
        public TIME_TO: string,
        public TIME_FROM_ISO: string,
        public TIME_TO_ISO: string,
        public CLASS_CODE: string,
        public GROUPING: string,
        public COLOR: string,
    ) {
    }
}
