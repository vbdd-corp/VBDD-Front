import {Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {first} from 'rxjs/operators';
import {ModuleService} from '../../../services/module.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { File } from '../../../models/file';
import {ModuleType} from '../../../models/moduleType';
import {Module} from '../../../models/module';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-modules-manager',
  templateUrl: './modules-manager.component.html',
  styleUrls: ['./modules-manager.component.css']
})
export class ModulesManagerComponent implements OnInit, OnDestroy {

  @Input() file: File;

  sub: Subscription;

  modules :Module[] = [];
  modalRef: BsModalRef;

  moduleTypes :ModuleType[] = [];
  moduleTypeSelected: ModuleType;

  constructor(private moduleService: ModuleService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.modules = this.file.modules;
    this.sub = this.moduleService.moduleTypes$.subscribe( moduleTypes => {
      this.moduleTypes = moduleTypes;
      this.moduleTypeSelected = moduleTypes[0];
    });
    this.moduleService.getModuleTypes();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  selectModule(event, module: Module) {
    const tdOfSelectedModule = document.querySelectorAll('.selected');
    tdOfSelectedModule.forEach( td => td.classList.remove('selected'));
    event.target.classList.add('selected');
    this.moduleService.setSelectedModule(module);
  }

  deleteModule(moduleId: number) {
    this.moduleService.deleteModule(moduleId);
    this.modules = this.modules.filter( module => module.id != moduleId);
  }

  openModal(template: TemplateRef<any>) {
    if(this.modalRef){ // close last modal if there was one
      this.closeModal();
    }
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  createModule(moduleTypeId: number, name: string) {
    this.moduleService.createModule(this.file.id, moduleTypeId, name).then( module => {
      this.modules.push(module);
      this.moduleService.setSelectedModule(module);
    });
  }

  selectModuleType(moduleType: ModuleType) {
    this.moduleTypeSelected = moduleType;
    //unselect the module
    const tdOfSelectedModule = document.querySelectorAll('.selected');
    tdOfSelectedModule.forEach( td => td.classList.remove('selected'));
    //TODO: select the new module in the list
  }
}
