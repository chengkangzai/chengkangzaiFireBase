import {Timestamp} from '@firebase/firestore-types';
export class Feedback {
  constructor(
    public id: string,
    public feedback: string,
    private timestamp: Timestamp,
    private user: string
  ) {
  }
}
