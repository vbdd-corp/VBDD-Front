import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})

export class ModalComponent implements OnInit {

  @Input() toPrint: string;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, public router: Router) {
  }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  redirect(s: string) {
    this.router.navigate([s]);

  }
}

