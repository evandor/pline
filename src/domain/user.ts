
export enum UserStatus {

        REGISTERED =0,
        CONFIRMED=1
        
    }

export class User{
    id: string;
    name: string;
    //registered but not confirmed user means he can add places and sees self-check-ins/outs, 
    //but no invitations can be sent 
    status: UserStatus = UserStatus.REGISTERED;
    email: string;
    self: boolean = false;
    profilePicture:any;
    password:string;
  

    

    constructor (name?: string, email?: string) {
        this.name = name;
        this.email = email;
    }
}