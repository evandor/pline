import { PlineLocation } from './pline-location';
import { User } from './user';

  export enum MessageType {

        CHECKIN=0,
        CHECKOUT=1
        
    }

export class Message {
    text: string = "hallo";
    timeStamp: number; // Unix timestamp in seconds
    location: PlineLocation;
    user: User;
    messageType: MessageType;


}