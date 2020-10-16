import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/core/dist/esm/web-plugins';
import { BehaviorSubject } from 'rxjs';
import {  take } from 'rxjs/operators';
import { holidayModel } from './holidaymodel';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private events=new BehaviorSubject<holidayModel[]>([])
  constructor() { }
  addEventHoliday( eventName:string, startDate:string, endDate:string,reason:string){
    let set =parseInt(startDate.slice(8,10))
    let present=new Date()
    let year = present.setFullYear(parseInt(startDate.slice(0,4)));
    let month = present.setMonth(parseInt(startDate.slice(5,7))-1);
    let Day = present.setDate(set);
    let time =present.setHours(8,0,0,0)
    console.log(present)
    console.log(parseInt(startDate.slice(0,4)))
    console.log(parseInt(startDate.slice(5,7)))
    console.log(parseInt(startDate.slice(8,10)))
    
    // parseInt(startDate.slice(0,4)),parseInt(startDate.slice(5,7)),parseInt(startDate.slice(8,10))

    this.events.asObservable().pipe(take(1)).subscribe(events => this.events.next(events.concat(new holidayModel(eventName,startDate,endDate,reason))))
    console.log(this.events)
    
    async function setNotifications() {
      const notifs = await LocalNotifications.schedule({
        notifications: [
          {
            title: eventName,
            body: "Body",
            id: 1,
            schedule:  {repeats:true,at:present},
            sound: null,
            attachments: null,
            actionTypeId: "",
            extra: null
          }
        ]
      });
      console.log('scheduled notifications', notifs);
    }
   

  }
  
  getEvent(){
    return this.events.asObservable()
  }
}
