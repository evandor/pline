import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Message, MessageType } from '../domain/message';
import { PlineLocation } from '../domain/pline-location';
import { User } from '../domain/user';
import { LocationService } from './location-service';

declare var google;

@Injectable()
export class TrackingService {

    locationMatches: Array<PlineLocation> = new Array();
    storage: Storage;

    /*public register(storage: Storage, locationService: LocationService): Observable<Promise<Message>> {
        console.log("Tracking Service initialized...");
        this.storage = storage;

        var ctx = this;
        return Observable.timer(1000, 20000).map((x) => {
            console.log("invocation " + x);
            return new Promise<Message>((resolve, reject) => {
                locationService.getCurrentPlineLocation().then((currentLoc) => {
                    console.log("currentLoc: " + currentLoc.latitude + ", " + currentLoc.longitude);
                    ctx.storage.get('places').then((places) => {
                        if (places == null) {
                            reject("no places defined...");
                        }

                        for (var i = 0; i < places.length; i++) {
                            var pLat = places[i].latitude;
                            var pLong = places[i].longitude;
                            var latDiff = Math.abs(pLat - currentLoc.latitude);
                            var longDiff = Math.abs(pLong - currentLoc.longitude);
                            console.log("");
                            console.log("place #" + i + ", name: " + places[i].placeName + ", Loc: " + pLat + ", " + pLong);
                            //console.log("diff Latitiute: " + latDiff);
                            //console.log("diff longitude: " + longDiff);

                            if (latDiff < 0.1 && longDiff < 0.1) {
                                if (ctx.locationMatches.indexOf(places[i]) > -1) {
                                    console.log("still at place #" + i);
                                } else {
                                    console.log("checking in at place #" + i);
                                    ctx.locationMatches.push(places[i]);
                                    resolve(this.createMessage("checking in at place #" + i));
                                }
                            } else {
                                if (ctx.locationMatches.indexOf(places[i]) > -1) {
                                    console.log("checking out from place #" + i);
                                    ctx.locationMatches.splice(ctx.locationMatches.indexOf(places[i]), 0);
                                    resolve(this.createMessage("checking out from place #" + i));
                                } else {
                                    console.log("still not at place #" + i);
                                }
                            }
                        }
                        reject("no match...");
                    });
                }).catch(() => {
                    reject("problem getting location...");
                });
            });
        });
    }*/


    private createMessage(text: string): Message { //loc: PlineLocation, type: MessageType): Message {
        console.log("creating new message...");
        var msg = new Message();
        msg.text = text;
        msg.timeStamp = new Date().getTime();
        var aUser = new User();
        aUser.userName = "timerUser2";
        msg.user = aUser;
        msg.messageType = MessageType.CHECKIN;
        return msg;
    }
}
