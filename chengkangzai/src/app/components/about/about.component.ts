import {Component, OnInit} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, IonicModule]
})
export class AboutComponent implements OnInit {
  public version = '0.1.0';

  constructor(
    private modalController: ModalController
  ) {

  }

  ngOnInit() {
  }

  async onClose() {
    await this.modalController.dismiss();
  }


}
