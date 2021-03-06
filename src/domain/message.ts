import { PlineLocation } from './pline-location';
import { User } from './user';

  export enum MessageType {

        CHECKIN=0,
        CHECKOUT=1,
        STILL_AT=2,
        NOT_AT=3
    }

export class Message {
    timeStamp: number; // Unix timestamp in seconds
    location: PlineLocation;
    user: User;
    messageType: MessageType;


}