import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
  TemplateRef, Renderer2, QueryList
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModuleService} from '../../../../services/module.service';
import {SchoolService} from "../../../../services/school.service";
import {File} from "../../../../models/file";
import {Module} from "../../../../models/module";
import {School} from "../../../../models/school";
import {ArrayType} from "@angular/compiler";

@Component({
  selector: 'app-contrat-etude',
  templateUrl: './contrat-etude.component.html',
  styleUrls: ['./contrat-etude.component.css']
})

export class ContratEtudeComponent implements OnInit, AfterViewInit {

  contratForm: FormGroup;
  @Input() module: Module;
  @Input() file: File;
  @ViewChild('togglePrintemps') private elTogglePrintemps;
  @ViewChild('toggleAutomne') private elToggleAutomne;
  isValidated: boolean = false;
  public schoolSelected: School;

  private basicWishes = undefined;
  private basicWishesArray = [];
  private infos;
  private choice1 = {};
  private choice2 = {};
  private choice3 = {};
  private activeTab;
  private sub;
  private sub1;
  private sub2;
  private sub3;

  get f() {
    return this.contratForm.controls;
  }

  setS(activeTab) {
    if (activeTab === 's1' &&
      !this.elToggleAutomne.nativeElement.classList.contains('disabled')) {
      this.activeTab = activeTab;
    } else if (activeTab === 's2' &&
      !this.elTogglePrintemps.nativeElement.classList.contains('disabled')) {
      this.activeTab = activeTab;
    }
  }

  setSchoolSelectedToNull() {
    this.schoolSelected = null;
    this.elTogglePrintemps.nativeElement.style.display = 'none';
    this.elToggleAutomne.nativeElement.style.display = 'none';
    this.schoolService.setSpecificSchool(null);
  }

  constructor(
    private formBuilder: FormBuilder,
    private moduleService: ModuleService,
    private schoolService: SchoolService) {

    this.sub1 = this.schoolService.school1$.subscribe(school => {
      if (Object.keys(this.choice1).length > 0) {
        this.choice1 = Object.assign({}, this.choice1, {
          school: school
        });
        if (school != null) {
          this.basicWishesArray.push(this.choice1);
          this.basicWishesArray.sort((a, b) => a.schoolID - b.schoolID);
          console.log(JSON.stringify(this.basicWishesArray));
        }
      }
    });
    this.sub2 = this.schoolService.school2$.subscribe(school => {
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
    this.sub3 = this.schoolService.school3$.subscribe(school => {
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
    this.sub = this.schoolService.tempSchool$
      .subscribe(school => this.schoolSelected = school);
  }

  selectWish(choice) {
    this.elTogglePrintemps.nativeElement.style.display = 'block';
    this.elToggleAutomne.nativeElement.style.display = 'block';
    let index = this.basicWishesArray.indexOf(choice);
    console.log('index in basicArray => ', index);

    if (choice.semester === 'fall') {
      this.activeTab = 's1';
      this.elToggleAutomne.nativeElement.classList.remove('disabled');
      this.elTogglePrintemps.nativeElement.classList.add('disabled');
    } else if (choice.semester === 'spring') {
      this.activeTab = 's2';
      this.elToggleAutomne.nativeElement.classList.add('disabled');
      this.elTogglePrintemps.nativeElement.classList.remove('disabled');
    } else if (choice.semester === 'full') {
      this.activeTab = 's1';
      this.elToggleAutomne.nativeElement.classList.remove('disabled');
      this.elTogglePrintemps.nativeElement.classList.remove('disabled');
    }
    if (typeof choice.schoolID === 'number') {
      this.schoolService.getSpecificSchoolById(choice.schoolID);
    }
    const tdOfSelectedModule = document.querySelectorAll('.selected');
    tdOfSelectedModule.forEach(td => td.classList.remove('selected'));
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
    this.elTogglePrintemps.nativeElement.style.display = 'none';
    this.elToggleAutomne.nativeElement.style.display = 'none';

    function callBackFn (key, val, elThis){
      console.log('key == ', key, ' val == ', val);
      if (val.schoolID === elThis.schoolSelected.id) {
        elThis.selectWish(val);
      }
    }

    let choiceSelected;
    console.log('--->');
    if (this.schoolSelected) {
      console.log('schoolSelected !');
      /*for (let choice in Object.values(this.basicWishes.infos)) {
        console.log(`in ${choice}: `);
      }*/
      Object.entries(this.basicWishes.infos).forEach(([key, val]) =>
        callBackFn(key, val, this));



      /*for (let obj in Object.entries(this.basicWishes.infos)) {
        console.log('key == ', obj, ' val == ', obj);
      }*/
    }

    /*if (this.schoolSelected) {
      this.elTogglePrintemps.nativeElement.style.display = 'block';
      this.elToggleAutomne.nativeElement.style.display = 'block';
    }*/
    console.log('------');
    console.log('basicWishesArray => ', JSON.stringify(this.basicWishesArray));
    console.log('==> ', this.basicWishesArray[0]);
    console.log('nativeElt => ', this.elToggleAutomne.nativeElement);


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

  ngAfterViewInit() {
    /*console.log('this.elToggleAutomne == ', this.elToggleAutomne);
    console.log('this.basicWishesArray.len ', this.basicWishesArray);
    console.log('this.basicWishesArray.len ', this.basicWishesArray.length);*/
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
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
