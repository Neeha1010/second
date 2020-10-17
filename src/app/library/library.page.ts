import { Component, OnInit } from '@angular/core';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';


@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  constructor(private previewAnyFile: PreviewAnyFile) { }

  ngOnInit() {
  }
  previewSheets(){
    var url="https://docs.google.com/spreadsheets/d/1h6kBV8cdLmmHEnlAjk6v4nSPPYu-Cag2EQnim6cfyXc/edit?usp=drivesdk"
    this.previewAnyFile.preview(url)
  .then((res: any) => console.log(res))
  .catch((error: any) => console.error(error));

  }

}
