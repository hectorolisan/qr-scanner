import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public scannedCode: string = '';
  public isScanning: boolean = false;

  constructor(private toastCtrl: ToastController) {}

  ngOnInit() {}

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
    });
    await toast.present();
  }

  async qrScan(): Promise<any> {
    const status = await BarcodeScanner.checkPermission();

    if (status.denied) {
      this.showToast(
        'Por favor, otorga los permisos en la configuración del sistema',
        'danger'
      );
      return;
    }

    this.isScanning = true;

    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      this.scannedCode = result.content;

      this.qrStop();
    }
  }

  async qrStop() {
    this.isScanning = false;
    BarcodeScanner.stopScan();
  }

  ionViewWillLeave() {
    if (this.isScanning) {
      this.qrStop();
    }
  }
}
