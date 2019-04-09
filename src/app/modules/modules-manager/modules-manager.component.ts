import {Component, Input, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {ModuleService} from '../../../services/module.service';

@Component({
  selector: 'app-modules-manager',
  templateUrl: './modules-manager.component.html',
  styleUrls: ['./modules-manager.component.css']
})
export class ModulesManagerComponent implements OnInit {
  modules: any;
  @Input() reportType: number;

  constructor(private moduleService: ModuleService) {
  }


  ngOnInit() {
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
      this.modules.push({dossier: parsedModule[i], name: parsedModule[i].name});
    }
  }

}
