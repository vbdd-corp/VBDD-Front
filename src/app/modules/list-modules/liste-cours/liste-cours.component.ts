import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Module} from "../../../../models/module";

@Component({
  selector: 'app-liste-cours',
  templateUrl: './liste-cours.component.html',
  styleUrls: ['./liste-cours.component.css']
})
export class ListeCoursComponent implements OnInit {
  listeCoursForm: FormGroup;
  @Input() module: Module;
  @ViewChild('togglePrintemps') private elTogglePrintemps;
  @ViewChild('toggleAutomne') private elToggleAutomne;
  @ViewChild('totalECTSS2') private elTotalECTSS2;
  @ViewChild('totalECTSS1') private elTotalECTSS1;
  private activeTab;
  private sumECTS;
  isValidated: boolean = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  get f() {
    return this.listeCoursForm.controls;
  }

  ngOnInit() {
    this.listeCoursForm = this.formBuilder.group({
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
    console.log('this.module === ', this.module);
    this.fillInputs();
    this.activeTab = 's1';
    if (this.elTogglePrintemps)
      this.elTogglePrintemps.nativeElement.style.display = 'block';
    if (this.elToggleAutomne)
      this.elToggleAutomne.nativeElement.style.display = 'block';
  }

  setAllInputToNull() {
    for (let i = 1; i <= 12; i++) {
      this.listeCoursForm.get('s1codeCours' + i).setValue('');
      this.listeCoursForm.get('s2codeCours' + i).setValue('');
    }
    for (let i = 1; i <= 12; i++) {
      this.listeCoursForm.controls['s1titreCours' + i].setValue('');
      this.listeCoursForm.controls['s2titreCours' + i].setValue('');
    }
    for (let i = 1; i <= 12; i++) {
      this.listeCoursForm.controls['s1nombreCredits' + i].setValue('');
      this.listeCoursForm.controls['s2nombreCredits' + i].setValue('');
    }
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

  updateTotalECTS(semester) {
    this.sumECTS = 0;
    let val;
    for (let i = 1; i <= 12; i++) {
      val = parseInt(
        this.f[semester + 'nombreCredits' + i].value,
        10);
      if (!isNaN(val))
        this.sumECTS += val;
    }
    if (this.activeTab === 's1' && this.elTotalECTSS1)
      this.elTotalECTSS1.nativeElement.textContent = 'Total ECTS :   ' + this.sumECTS;
    else if (this.activeTab === 's2' && this.elTotalECTSS2)
      this.elTotalECTSS2.nativeElement.textContent = 'Total ECTS :   ' + this.sumECTS;
  }

 /* enableorDisableToggleElements(){
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
  }*/

  fillInputs() {
    if (this.module.infos) {
      for (let i = 1; i <= 12; i++) {
        this.listeCoursForm.get('s1codeCours' + i).setValue(this.module.infos.s1['codeCours' + i]);
        this.listeCoursForm.get('s2codeCours' + i).setValue(this.module.infos.s2['codeCours' + i]);
      }
      for (let i = 1; i <= 12; i++) {
        this.listeCoursForm.controls['s1titreCours' + i].setValue(this.module.infos.s1['titreCours' + i]);
        this.listeCoursForm.controls['s2titreCours' + i].setValue(this.module.infos.s2['titreCours' + i]);
      }
      for (let i = 1; i <= 12; i++) {
        this.listeCoursForm.controls['s1nombreCredits' + i].setValue(this.module.infos.s1['nombreCredits' + i]);
        this.listeCoursForm.controls['s2nombreCredits' + i].setValue(this.module.infos.s2['nombreCredits' + i]);
      }
    }
  }

  onSubmit(){
  }

}
