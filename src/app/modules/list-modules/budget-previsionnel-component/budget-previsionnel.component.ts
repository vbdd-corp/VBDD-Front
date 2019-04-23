import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ReportCreatorService} from '../../../../services/report-creator.service';

@Component({
  selector: 'app-budget-previsionnel-component',
  templateUrl: './budget-previsionnel.component.html',
  styleUrls: ['./budget-previsionnel.component.css']
})
export class BudgetPrevisionnelComponent implements OnInit {

  budgetForm: FormGroup;
  moduleId: number;

  constructor(private formBuilder: FormBuilder, private creatorSerive: ReportCreatorService) {
  }

  get f() {
    return this.budgetForm.controls;
  }

  ngOnInit() {
    this.budgetForm = this.formBuilder.group({
      paysEnvisage: ['', Validators.required],
      villesEnvisagees: ['', Validators.required],
      dureeEnvisagee: ['', Validators.required],
      prixVoyage: ['', Validators.required],
      prixLogement: ['', Validators.required],
      prixNourriture: ['', Validators.required],
      prixTransports: ['', Validators.required],
      prixEtudes: ['', Validators.required],
      prixDepenses: ['', Validators.required],
      prixPrame: ['', Validators.required],
      prixEte: ['', Validators.required],
      prixEconomies: ['', Validators.required],
      aideFamiliale: ['', Validators.required],
      prixAutre: ['', Validators.required],
      prixBourse: ['', Validators.required]
    });
  }

  onSubmit() {


    //TODO : REMPLACER 7 PAR moduleId (bonne chance lel)
    this.creatorSerive.updateModule(7, ({
      country: this.f.paysEnvisage.value,
      city: this.f.villesEnvisagees.value,
      stayDuration: this.f.dureeEnvisagee.value,
      travelCost: this.f.prixVoyage.value,
      accommodationCost: this.f.prixLogement.value,
      foodCost: this.f.prixNourriture.value,
      transportationHobbiesCost: this.f.prixTransports.value,
      studyCost: this.f.prixEtudes.value,
      othersCost: this.f.prixDepenses.value,
      frenchCROUSScholarship: this.f.prixBourse.value,
      mobilityScholarship: this.f.prixPrame.value,
      travelHelp: this.f.prixPrame.value,
      summerJobSalaries: this.f.prixEte.value,
      personalResources: this.f.prixEconomies.value,
      familyResources: this.f.aideFamiliale.value,
      othersResources: this.f.prixAutre.value,
      notes: '' //defek is dis ?
    }))
      .pipe(first())
      .subscribe();

  }
}
