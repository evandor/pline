
export enum UserStatus {

        REGISTERED =0,
        CONFIRMED=1
        
    }

export class User{

    userName: string;
    //registered but not confirmed user means he can add places and sees self-check-ins/outs, 
    //but no invitations can be sent 
    userStatus: UserStatus = UserStatus.REGISTERED;
    userEmail: string;
    self: boolean = false;
    profilePicture:any;
  

    

    constructor (userName?: string, userEmail?: string) {
        this.userName = userName;
        this.userEmail = userEmail;
    }
}