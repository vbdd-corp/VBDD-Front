import {Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ModuleService} from '../../../services/module.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {File} from '../../../models/file';
import {ModuleType} from '../../../models/moduleType';
import {Module} from '../../../models/module';
import {Subscription} from 'rxjs';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as $ from 'jquery';

@Component({
  selector: 'app-modules-manager',
  templateUrl: './modules-manager.component.html',
  styleUrls: ['./modules-manager.component.css']
})
export class ModulesManagerComponent implements OnInit, OnDestroy {

  @Input() file: File;

  sub: Subscription;
  sub1: Subscription;

  modules: Module[] = [];
  modalRef: BsModalRef;

  moduleTypes: ModuleType[] = [];
  moduleTypeSelected: ModuleType;

  constructor(private moduleService: ModuleService, private modalService: BsModalService) {
    this.sub1 = this.moduleService.getSelectedModule().subscribe(selectedModule => {
      this.modules.forEach((module, index) => {
        if (module.id === selectedModule.id) {
          this.modules[index] = selectedModule;
        }
      });
    });
  }

  ngOnInit() {
    this.modules = this.file.modules;
    this.sub = this.moduleService.moduleTypes$.subscribe(moduleTypes => {
      this.moduleTypes = moduleTypes;
      this.moduleTypeSelected = moduleTypes[0];
    });
    this.moduleService.getModuleTypes();


  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }

  selectModule(event, module: Module) {
    const tdOfSelectedModule = document.querySelectorAll('.selected');
    tdOfSelectedModule.forEach(td => td.classList.remove('selected'));
    event.target.classList.add('selected');
    this.moduleService.setSelectedModule(module);
  }

  deleteModule(moduleId: number) {
    if (confirm('Supprimer le module ?')) {
      this.moduleService.deleteModule(moduleId);
      this.modules = this.modules.filter(module => module.id != moduleId);
    }
  }

  openModal(template: TemplateRef<any>) {
    if (this.modalRef) { // close last modal if there was one
      this.closeModal();
    }
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  createModule(moduleTypeId: number, name: string) {
    this.moduleService.createModule(this.file.id, moduleTypeId, name).then(module => {
      this.modules.push(module);
      this.moduleService.setSelectedModule(module);
    });
  }

  selectModuleType(moduleType: ModuleType) {
    this.moduleTypeSelected = moduleType;
    const tdOfSelectedModule = document.querySelectorAll('.selected');
    tdOfSelectedModule.forEach(td => td.classList.remove('selected'));
  }

  downloadReport() {

    // @ts-ignore

    window.html2canvas = html2canvas;

    var doc = new jsPDF('l');
    this.generatePDF(doc).then(function() {
      doc.deletePage(doc.internal.getNumberOfPages());
      doc.save('dossier' + Math.floor(Math.random() * Math.floor(999)) + '.pdf');
    });

  }

  private generatePDF(doc,) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < $('#tableDossiers tr td').length; i++) {
          this.click($('#tableDossiers tr td')).then(go => {
            html2canvas($('#MODULE')[0]).then(canvas => {
              doc.addImage(canvas.toDataURL('image/jpeg', 5.0), 'JPEG', 10, doc.internal.pageSize.getHeight() / 3.5);
              doc.addPage();
            });
          });
        }
      }
    );
  }

  private click(doc) {
    return new Promise((resolve, reject) => {
      doc.click();
    });
  }

  moduleAdditionalName(module: Module) {
    let name = "";
    if(module.typeModule.id === 8){ //if contrat d'étude
      if(module.infos.choice.school != null)
        name = "- "+module.infos.choice.school.name;
    }
    return name;
  }
  //TODO: la selection des voeux deja enregistré dans contrat d'étude ne fonctionne pas
  //TODO: lorsqu'on enregistre un nouveau voeux dans le contrat -> ne met pas a jour son nom
}
