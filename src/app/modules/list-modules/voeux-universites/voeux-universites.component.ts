import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModuleService} from "../../../../services/module.service";
import {SchoolService} from "../../../../services/school.service";
import {School} from "../../../../models/school";

@Component({
  selector: 'app-voeux-universites',
  templateUrl: './voeux-universites.component.html',
  styleUrls: ['./voeux-universites.component.css']
})
export class VoeuxUniversitesComponent implements OnInit {
  wishesForm: FormGroup;
  @Input() module: any;
  isValidated: boolean = false;
  public schoolList: School[];
  option_select_1: number; option_select_2: number; option_select_3: number;

  constructor(private formBuilder: FormBuilder, private moduleService: ModuleService, public schoolService: SchoolService) {
    this.schoolService.schools$.subscribe((schools) => this.schoolList = schools);
    this.schoolService.getSchool();
  }

  get f() {
    return this.wishesForm.controls;
  }

  ngOnInit() {
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
      semester_choice_1: ['', Validators.required]
    });
  }

  onChange(event) {
    // console.log(event.target.value);
    let selectedOptionText = event.target.options[event.target.selectedIndex].text;
    let array1 = selectedOptionText.split(',');
    // console.log(array1);
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


    console.log(this.schoolList);
    console.log(this.schoolList[this.option_select_1 - 1]);
    console.log(typeof this.schoolList[this.option_select_1 - 1].id);
    let choice1 = {
      "schoolID": this.schoolList[this.option_select_1 - 1].id,
      "semester": this.wishesForm.controls['semester_choice_1'].value
    };

    console.log(choice1);
  }
}
