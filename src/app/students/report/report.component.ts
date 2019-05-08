import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {AlertService} from '../../../services';
import {DossierService} from '../../../services/dossier.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {File} from '../../../models/file';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, OnDestroy {


  files: Array<File>;
  sub: Subscription;
  modalRef: BsModalRef;

  // @ViewChild('referenceOrScratchModal') public referenceOrScratchModal: TemplateRef<any>;
  // @ViewChild('referenceList') public referenceList: TemplateRef<any>;

  constructor(private modalService: BsModalService, private dossierService: DossierService, private alertService: AlertService, private router: Router) {
    this.dossierService.getDossiers();
    this.sub = this.dossierService.files$.subscribe( files => this.files = files);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openModal(template: TemplateRef<any>) {
    if (this.modalRef) {
      this.closeModal();
    }
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  createFile(fileTypeId: number) {
    this.dossierService.create(fileTypeId,"nouveau dossier").then( file => {
      this.closeModal();
      this.router.navigate(['reports/edit/', file.id]);
    });
  }

  private deleteReport(id: number) {
    if (confirm("Supprimer le dossier ?")){
      this.dossierService.removeDossier(id);
    }
  }
}
