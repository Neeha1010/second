import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { homeModel } from './homemodel';
import {  map, take } from 'rxjs/operators';
import { LocalNotifications } from '@capacitor/core/dist/esm/web/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }
  private events=new BehaviorSubject<homeModel[]>([])
  addEvent( eventName:string, starttime:string, endtime:string, day:number){
    let present = new Date();
    let year = present.getFullYear();
    let hour = parseInt(starttime.slice(0,2));
    let min= parseInt(starttime.slice(3,5));
let Day = present.getDate();
let d1 = present.getDay();

if (! (day === d1)){
var dif = day-d1;
if (dif<0){
  present.setDate(Day+7+dif);

}else{
  present.setDate(Day+dif);
}
}
if(day==d1){
  if (hour<present.getHours()){
    present.setDate(Day+7);
    console.log('set hour')
  }else{
    console.log('set hourdd')

    if (hour==present.getHours()){
      // console.log('hours equal')
      // console.log('hours equal'+min)
      // console.log('it is '+ present.getMinutes()) 
      if (min<present.getMinutes()){
        present.setDate(Day+7);
        console.log('set minute')
      }
    }

  }
}
present.setHours(hour,min,0);

// let time1 = new Date(year, month, setDate, parseInt(starttime.slice(0,2)), parseInt(starttime.slice(3,5)), 0, 0);

    this.events.asObservable().pipe(take(1)).subscribe(events => this.events.next(events.concat(new homeModel(eventName,starttime,endtime,day))))
    
    let count=0;
    async function setNotifications(at1:any) {
      count=count+1
      const notifs = await LocalNotifications.schedule({
        notifications: [
          {
            title: eventName,
            body: 'u have one reminder',
            id: new Date().getTime(),
            schedule: {repeats:true,every:'week',at:at1},
            sound: null,
            attachments: null,
            actionTypeId: "",
            extra: null
          }
        ]
      });
      console.log('scheduled notifications', notifs);
      console.log(present)
       let Day1:number =at1.getDate() 
         Day1=Day1+7
       if (count===14){return}
        present.setDate(Day1)
        setNotifications(present)
      
    }
    setNotifications(present);
    
    
}
  getEvent(day:number){
    return this.events.asObservable().pipe(map(events => events.filter(p => p.day===day)))
  }
  
}
