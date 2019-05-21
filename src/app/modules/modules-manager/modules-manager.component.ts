import {Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ModuleService} from '../../../services/module.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {File} from '../../../models/file';
import {ModuleType} from '../../../models/moduleType';
import {Module} from '../../../models/module';
import {Subscription} from 'rxjs';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    // $(this).find('#mainTable > td').each (function( column, td) {
    //
    //   alert($(td));
    // });
    //
    //
    // @ts-ignore
    window.html2canvas = html2canvas;

    html2canvas(document.getElementById('app-voeux-universite'), {
      onrendered: function(canvas) {

        var imgData = canvas.toDataURL('image/png');
        console.log('Report Image URL: ' + imgData);
        var doc = new jsPDF('p', 'mm', [297, 210]);
        doc.addImage(imgData, 'PNG', 10, 10);
        doc.save('sample.pdf');
      }
    });


  }
}
