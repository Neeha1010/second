import { Component } from '@angular/core';
import { LocalNotifications } from '@capacitor/core/dist/esm/web-plugins';
import { AlertController, IonDatetime } from '@ionic/angular';
import { HomeService } from './home.service';
import { homeModel } from './homemodel';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  eventday:string = "sunday";
  dayEvents:homeModel[]
  currentDate:any
  currentHour:any
  currentMin:any
  // newDate = IonDatetime
  
  weekDays=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
 
  day:string

  constructor(private alertController : AlertController,private homeService:HomeService ) {}
  ngOnInit() {
    this.homeService.getEvent(this.weekDays.indexOf(this.eventday)).subscribe(eventsDay => this.dayEvents=eventsDay)
    
    LocalNotifications.requestPermission()
    
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
    
      header: 'Add Event',
      backdropDismiss: false,
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Event Name'
        },
        {
          name: 'name2',
          type: 'text',
          value: this.eventday
        },
        
        // toat have to be set here for min date
        {
          name: 'name3',
          type: 'time',
          placeholder: 'start time',
          
        },
        
        {
          name: 'name4',
          type: 'time',
          placeholder: 'end time'
        },
        
        
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.homeService.addEvent(data.name1,data.name3,data.name4,this.weekDays.indexOf(data.name2))
            console.log(data);
          }
        }
      ]
    });
    await alert.present();
  }
  segmentChanged(eventday: any){
    this.eventday=eventday.detail.value
    this.homeService.getEvent(this.weekDays.indexOf(this.eventday)).subscribe(eventsDay => this.dayEvents=eventsDay)
    console.log(eventday)
  }

}
