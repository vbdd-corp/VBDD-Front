import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../services';
import {DossierService} from '../../../services/dossier.service';
import {Observable, Subscription} from 'rxjs';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {debounceTime, first, map} from 'rxjs/operators';
import {SchoolService} from '../../../services/school.service';

@Component({
  selector: 'app-reports-filterer',
  templateUrl: './reports-filterer.component.html',
  styleUrls: ['./reports-filterer.component.css']
})
export class ReportsFiltererComponent implements OnInit {

  filterForm: FormGroup;
  dossiers: Array<any>;
  sub: Subscription;
  public model: any;
  private filtersList = ['ecole', 'cursus', 'pays', 'etudiant'];
  schoolList: Array<any>;


  constructor(private formBuilder: FormBuilder, private schoolService: SchoolService, private alertService: AlertService, private dossierService: DossierService) {
    this.dossierService.getAllFiles();
    this.schoolService.getSchool();
    this.sub = this.dossierService.files$.subscribe(files => this.dossiers = files);
    this.sub = this.schoolService.schools$.subscribe(schools => this.schoolList = schools);
  }

  static export_table_to_csv(html, filename) {
    var csv = [];
    var rows = document.querySelectorAll('table tr');

    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll('td, th');
      for (var j = 0; j < cols.length; j++) {
        // @ts-ignore
        row.push(cols[j].innerText);
      }
      csv.push(row.join(','));
    }
    ReportsFiltererComponent.download_csv(csv.join('\n'), filename);
  }

  static download_csv(csv, filename) {
    var csvFile;
    var downloadLink;

    csvFile = new Blob([csv], {type: 'text/csv'});
    downloadLink = document.createElement('a');
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  get f() {
    return this.filterForm.controls;
  }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      filter: ['', Validators.required]
    });
  }

  static findModuleById(dossier: any, typeModule: any) {
    for (let i = 0; i < dossier.modules.length; i++) {
      if (dossier.modules[i].typeModule.id == typeModule) {
        return dossier.modules[i];
      }
    }
    return 'Aucun module trouvé';
  }

  splitFilterInput() {
    return this.f.filter.value.split(':');
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.schoolList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  formatter = (x: { name: string }) => x.name;

  downloadAsPDF() {

    var doc = new jsPDF();
    doc.autoTable({html: '#mainTable'});
    doc.save('dossiers' + Math.floor(Math.random() * Math.floor(999)) + '.pdf');
  }

  filter() {
    this.alertService.clear();
    if (this.isValid(this.splitFilterInput()[0])) {
      this.filterTable(this.splitFilterInput()[0].trim(), this.splitFilterInput()[1].trim());
    } else {
      this.alertService.error('Le filtre "' + this.f.filter.value + '" n\'est pas valide !');
    }
  }

  private isValid(filter) {
    if (this.f.filter.value.indexOf(':') <= -1) {
      return false;
    }
    return !(this.filtersList.indexOf(filter) <= -1);
  }

  reset() {
    this.dossierService.getAllFilesWithoutObservable()
      .pipe(first())
      .subscribe(
        reports => {
          // @ts-ignore
          this.dossiers = reports;
        });
  }

  getSchool(dossier: any) {
    let schoolIds = [];
    module = ReportsFiltererComponent.findModuleById(dossier, 17);
    // @ts-ignore
    if (module.infos.choice1.schoolID !== null) {
      // @ts-ignore
      schoolIds.push(module.infos.choice1.schoolID);
    }
    // @ts-ignore
    if (module.infos.choice2.schoolID !== null) {
      // @ts-ignore
      schoolIds.push(module.infos.choice2.schoolID);
    }
    // @ts-ignore
    if (module.infos.choice3.schoolID !== null) {
      // @ts-ignore
      schoolIds.push(module.infos.choice3.schoolID);
    }
    let name = ' ';

    schoolIds.forEach(id => {
      // @ts-ignore

      const schoolName = this.getSchoolById(id).name;
      if (schoolName !== undefined) {
        if (!name.includes(schoolName)) {
          name += schoolName + ' ; ';
        }
      } else {
        return 'Aucun name';
      }
    });

    return name.substring(0, name.length - 2);
  }

  getPaysAccueil(dossier: any) {
    let schoolIds = [];
    module = ReportsFiltererComponent.findModuleById(dossier, 17);
    // @ts-ignore
    if (module.infos.choice1.schoolID !== null) {
      // @ts-ignore
      schoolIds.push(module.infos.choice1.schoolID);
    }
    // @ts-ignore
    if (module.infos.choice2.schoolID !== null) {
      // @ts-ignore
      schoolIds.push(module.infos.choice2.schoolID);
    }
    // @ts-ignore
    if (module.infos.choice3.schoolID !== null) {
      // @ts-ignore
      schoolIds.push(module.infos.choice3.schoolID);
    }
    let pays = ' ';

    schoolIds.forEach(id => {
      // @ts-ignore

      const country = this.getSchoolById(id).country;
      if (country !== undefined) {
        if (!pays.includes(country)) {
          pays += country + ' ; ';
        }
      } else {
        return 'Aucun pays';
      }
    });

    return pays.substring(0, pays.length - 2);
  }

  downloadAsCSV() {
    ReportsFiltererComponent.export_table_to_csv(document.querySelector('table').outerHTML, 'dossier' + Math.floor(Math.random() * Math.floor(999)) + '.csv');
  }

  private filterTable(filter: string, value: string) {

    switch (filter) {
      case this.filtersList[0]:
        this.dossierService.getFilesBySchool(value)
          .pipe(first())
          .subscribe(
            reports => {
              // @ts-ignore
              this.dossiers = reports;
            });

        break;
      case this.filtersList[1]:
        this.sortByCursus(value);

        break;
      case this.filtersList[2]:
        this.dossierService.getFilesByCountry(value)
          .pipe(first())
          .subscribe(
            reports => {
              // @ts-ignore
              this.dossiers = reports;
            });

        break;
      case this.filtersList[3]:
        this.sortByStudent(value);
        break;
    }
  }

  private sortByStudent(inputValue: string) {
    const fullName = inputValue.split(' ');
    let nom = fullName[1].trim();
    let prenom = fullName[0].trim();

    const length = this.dossiers.length;
    for (let i = length - 1; i >= 0; --i) {
      if (!(this.dossiers[i].student.firstName.toLowerCase().trim() == prenom.toLowerCase().trim() && this.dossiers[i].student.lastName.toLowerCase().trim() == nom.toLowerCase().trim())) {
        this.dossiers.splice(i, 1);
      }
    }
  }

  private sortByCursus(cursus: string) {

    const length = this.dossiers.length;
    for (let i = length - 1; i >= 0; --i) {
      if (!(this.dossiers[i].student.major.toLowerCase().trim() == cursus.toLowerCase().trim())) {
        this.dossiers.splice(i, 1);
      }
    }
  }

  private getSchoolById(id: any) {
    for (const school of this.schoolList) {
      if (school.id == id) {
        return school;
      }
    }
  }
}
