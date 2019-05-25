import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit, ChangeDetectorRef
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModuleService} from '../../../../services/module.service';
import {SchoolService} from "../../../../services/school.service";
import {File} from "../../../../models/file";
import {Module} from "../../../../models/module";
import {DossierService} from '../../../../services/dossier.service';
import {Choice} from '../../../../models/choice';

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
  @ViewChild('bigContainer') private elBigContainer;
  isValidated: boolean = false;

  private choices :Choice[];
  private selectedChoice :Choice;
  private activeTab;
  private choiceAlreadyInAnotherContrat;
  private sumECTS;
  private display;

  constructor(
    private formBuilder: FormBuilder,
    private moduleService: ModuleService,
    private schoolService: SchoolService,
    private fileService: DossierService) {
    this.choices = [];
  }

  get f() {
    return this.contratForm.controls;
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  setS(activeTab) {
    if (activeTab === 's1' &&
      !this.elToggleAutomne.nativeElement.classList.contains('disabled')) {
      this.activeTab = activeTab;
    } else if (activeTab === 's1' &&
      this.elToggleAutomne.nativeElement.classList.contains('disabled')) {
      setTimeout(
        () => {
          this.elToggleAutomne.nativeElement.classList.remove('active');
          this.elTogglePrintemps.nativeElement.classList.add('active');
          },
        50);
    } else if (activeTab === 's2' &&
      !this.elTogglePrintemps.nativeElement.classList.contains('disabled')) {
      this.activeTab = activeTab;
    } else if (activeTab === 's2' &&
      this.elTogglePrintemps.nativeElement.classList.contains('disabled')) {
      setTimeout(
        () => {
          this.elTogglePrintemps.nativeElement.classList.remove('active');
          this.elToggleAutomne.nativeElement.classList.add('active');
        },
        50);
    }
  }

  setSchoolSelectedToNull() {
    this.setAllInputToNull();
    this.selectedChoice = null;
    this.elTogglePrintemps.nativeElement.style.display = 'none';
    this.elToggleAutomne.nativeElement.style.display = 'none';
    this.display = false;
    this.elBigContainer.nativeElement.style.display = 'none';
  }

  setAllInputToNull() {
    for (let i = 1; i <= 12; i++) {
      this.contratForm.get(this.activeTab + 'codeCours' + i).setValue('');
    }
    for (let i = 1; i <= 12; i++) {
      this.contratForm.controls[this.activeTab + 'titreCours' + i].setValue('');
    }
    for (let i = 1; i <= 12; i++) {
      this.contratForm.controls[this.activeTab + 'nombreCredits' + i].setValue('');
    }
  }

  enableorDisableToggleElements(){
    let choice = this.selectedChoice;

    if (this.elBigContainer) {
      if (this.display)
        this.elBigContainer.nativeElement.style.display = 'block';
      else
        this.elBigContainer.nativeElement.style.display = 'none';
    }
    //console.log('enableToggle function => this.activeTab == ', this.activeTab);
    if (this.activeTab === 's1' && this.elTotalECTSS1)
      this.elTotalECTSS1.nativeElement.textContent = 'Total ECTS :   ' + this.sumECTS;
    else if (this.activeTab === 's2' && this.elTotalECTSS2)
      this.elTotalECTSS2.nativeElement.textContent = 'Total ECTS :   ' + this.sumECTS;


    if (this.elTogglePrintemps)
      this.elTogglePrintemps.nativeElement.style.display = 'block';
    if (this.elToggleAutomne)
      this.elToggleAutomne.nativeElement.style.display = 'block';

    if (this.elToggleAutomne && this.elTogglePrintemps) {
      if (choice.semester === 'fall') {
        //console.log('HERE DEBUG 1');
        this.elToggleAutomne.nativeElement.classList.remove('disabled');
        this.elTogglePrintemps.nativeElement.classList.add('disabled');
        this.elTogglePrintemps.nativeElement.classList.add('unselectable');
        this.elToggleAutomne.nativeElement.classList.add('active');
        this.elTogglePrintemps.nativeElement.classList.remove('active');

      } else if (choice.semester === 'spring') {
        this.elToggleAutomne.nativeElement.classList.add('disabled');
        this.elTogglePrintemps.nativeElement.classList.remove('disabled');
        this.elToggleAutomne.nativeElement.classList.remove('active');
        this.elTogglePrintemps.nativeElement.classList.add('active');
      } else if (choice.semester === 'full') {
        this.elToggleAutomne.nativeElement.classList.remove('disabled');
        this.elTogglePrintemps.nativeElement.classList.remove('disabled');
        this.elToggleAutomne.nativeElement.classList.add('active');
        this.elTogglePrintemps.nativeElement.classList.remove('active');
      }
    }
  }

  selectWish(choice :Choice) {
    this.selectedChoice = choice;
    if (choice.semester === 'fall')
      this.activeTab = 's1';
    else if (choice.semester === 'spring')
      this.activeTab = 's2';
    else if (choice.semester === 'full')
      this.activeTab = 's1';

    this.fillInputs();
    setTimeout(() => this.updateTotalECTS(this.activeTab), 50);
    this.display = true;
    this.updateTotalECTS(this.activeTab);

    if (typeof choice.schoolID === 'number') { //TODO: check if this condition is possible
      this.schoolService.getSchoolById(choice.schoolID).then( school => {
        this.selectedChoice.school = school;
      });
    }
    const tdOfSelectedModule = document.querySelectorAll('.selected');
    tdOfSelectedModule.forEach(td => td.classList.remove('selected'));

    this.choiceAlreadyInAnotherContrat = this.detectChoiceAlreadyUsed(this.file, choice);
  }

  updateTotalECTS(semester) {
    this.sumECTS = 0;
    let val;
    for (let i = 1; i <= 12; i++) {
      //console.log('mystr ==> |', semester + 'nombreCredits' + i + '|');
      //console.log('aaah => ', this.f[semester + 'nombreCredits' + i]);
      //console.log('bbbb => ', this.contratForm.controls[semester + 'nombreCredits' + i]);
      val = parseInt(
        this.f[semester + 'nombreCredits' + i].value,
        10);
      if (!isNaN(val))
        this.sumECTS += val;
    }
    this.enableorDisableToggleElements();
  }

  loadListChoices(choices :any) {
    if(choices.choice1 !== null)
      this.choices.push(choices.choice1);
    if(choices.choice2 !== null)
      this.choices.push(choices.choice2);
    if(choices.choice3 !== null)
      this.choices.push(choices.choice3);
  }

  detectChoiceAlreadyUsed(file: File, choice: Choice){
    let contratEtudeList = file.modules.filter(
      module => module.typeModule.id === 8);

    let choiceSchoolId = choice.school ? choice.school.id : choice.schoolID;
    for (let i = 0; i < contratEtudeList.length; i++){
      if (choiceSchoolId === contratEtudeList[i].infos.choice.schoolID
      && choice.semester === contratEtudeList[i].infos.choice.semester
      && contratEtudeList[i].id !== this.module.id) {
        return true;
      }
    }
    return false;
  }

  fillInputs() {
    if (this.module.infos) {
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
  }

  ngOnInit() {
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
    this.fillInputs();

    this.fileService.getChoices(this.file.id).then( choices => {
      if(choices) {
        this.loadListChoices(choices);
      }
      console.log('this.module == ', this.module);
      //console.log('typeof == ', typeof this.module.infos.choice.schoolID);
      if (this.module.infos && typeof this.module.infos.choice.schoolID === 'number'){
        this.selectWish(this.module.infos.choice);
      } else if (this.choices.length === 0 || (!this.selectedChoice)) {
        this.display = false;
      }
    });
    if (this.elTogglePrintemps)
      this.elTogglePrintemps.nativeElement.style.display = 'none';
    if (this.elToggleAutomne)
      this.elToggleAutomne.nativeElement.style.display = 'none';
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
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

    const arrayList = ['BCICode', 'BCIProgramName'];

    let selectedChoiceCopy = Object.assign({}, this.selectedChoice);
    selectedChoiceCopy.schoolID = selectedChoiceCopy.school.id;
    delete selectedChoiceCopy.school;

    const infos = {
      BCICode: null,
      BCIProgramName: null,
      choice: selectedChoiceCopy,
      s1: this.getContratValuesS1(),
      s2: this.getContratValuesS2()
    };
    this.moduleService.updateModule(this.module.id, infos).then(
      updatedModule => {
        this.module = updatedModule;
      }
    );

    this.isValidated = true;
  }


}
