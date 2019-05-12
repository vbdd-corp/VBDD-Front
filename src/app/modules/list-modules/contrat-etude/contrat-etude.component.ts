import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModuleService} from '../../../../services/module.service';
import {SchoolService} from "../../../../services/school.service";
import {File} from "../../../../models/file";
import {Module} from "../../../../models/module";

@Component({
  selector: 'app-contrat-etude',
  templateUrl: './contrat-etude.component.html',
  styleUrls: ['./contrat-etude.component.css']
})

export class ContratEtudeComponent implements OnInit {

  contratForm: FormGroup;
  @Input() module: Module;
  @Input() file: File;
  isValidated: boolean = false;
  moduleVoeuxUniversites: Module;

  constructor(
    private formBuilder: FormBuilder,
    private moduleService: ModuleService,
    private schoolService: SchoolService) {
  }

  get f() {
    return this.contratForm.controls;
  }

  attachSchool = async (choiceObject) => {
    //console.log('choice object == ', choiceObject);
    //console.log('choiceObject.id == ', choiceObject.schoolID);


    this.schoolService.school$.subscribe(school => {
      choiceObject = Object.assign({}, choiceObject, {
        school: school
      });
      console.log('choiceObject == ', choiceObject);
    });
    await this.schoolService.getSchoolById(choiceObject.schoolID);
  };

  async getListVoeux(file: File) {
    let basicWishes = file.modules.filter(
      module => module.typeModule.id === 17)[0];
    basicWishes = Object.assign({}, basicWishes, {});
    console.log('basicWishes == ', basicWishes);
    console.log('basicWishes.infos == ', basicWishes.infos);

    let infos = basicWishes.infos;
    for (let choice in infos) {
      //console.log('choice == ', infos[choice]);
      if (infos[choice].schoolID !== null && infos[choice].schoolID !== undefined) {
        await this.attachSchool(infos[choice]);
        console.log('choice  after attach == ', infos[choice]);
      }
    }

    return basicWishes;
  }

  ngOnInit() {
    //faire fonction qui retourne tab vide ou tableau de shool a partir d'un argument de type file
    //this.moduleVoeuxUniversites = this.getListVoeux(this.file);

    console.log('this.moduleVoeuxUniversites == ', this.moduleVoeuxUniversites);

    this.contratForm = this.formBuilder.group({
      codeCours1: ['', Validators.required],
      codeCours2: ['', Validators.required],
      codeCours3: ['', Validators.required],
      codeCours4: ['', Validators.required],
      codeCours5: ['', Validators.required],
      codeCours6: ['', Validators.required],
      codeCours7: ['', Validators.required],
      codeCours8: ['', Validators.required],
      codeCours9: ['', Validators.required],
      codeCours10: ['', Validators.required],
      codeCours11: ['', Validators.required],
      codeCours12: ['', Validators.required],
      titreCours1: ['', Validators.required],
      titreCours2: ['', Validators.required],
      titreCours3: ['', Validators.required],
      titreCours4: ['', Validators.required],
      titreCours5: ['', Validators.required],
      titreCours6: ['', Validators.required],
      titreCours7: ['', Validators.required],
      titreCours8: ['', Validators.required],
      titreCours9: ['', Validators.required],
      titreCours10: ['', Validators.required],
      titreCours11: ['', Validators.required],
      titreCours12: ['', Validators.required],
      nombreCredits1: ['', Validators.required],
      nombreCredits2: ['', Validators.required],
      nombreCredits3: ['', Validators.required],
      nombreCredits4: ['', Validators.required],
      nombreCredits5: ['', Validators.required],
      nombreCredits6: ['', Validators.required],
      nombreCredits7: ['', Validators.required],
      nombreCredits8: ['', Validators.required],
      nombreCredits9: ['', Validators.required],
      nombreCredits10: ['', Validators.required],
      nombreCredits11: ['', Validators.required],
      nombreCredits12: ['', Validators.required],
    });
  }

  private getContratValues() {
    return {
      codeCours1: this.f.codeCours1.value,
      codeCours2: this.f.codeCours2.value,
      codeCours3: this.f.codeCours3.value,
      codeCours4: this.f.codeCours4.value,
      codeCours5: this.f.codeCours5.value,
      codeCours6: this.f.codeCours6.value,
      codeCours7: this.f.codeCours7.value,
      codeCours8: this.f.codeCours8.value,
      codeCours9: this.f.codeCours9.value,
      codeCours10: this.f.codeCours10.value,
      codeCours11: this.f.codeCours11.value,
      codeCours12: this.f.codeCours12.value,
      titreCours1: this.f.titreCours1.value,
      titreCours2: this.f.titreCours2.value,
      titreCours3: this.f.titreCours3.value,
      titreCours4: this.f.titreCours4.value,
      titreCours5: this.f.titreCours5.value,
      titreCours6: this.f.titreCours6.value,
      titreCours7: this.f.titreCours7.value,
      titreCours8: this.f.titreCours8.value,
      titreCours9: this.f.titreCours9.value,
      titreCours10: this.f.titreCours10.value,
      titreCours11: this.f.titreCours11.value,
      titreCours12: this.f.titreCours12.value,
      nombreCredits1: this.f.nombreCredits1.value,
      nombreCredits2: this.f.nombreCredits2.value,
      nombreCredits3: this.f.nombreCredits3.value,
      nombreCredits4: this.f.nombreCredits4.value,
      nombreCredits5: this.f.nombreCredits5.value,
      nombreCredits6: this.f.nombreCredits6.value,
      nombreCredits7: this.f.nombreCredits7.value,
      nombreCredits8: this.f.nombreCredits8.value,
      nombreCredits9: this.f.nombreCredits9.value,
      nombreCredits10: this.f.nombreCredits10.value,
      nombreCredits11: this.f.nombreCredits11.value,
      nombreCredits12: this.f.nombreCredits12.value,
    };
  }

  onSubmit() {
    console.log('this.module.id == ', this.module.id);
    console.log('infos == ', this.getContratValues());
    // this.moduleService.updateModule(this.module.id, this.getContratValues());

    this.isValidated = true;
  }


}
