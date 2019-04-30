import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {ModuleService} from '../../../services/module.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-report-editor',
  templateUrl: './report-editor.component.html',
  styleUrls: ['./report-editor.component.css'],
})


export class ReportEditorComponent implements OnInit, OnDestroy {

  @Input() report:any;

  module :any;
  subscription: Subscription;

  constructor(private moduleService: ModuleService) {
    this.subscription = this.moduleService.getSelectedModule().subscribe(module => this.module=module);
  }

  ngOnDestroy() {
    //no memory leak
    this.subscription.unsubscribe();
  }

  ngOnInit() {
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
