import {Timestamp} from '@firebase/firestore-types';
export class Ngrok {
  constructor(
    public id: string,
    public PCName: string,
    public ngrok: string,
    public protocol: string,
    public timestamp: Timestamp,
    public vpn: string
  ) {
  }

}
