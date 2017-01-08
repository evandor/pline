import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import { Message, MessageType } from '../domain/message';
import { PlineLocation } from '../domain/pline-location';
import { User } from '../domain/user';
import { LocationService } from './location-service';

// push functionality to be moved to service of its own
import { Component } from '@angular/core';
import {
    Push,
    PushToken
} from '@ionic/cloud-angular';

declare var google;

@Injectable()
export class TrackingService {

    locationMatches: Array<PlineLocation> = new Array();
    currentUser = new User();

    constructor(private storage: Storage, private push: Push) {
        console.log("Tracking Service constructor...");
        this.storage.get("users_local").then((users) => {
            if (users == null) {
                return;
            }
            for (var i = 0; i < users.length; i++) {
                if (users[i].self) {
                    this.currentUser.name = users[i].name;
                }
            }
        });
        console.log("Current users set to", this.currentUser);

        // todo: move to "after login()", see http://docs.ionic.io/services/push/ "Registering device tokens"
        this.push.register().then((t: PushToken) => {
            console.log("PUSH", t);
            return this.push.saveToken(t);
        }).then((t: PushToken) => {
            console.log('Token saved:', t.token);
        });

        this.push.rx.notification()
            .subscribe((msg) => {
                alert(msg.title + ': ' + msg.text);
            });
    }

    public register(storage: Storage, locationService: LocationService): Observable<Promise<Message>> {
        console.log("Tracking Service initialized...");
        this.storage = storage;

        var ctx = this;
        return Observable.timer(1000, 300000).map((x) => {
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
                            console.log("place #" + i + ", name: " + places[i].name + ", Loc: " + pLat + ", " + pLong);

                            if (latDiff < 0.1 && longDiff < 0.1) {
                                if (ctx.locationMatches.indexOf(places[i]) > -1) {
                                    console.log("still at place #" + i);
                                    //resolve(this.createMessage(places[i], MessageType.STILL_AT));
                                } else {
                                    console.log("checking in at place #" + i);
                                    ctx.locationMatches.push(places[i]);
                                    resolve(this.createMessage(places[i], MessageType.CHECKIN));
                                }
                            } else {
                                if (ctx.locationMatches.indexOf(places[i]) > -1) {
                                    console.log("checking out from place #" + i);
                                    ctx.locationMatches.splice(ctx.locationMatches.indexOf(places[i]), 0);
                                    resolve(this.createMessage(places[i], MessageType.CHECKOUT));
                                } else {
                                    console.log("still not at place #" + i);
                                    //resolve(this.createMessage(places[i], MessageType.NOT_AT));
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
    }

    private createMessage(location: PlineLocation, type: MessageType): Message {
        var msg = new Message();
        msg.timeStamp = Math.round(new Date().getTime() / 1000);
        msg.user = this.currentUser;
        msg.messageType = type;
        msg.location = location;
        return msg;
    }
}
