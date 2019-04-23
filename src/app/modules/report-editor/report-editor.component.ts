import {Component, Input, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {ModuleService} from '../../../services/module.service';

@Component({
  selector: 'app-report-editor',
  templateUrl: './report-editor.component.html',
  styleUrls: ['./report-editor.component.css'],
})


export class ReportEditorComponent implements OnInit {

  @Input() reportType: number;
  public componentNameWithClass = [];

  constructor(private moduleService: ModuleService) {
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
    for (const element of parsedModule) {
      this.componentNameWithClass.push(element.id);
    }
  }

  /* ID => COMPOSANT
  [1]   = StudentInformationsComponent;
  [2]   = CniComponent;
  [3]   = PassportComponent;
  [4]   = EuropassComponent;
  [5]   = ReleveNoteComponent;
  [6]   = LettreMotivationComponent;
  [7]   = BudgetPrevisionnelComponent;
  [8]   = ContratEtudiantAsieComponent;
  [9]   = EuropassComponent;
  [10]  = AutorisisationProfesseurComponent;
  [11]  = ErasmusLearningComponent;
  [12]  = EvaluationLinguistiqueComponent;
  [13]  = AssuranceMaladieComponent;
  [14]  = ListeCoursComponent;
  [15]  = LettreRecommandationComponent;
  [16]  = ActeNaissanceComponent;
  [17]  = VoeuxUnivComponent;
   */
}
