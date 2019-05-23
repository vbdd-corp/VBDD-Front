import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
  TemplateRef, Renderer2, QueryList, ChangeDetectorRef
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
  @ViewChild('totalECTSS2') private elTotalECTSS2;
  @ViewChild('totalECTSS1') private elTotalECTSS1;
  isValidated: boolean = false;
  public schoolSelected: School;

  private basicWishes = undefined;
  private basicWishesArray = [];
  private selectedWish;
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
    this.setAllInputToNull();
    this.schoolSelected = null;
    this.selectedWish = null;
    this.elTogglePrintemps.nativeElement.style.display = 'none';
    this.elToggleAutomne.nativeElement.style.display = 'none';
    this.schoolService.setSpecificSchool(null);
  }

  setAllInputToNull() {
    for (let i = 1; i <= 12; i++) {
      this.contratForm.get('s1codeCours' + i).setValue('');
      this.contratForm.get('s2codeCours' + i).setValue('');
    }
    for (let i = 1; i <= 12; i++) {
      this.contratForm.controls['s1titreCours' + i].setValue('');
      this.contratForm.controls['s2titreCours' + i].setValue('');
    }
    for (let i = 1; i <= 12; i++) {
      this.contratForm.controls['s1nombreCredits' + i].setValue('');
      this.contratForm.controls['s2nombreCredits' + i].setValue('');
    }
  }

  selectWish(choice) {
    /*if (setInputToNull)
      this.setAllInputToNull();*/
    if (typeof choice.schoolID === 'number') {
      this.schoolService.getSpecificSchoolById(choice.schoolID);
    }
    if (choice.semester === 'fall') {
      this.activeTab = 's1';
    } else if (choice.semester === 'spring') {
      this.activeTab = 's2';
    } else if (choice.semester === 'full') {
      this.activeTab = 's1';
    }

    this.selectedWish = choice;
    let index = this.basicWishesArray.indexOf(choice);
    console.log('index in basicArray => ', index);

    if (this.elToggleAutomne && this.elTogglePrintemps) {
      this.elTogglePrintemps.nativeElement.style.display = 'block';
      this.elToggleAutomne.nativeElement.style.display = 'block';

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

    const tdOfSelectedModule = document.querySelectorAll('.selected');
    tdOfSelectedModule.forEach(td => td.classList.remove('selected'));
  }

  updateTotalECTS(semester) {
    let sum = 0;
    let val;
    for (let i = 1; i <= 12; i++) {
      val = parseInt(
        this.f[semester + 'nombreCredits' + i].value,
        10);
      if (!isNaN(val))
        sum += val;
    }
    if (semester === 's1')
      this.elTotalECTSS1.nativeElement.textContent = 'Total ECTS :   ' + sum;
    else if (semester === 's2')
      this.elTotalECTSS2.nativeElement.textContent = 'Total ECTS :   ' + sum;
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
          //console.log(JSON.stringify(this.basicWishesArray));
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

  getListVoeux(file: File) {
    this.basicWishes = file.modules.filter(
      module => module.typeModule.id === 17)[0];
    //console.log('basicWishes.infos == ', this.basicWishes.infos);
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

  detectSchoolAlreadyUsed(file: File){
    let contratEtudeList = file.modules.filter(
      module => module.typeModule.id === 8);
    console.log(contratEtudeList);
  }

  ngOnInit() {
    console.log('this.module == ', this.module);
    if (this.elTogglePrintemps)
      this.elTogglePrintemps.nativeElement.style.display = 'none';
    if (this.elToggleAutomne)
      this.elToggleAutomne.nativeElement.style.display = 'none';

    //faire fonction qui retourne tab vide ou tableau de school a
    // partir d'un argument de type file
    this.getListVoeux(this.file);
    this.detectSchoolAlreadyUsed(this.file);

    this.contratForm = this.formBuilder.group({
      s1codeCours1: ['', Validators.required],
      s1codeCours2: ['', Validators.required],
      s1codeCours3: ['', Validators.required],
      s1codeCours4: ['', Validators.required],
      s1codeCours5: ['', Validators.required],
      s1codeCours6: ['', Validators.required],
      s1codeCours7: ['', Validators.required],
      s1codeCours8: ['', Validators.required],
      s1codeCours9: ['', Validators.required],
      s1codeCours10: ['', Validators.required],
      s1codeCours11: ['', Validators.required],
      s1codeCours12: ['', Validators.required],
      s1titreCours1: ['', Validators.required],
      s1titreCours2: ['', Validators.required],
      s1titreCours3: ['', Validators.required],
      s1titreCours4: ['', Validators.required],
      s1titreCours5: ['', Validators.required],
      s1titreCours6: ['', Validators.required],
      s1titreCours7: ['', Validators.required],
      s1titreCours8: ['', Validators.required],
      s1titreCours9: ['', Validators.required],
      s1titreCours10: ['', Validators.required],
      s1titreCours11: ['', Validators.required],
      s1titreCours12: ['', Validators.required],
      s1nombreCredits1: ['', Validators.required],
      s1nombreCredits2: ['', Validators.required],
      s1nombreCredits3: ['', Validators.required],
      s1nombreCredits4: ['', Validators.required],
      s1nombreCredits5: ['', Validators.required],
      s1nombreCredits6: ['', Validators.required],
      s1nombreCredits7: ['', Validators.required],
      s1nombreCredits8: ['', Validators.required],
      s1nombreCredits9: ['', Validators.required],
      s1nombreCredits10: ['', Validators.required],
      s1nombreCredits11: ['', Validators.required],
      s1nombreCredits12: ['', Validators.required],

      s2codeCours1: ['', Validators.required],
      s2codeCours2: ['', Validators.required],
      s2codeCours3: ['', Validators.required],
      s2codeCours4: ['', Validators.required],
      s2codeCours5: ['', Validators.required],
      s2codeCours6: ['', Validators.required],
      s2codeCours7: ['', Validators.required],
      s2codeCours8: ['', Validators.required],
      s2codeCours9: ['', Validators.required],
      s2codeCours10: ['', Validators.required],
      s2codeCours11: ['', Validators.required],
      s2codeCours12: ['', Validators.required],
      s2titreCours1: ['', Validators.required],
      s2titreCours2: ['', Validators.required],
      s2titreCours3: ['', Validators.required],
      s2titreCours4: ['', Validators.required],
      s2titreCours5: ['', Validators.required],
      s2titreCours6: ['', Validators.required],
      s2titreCours7: ['', Validators.required],
      s2titreCours8: ['', Validators.required],
      s2titreCours9: ['', Validators.required],
      s2titreCours10: ['', Validators.required],
      s2titreCours11: ['', Validators.required],
      s2titreCours12: ['', Validators.required],
      s2nombreCredits1: ['', Validators.required],
      s2nombreCredits2: ['', Validators.required],
      s2nombreCredits3: ['', Validators.required],
      s2nombreCredits4: ['', Validators.required],
      s2nombreCredits5: ['', Validators.required],
      s2nombreCredits6: ['', Validators.required],
      s2nombreCredits7: ['', Validators.required],
      s2nombreCredits8: ['', Validators.required],
      s2nombreCredits9: ['', Validators.required],
      s2nombreCredits10: ['', Validators.required],
      s2nombreCredits11: ['', Validators.required],
      s2nombreCredits12: ['', Validators.required],
    });

    for (let i = 1; i <= 12; i++) {
      this.contratForm.get('s1codeCours' + i).setValue(this.module.infos.s1['codeCours' + i]);
      this.contratForm.get('s2codeCours' + i).setValue(this.module.infos.s2['codeCours' + i]);
    }
    for (let i = 1; i <= 12; i++) {
      this.contratForm.controls['s1titreCours' + i].setValue(this.module.infos.s1['titreCours' + i]);
      this.contratForm.controls['s2titreCours' + i].setValue(this.module.infos.s2['titreCours' + i]);
    }
    for (let i = 1; i <= 12; i++) {
      this.contratForm.controls['s1nombreCredits' + i].setValue(this.module.infos.s1['nombreCredits' + i]);
      this.contratForm.controls['s2nombreCredits' + i].setValue(this.module.infos.s2['nombreCredits' + i]);
    }
  }

  callBackFn (key, val) {
    if (val.schoolID === this.schoolSelected.id)
      this.selectWish(val);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.module.infos.choice.schoolID)
        this.selectWish(this.module.infos.choice);

      //function
      if (this.schoolSelected)
        Object.entries(this.basicWishes.infos).forEach(
          ([key, val]) => this.callBackFn(key, val));
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }

  private getContratValuesS1() {
    return {
      codeCours1: this.f.s1codeCours1.value,
      codeCours2: this.f.s1codeCours2.value,
      codeCours3: this.f.s1codeCours3.value,
      codeCours4: this.f.s1codeCours4.value,
      codeCours5: this.f.s1codeCours5.value,
      codeCours6: this.f.s1codeCours6.value,
      codeCours7: this.f.s1codeCours7.value,
      codeCours8: this.f.s1codeCours8.value,
      codeCours9: this.f.s1codeCours9.value,
      codeCours10: this.f.s1codeCours10.value,
      codeCours11: this.f.s1codeCours11.value,
      codeCours12: this.f.s1codeCours12.value,
      titreCours1: this.f.s1titreCours1.value,
      titreCours2: this.f.s1titreCours2.value,
      titreCours3: this.f.s1titreCours3.value,
      titreCours4: this.f.s1titreCours4.value,
      titreCours5: this.f.s1titreCours5.value,
      titreCours6: this.f.s1titreCours6.value,
      titreCours7: this.f.s1titreCours7.value,
      titreCours8: this.f.s1titreCours8.value,
      titreCours9: this.f.s1titreCours9.value,
      titreCours10: this.f.s1titreCours10.value,
      titreCours11: this.f.s1titreCours11.value,
      titreCours12: this.f.s1titreCours12.value,
      nombreCredits1: this.f.s1nombreCredits1.value,
      nombreCredits2: this.f.s1nombreCredits2.value,
      nombreCredits3: this.f.s1nombreCredits3.value,
      nombreCredits4: this.f.s1nombreCredits4.value,
      nombreCredits5: this.f.s1nombreCredits5.value,
      nombreCredits6: this.f.s1nombreCredits6.value,
      nombreCredits7: this.f.s1nombreCredits7.value,
      nombreCredits8: this.f.s1nombreCredits8.value,
      nombreCredits9: this.f.s1nombreCredits9.value,
      nombreCredits10: this.f.s1nombreCredits10.value,
      nombreCredits11: this.f.s1nombreCredits11.value,
      nombreCredits12: this.f.s1nombreCredits12.value,
    };
  }

  private getContratValuesS2() {
    return {
      codeCours1: this.f.s2codeCours1.value,
      codeCours2: this.f.s2codeCours2.value,
      codeCours3: this.f.s2codeCours3.value,
      codeCours4: this.f.s2codeCours4.value,
      codeCours5: this.f.s2codeCours5.value,
      codeCours6: this.f.s2codeCours6.value,
      codeCours7: this.f.s2codeCours7.value,
      codeCours8: this.f.s2codeCours8.value,
      codeCours9: this.f.s2codeCours9.value,
      codeCours10: this.f.s2codeCours10.value,
      codeCours11: this.f.s2codeCours11.value,
      codeCours12: this.f.s2codeCours12.value,
      titreCours1: this.f.s2titreCours1.value,
      titreCours2: this.f.s2titreCours2.value,
      titreCours3: this.f.s2titreCours3.value,
      titreCours4: this.f.s2titreCours4.value,
      titreCours5: this.f.s2titreCours5.value,
      titreCours6: this.f.s2titreCours6.value,
      titreCours7: this.f.s2titreCours7.value,
      titreCours8: this.f.s2titreCours8.value,
      titreCours9: this.f.s2titreCours9.value,
      titreCours10: this.f.s2titreCours10.value,
      titreCours11: this.f.s2titreCours11.value,
      titreCours12: this.f.s2titreCours12.value,
      nombreCredits1: this.f.s2nombreCredits1.value,
      nombreCredits2: this.f.s2nombreCredits2.value,
      nombreCredits3: this.f.s2nombreCredits3.value,
      nombreCredits4: this.f.s2nombreCredits4.value,
      nombreCredits5: this.f.s2nombreCredits5.value,
      nombreCredits6: this.f.s2nombreCredits6.value,
      nombreCredits7: this.f.s2nombreCredits7.value,
      nombreCredits8: this.f.s2nombreCredits8.value,
      nombreCredits9: this.f.s2nombreCredits9.value,
      nombreCredits10: this.f.s2nombreCredits10.value,
      nombreCredits11: this.f.s2nombreCredits11.value,
      nombreCredits12: this.f.s2nombreCredits12.value,
    };
  }

  onSubmit() {
    console.log('this.module.id == ', this.module.id);
    console.log('---------TO SEND------');
    /*console.log('Contrat S1 == ', this.getContratValuesS1());
    console.log('Contrat S2 == ', this.getContratValuesS2());
    console.log('choice == ', this.selectedWish);*/

    const arrayList = ['BCICode', 'BCIProgramName'];

    let cloneCopy = Object.assign({}, this.selectedWish);
    delete cloneCopy.school;

    const infos = {
      BCICode: null,
      BCIProgramName: null,
      choice: cloneCopy,
      s1: this.getContratValuesS1(),
      s2: this.getContratValuesS2()
    };
    console.log('infos to Send => ', infos);
    this.moduleService.updateModule(this.module.id, infos).then(
      updatedModule => {
        this.module = updatedModule;
        console.log('updated module => ', updatedModule);
      }
    );

    this.isValidated = true;
  }


}
