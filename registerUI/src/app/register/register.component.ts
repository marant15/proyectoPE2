import { Component, OnInit } from '@angular/core';
import { AutService } from '../services/aut.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   // toggle webcam on/off
   public showWebcam = true;
   public allowCameraSwitch = true;
   public multipleWebcamsAvailable = false;
   public deviceId: string;
   public videoOptions: MediaTrackConstraints = {
     // width: {ideal: 1024},
     // height: {ideal: 576}
   };
   public errors: WebcamInitError[] = [];
 
   // latest snapshot
   public webcamImage: WebcamImage = null;
 
   // webcam snapshot trigger
   private trigger: Subject<void> = new Subject<void>();
   // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
   private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  constructor(private _autService: AutService,) { }

  ngOnInit() {
    localStorage.removeItem('token');
    localStorage.removeItem('codigo');
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        console.log(mediaDevices);
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  register(username:string, password:string){
    var date = new Date();
    var mi = date.getUTCMonth() + 1; //months from 1-12
    var di = date.getUTCDate();
    var yi = date.getUTCFullYear();
    var datei = yi + "-" + mi + "-" + di;
    var houri = date.getHours();
    var mini = date.getUTCMinutes();
    var segi = date.getUTCSeconds();
    var ihour = houri+":"+mini+":"+segi;
    this.triggerSnapshot();
    this._autService.entry(username,password,datei,ihour,this.webcamImage.imageAsBase64);
  }
  
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

}
