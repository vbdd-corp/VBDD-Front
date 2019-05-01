import {Component, Input, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {ModuleService} from '../../../services/module.service';

@Component({
  selector: 'app-modules-manager',
  templateUrl: './modules-manager.component.html',
  styleUrls: ['./modules-manager.component.css']
})
export class ModulesManagerComponent implements OnInit {
  modules = [];
  @Input() report: any;

  constructor(private moduleService: ModuleService) {

  }

  ngOnInit() {
    this.modules = this.report.modules;
  }

  selectModule(event, module: any) {
    const tdOfSelectedModule = document.querySelectorAll('.selected');
    tdOfSelectedModule.forEach( td => td.classList.remove('selected'));
    event.target.classList.add('selected');
    this.moduleService.setSelectedModule(module);
  }
}
