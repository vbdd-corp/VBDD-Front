import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('togglePrintemps')
  private elTogglePrintemps: ElementRef;
  @ViewChild('toggleAutomne')
  private elToggleAutomne: ElementRef;
  isValidated: boolean = false;
  moduleVoeuxUniversites: Module;

  private basicWishes = undefined;
  private basicWishesArray = [];
  private infos;
  private choice1 = {};
  private choice2 = {};
  private choice3 = {};
  private activeTab = 'search';

  get f() {
    return this.contratForm.controls;
  }

  search(activeTab){
    this.activeTab = activeTab;
  }

  result(activeTab){
    this.activeTab = activeTab;
  }

  selectWish(choice) {
    let index = this.basicWishesArray.indexOf(choice);
    console.log('index in basicArray => ', index);
    if (choice.semester === 'fall') {
      this.elToggleAutomne.nativeElement.classList.remove('disabled');
      this.elTogglePrintemps.nativeElement.classList.add('disabled');
    } else if (choice.semester === 'spring') {
      this.elToggleAutomne.nativeElement.classList.add('disabled');
      this.elTogglePrintemps.nativeElement.classList.remove('disabled');
    } else if (choice.semester === 'full') {
      this.elToggleAutomne.nativeElement.classList.remove('disabled');
      this.elTogglePrintemps.nativeElement.classList.remove('disabled');
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private moduleService: ModuleService,
    private schoolService: SchoolService) {

    this.schoolService.school1$.subscribe(school => {
      if (Object.keys(this.choice1).length > 0) {
        this.choice1 = Object.assign({}, this.choice1, {
          school: school
        });
        if (school != null) {
          this.basicWishesArray.push(this.choice1);
          this.basicWishesArray.sort((a, b) => a.schoolID - b.schoolID);
        }
      }
    });

    this.schoolService.school2$.subscribe(school => {
      if (Object.keys(this.choice2).length > 0) {
        this.choice2 = Object.assign({}, this.choice2, {
          school: school
        });
        if (school != null) {
          this.basicWishesArray.push(this.choice2);
          this.basicWishesArray.sort((a, b) => a.schoolID - b.schoolID);
        }
      }
    });

    this.schoolService.school3$.subscribe(school => {
      if (Object.keys(this.choice3).length > 0) {
        this.choice3 = Object.assign({}, this.choice3, {
          school: school
        });
        if (school != null) {
          this.basicWishesArray.push(this.choice3);
          this.basicWishesArray.sort((a, b) => a.schoolID - b.schoolID);
        }
      }
    });
  }

  getListVoeux(file: File) {
    this.basicWishes = file.modules.filter(
      module => module.typeModule.id === 17)[0];
    console.log('basicWishes.infos == ', this.basicWishes.infos);
    this.infos = this.basicWishes.infos;

    for (let choice in this.infos) {
      if (typeof this.infos[choice].schoolID === 'number') {
        this[choice] = this.infos[choice];
        //console.log('BEFORE CALL schoolID == ', this.infos[choice].schoolID);
        this.schoolService.getSchoolById(
          this.infos[choice].schoolID,
          parseInt(choice.split('choice')[1], 10)
        );
      }
    }
  }

  ngOnInit() {
    //faire fonction qui retourne tab vide ou tableau de shool a
    // partir d'un argument de type file
    this.getListVoeux(this.file);

    console.log('basicWishesArray => ', this.basicWishesArray);


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
