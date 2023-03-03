import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  goToMyLocation() {
    console.log('ir mi postiocn')
   }




  constructor(

  ) { }
}
