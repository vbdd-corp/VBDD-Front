import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModuleService} from '../../../../services/module.service';
import {SchoolService} from '../../../../services/school.service';
import {School} from '../../../../models/school';
import {Module} from '../../../../models/module';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-voeux-universites',
  templateUrl: './voeux-universites.component.html',
  styleUrls: ['./voeux-universites.component.css']
})


export class VoeuxUniversitesComponent implements OnInit {
  wishesForm: FormGroup;
  @Input() module: Module;
  isValidated: boolean = false;
  public schoolList: School[];
  public schoolSelected1: School;
  public schoolSelected2: School;
  public schoolSelected3: School;

  sub: Subscription;

  constructor(
    private formBuilder: FormBuilder, private moduleService: ModuleService,
    public schoolService: SchoolService) {
  }

  get f() {
    return this.wishesForm.controls;
  }

  ngOnInit() {
    console.log('module=> ', this.module);

    this.sub = this.schoolService.schools$.subscribe(schools => {
      this.schoolList = schools;
      this.schoolSelected1 = schools.filter( school =>
        school.id === this.module.infos.choice1.schoolID)[0];
      this.schoolSelected2 = schools.filter( school =>
        school.id === this.module.infos.choice2.schoolID)[0];
      this.schoolSelected3 = schools.filter( school =>
        school.id === this.module.infos.choice3.schoolID)[0];
    });
    this.schoolService.getSchool();

    this.wishesForm = this.formBuilder.group({
      semester_choice_1: ['', Validators.required],
      semester_choice_2: ['', Validators.required],
      semester_choice_3: ['', Validators.required],
    });

    if (this.module.infos.choice1.semester != null) {
      this.wishesForm.get('semester_choice_1').setValue(this.module.infos.choice1.semester);
    } if (this.module.infos.choice2.semester != null)
      this.wishesForm.get('semester_choice_2').setValue(this.module.infos.choice2.semester);
    if (this.module.infos.choice2.semester != null)
      this.wishesForm.get('semester_choice_3').setValue(this.module.infos.choice3.semester);

  }

  selectSchool(school: School, id: number) {
    let str = 'schoolSelected' + id.toString();
    this[str]= school;

    /* unselect the module */
    const tdOfSelectedModule = document.querySelectorAll('.selected');
    tdOfSelectedModule.forEach(td => td.classList.remove('selected'));
    //TODO: select the new module in the list
    document.getElementById("label_select_" + id).innerText = school.country;
  }

  onSubmit() {
    let infos = {};

    function semesterProcess (elt, index, wishesFormControls) {
      let tempChoice = {};
      tempChoice["schoolID"] = null;
      if (wishesFormControls["semester_choice_" + (index + 1)].value)
        tempChoice["semester"] = wishesFormControls["semester_choice_" + (index + 1)].value;
      else
        tempChoice["semester"] = null;
      infos["choice" + (index + 1)] = tempChoice;
    }

    ['semester_choice_1', 'semester_choice_2', 'semester_choice_3'].forEach((elt, index) =>
    semesterProcess(elt, index, this.wishesForm.controls));

    for (let i = 1; i <= 3; i++){
      if (this['schoolSelected' + i])
        infos['choice' + i].schoolID = this['schoolSelected' + i].id;
    }

    console.log(infos);

    this.moduleService.updateModule(this.module.id, infos).then((moduleUpdated) => {
      this.module = moduleUpdated;
      console.log('module after == ', this.module);
    });

    this.isValidated = true;

  }
}
