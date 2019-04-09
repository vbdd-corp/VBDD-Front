import {Component, Input, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {ModuleService} from '../../../services/module.service';
import {DossierService} from '../../../services/dossier.service';
import {AlertService} from '../../../services';

@Component({
  selector: 'app-modules-manager',
  templateUrl: './modules-manager.component.html',
  styleUrls: ['./modules-manager.component.css']
})
export class ModulesManagerComponent implements OnInit {
  modules = [];
  @Input() reportType: number;

  constructor(private moduleService: ModuleService, private dossierService: DossierService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.putModulesInDom();
  }

  putModulesInDom() {
    this.moduleService.getModules(this.reportType)
      .pipe(first())
      .subscribe(
        data => {
          this.addEachModuleToDom(JSON.stringify(data));
        },
        error => {
          alert(error.error.error);
        });
  }

  private addEachModuleToDom(data: string) {
    let parsedModule = JSON.parse(data);
    for (let i in parsedModule) {
      this.modules.push({module: parsedModule[i]});
    }
  }


  deleteReport(id: number) {
    this.dossierService.removeDossier(id)
      .pipe(first())
      .subscribe(
        data => {

        },
        error => {
          this.alertService.error(error.error.error);
        });
  }
}
