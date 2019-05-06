import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModuleService} from "../../../../services/module.service";
import {SchoolService} from "../../../../services/school.service";
import {School} from "../../../../models/school";
import {Module} from "../../../../models/module";
import {sequence} from "@angular/animations";

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
  option_select_1: number = 0;
  option_select_2: number = 0;
  option_select_3: number = 0;

  constructor(private formBuilder: FormBuilder, private moduleService: ModuleService, public schoolService: SchoolService) {
    this.schoolService.schools$.subscribe((schools) => this.schoolList = schools);
    this.schoolService.getSchool();
    this.moduleService.getSelectedModule().subscribe((module) => this.module = module);

  }

  get f() {
    return this.wishesForm.controls;
  }

  ngOnInit() {
    console.log('module=> ', this.module);
    //this.moduleService.getSelectedModule().subscribe((module) => this.module = module);
    this.wishesForm = this.formBuilder.group({
      university1: ['', Validators.required],
      university2: ['', Validators.required],
      university3: ['', Validators.required],
      pays1: ['', Validators.required],
      pays2: ['', Validators.required],
      pays3: ['', Validators.required],
      isFullYear: ['', Validators.required],
      isFirstSemester: ['', Validators.required],
      isSecondSemester: ['', Validators.required],
      semester_choice_1: ['', Validators.required],
      semester_choice_2: ['', Validators.required],
      semester_choice_3: ['', Validators.required]

    });
  }

  onChange(event) {
    let selectedOptionText = event.target.options[event.target.selectedIndex].text;
    let array1 = selectedOptionText.split(',');
    const countryName = array1[array1.length - 1].trim();
    document.getElementById("label_" + event.target.id).innerText = countryName;
    if (event.target.id === 'select_1')
      this.option_select_1 = parseInt(event.target.selectedIndex, 10);
    if (event.target.id === 'select_2')
      this.option_select_2 = parseInt(event.target.selectedIndex, 10);
    if (event.target.id === 'select_3')
      this.option_select_3 = parseInt(event.target.selectedIndex, 10);
  }

  onSelectionChange(event) {

  }

  onSubmit() {


    // console.log(this.schoolList);
    /* console.log(this.option_select_1);
    console.log(this.schoolList[this.option_select_1 - 1]);
    console.log(typeof this.schoolList[this.option_select_1 - 1].id);
    let choice1 = {
      "schoolID": this.schoolList[this.option_select_1 - 1].id,
      "semester": this.wishesForm.controls['semester_choice_1'].value
    }; */

    function sequenceFn(elt, index, schoolList, wishesFormControls)
    {
      console.log('index ', index, ' == ', elt);
      let tempChoice = {};
      if (elt !== 0) {
        console.log(schoolList[elt-1]);
        tempChoice["schoolID"] = schoolList[elt - 1].id;
        // console.log(wishesFormControls["semester_choice_" + (index + 1)].value);
        if (wishesFormControls["semester_choice_" + (index + 1)].value)
          tempChoice["semester"] = wishesFormControls["semester_choice_" + (index + 1)].value;
        else
          tempChoice["semester"] = null;
      } else {
        tempChoice["schoolID"] = null;
        tempChoice["semester"] = null;
      }
      infos["choice" + (index + 1)] = tempChoice;
    }

    let infos = {};
    [this.option_select_1, this.option_select_2, this.option_select_3]
      .forEach((elt, index) => sequenceFn(elt, index, this.schoolList, this.wishesForm.controls));

    console.log(infos);
    this.moduleService.updateModule(this.module.id, infos).subscribe((moduleUpdated) => {
      this.module = moduleUpdated;
      console.log('module after == ', this.module);
    });

  }
}
