import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AutService } from '../services/aut.service';

@Component({
  selector: 'app-imageDialog',
  templateUrl: './imageDialog.component.html',
})
export class ImageDialogComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  image: string;
  constructor(private _dataService: AutService, private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
  
  public getImage(){
    this.image = this._dataService.getImage(this.message);
    return this.image;
  }

}