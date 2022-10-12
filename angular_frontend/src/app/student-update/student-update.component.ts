import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../student';
import xml2js from 'xml2js';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css'],
})
export class StudentUpdateComponent implements OnInit {
  student = new Student();

  constructor(
    private _router: Router,
    private _service: AppService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = parseInt(this._activatedRoute.snapshot.paramMap.get('id')!);
    this._service.getStudentByIdFromAPI(id).subscribe(
      (data) => this.insertStudent(data),
      (error) => console.log(error)
    );
  }

  insertStudent(data: any) {
    xml2js.parseString(data, (err, result) => {
      let item = result['student'];
      this.student.id = parseInt(item['$']['id']);
      this.student.student_id = item['student_id'][0];
      this.student.first_name = item['first_name'][0];
      this.student.last_name = item['last_name'][0];
      this.student.email = item['email'][0];
      this.student.date_of_birth = item['date_of_birth'][0];
      this.student.birth_place = item['birth_place'][0];
      this.student.final_grade = item['final_grade'][0];
    });
  }

  updateStudent() {
    let xml_request = '<student>'
    + '<student_id>' + this.student.student_id + '</student_id>'
    + '<first_name>' + this.student.first_name + '</first_name>'
    + '<last_name>' + this.student.last_name + '</last_name>'
    + '<email>' + this.student.email + '</email>'
    + '<date_of_birth>' + this.student.date_of_birth + '</date_of_birth>'
    + '<birth_place>' + this.student.birth_place + '</birth_place>'
    + '<final_grade>' + this.student.final_grade + '</final_grade>'
    + '</student>'
    this._service
      .updateStudentByIdToAPI(this.student.id, xml_request)
      .subscribe(
        (data) => {
          alert(data);
          this._router.navigate(['students']);
        },
        (error) => console.log(error)
      );
  }

  redirectStudentList() {
    this._router.navigate(['students']);
  }
}
