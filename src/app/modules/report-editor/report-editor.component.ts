import {Component, ComponentFactoryResolver, Input, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {ModuleService} from '../../../services/module.service';
import {CniComponent} from '../list-modules/cni/cni.component';
import {StudentInformationsComponent} from '../../students/student-informations/student-informations.component';
import {PassportComponent} from '../list-modules/passport/passport.component';
import {LettreMotivationComponent} from '../list-modules/lettre-motivation/lettre-motivation.component';
import {ContratEtudiantComponent} from '../list-modules/contrat-etudiant/contrat-etudiant.component';
import {ReleveNoteComponent} from '../list-modules/releve-note-component/releve-note.component';
import {EuropassComponent} from '../list-modules/europass-component/europass.component';
import {BudgetPrevisionnelComponent} from '../list-modules/budget-previsionnel-component/budget-previsionnel.component';


@Component({
  selector: 'app-report-editor',
  templateUrl: './report-editor.component.html',
  styleUrls: ['./report-editor.component.css']
})
export class ReportEditorComponent implements OnInit {

  @Input() reportType: number;
  componentNameWithClass = [];

  constructor(private moduleService: ModuleService, private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.putModulesInDom();
    this.feedComponentArray();
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

  printAppsDynamicly(id: number) {
    this.appendComponentToBody(this.componentNameWithClass[id]);
  }

  appendComponentToBody(component: any) {

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.injectComp.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(componentFactory);

  }

  private addEachModuleToDom(data: string) {
    let parsedModule = JSON.parse(data);

    for (const element of parsedModule) {
      this.printAppsDynamicly(element.id);
    }

  }

  private feedComponentArray() {
    this.componentNameWithClass['1'] = StudentInformationsComponent;
    this.componentNameWithClass['2'] = CniComponent;
    this.componentNameWithClass['3'] = PassportComponent;
    this.componentNameWithClass['4'] = EuropassComponent;
    this.componentNameWithClass['5'] = ReleveNoteComponent;
    this.componentNameWithClass['6'] = LettreMotivationComponent;
    this.componentNameWithClass['7'] = BudgetPrevisionnelComponent;
    this.componentNameWithClass['8'] = ContratEtudiantComponent;

    ///TODO : Pour les autres

    // this.componentNameWithClass[9] = MoveOnlineComponent;
    // this.componentNameWithClass[10] = AutorisisationProfesseurComponent;
    // this.componentNameWithClass[11] = ErasmusLearningComponent;
    // this.componentNameWithClass[12] = EvaluationLinguistiqueComponent;
    // this.componentNameWithClass[13] = AssuranceMaladieComponent;
    // this.componentNameWithClass[14] = ListeCoursComponent;
    // this.componentNameWithClass[15] = LettreRecommandationComponent;
    // this.componentNameWithClass[16] = ActeNaissanceComponent;
    // this.componentNameWithClass[17] = VoeuxUnivComponent;
  }
}
