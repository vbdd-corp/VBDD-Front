import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReportCreatorService} from "../../../../services/report-creator.service";
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
  country1: String; country2:String; country3: String;

  constructor(private formBuilder: FormBuilder, private creatorSerive: ReportCreatorService, public schoolService: SchoolService) {
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
      isSecondSemester: ['', Validators.required]
    });
  }

  onChange(event) {
    console.log(event.target.value);
    let selectedOptionText = event.target.options[event.target.selectedIndex].text;
    let array1 = selectedOptionText.split(',');
    console.log(array1);
    let countryName = array1[array1.length - 1].trim();
    console.log('+' + countryName + '+');
    console.log(event.target.id);

    document.getElementById("label_" + event.target.id).innerText = countryName;
  }

  onSubmit() {

  }
}
