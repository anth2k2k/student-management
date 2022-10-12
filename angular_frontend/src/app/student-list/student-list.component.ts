import { StudentUpdateComponent } from '../student-update/student-update.component';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Student } from '../student';
import xml2js from 'xml2js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: Array<Student> = [];

  constructor(private _router: Router, private _service: AppService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this._service.getStudentsFromAPI().subscribe(
      (data) => (this.students = this.insertStudents(data)),
      (error) => console.log(error)
    );
  }

  insertStudents(data: any) {
    let output: Array<Student> = [];
    xml2js.parseString(data, (err, result) => {
      for (var i = 0; i < result['students']['student'].length; i++) {
        let item = result['students']['student'][i];
        let student = new Student();
        student.id = parseInt(item['$']['id']);
        student.student_id = item['student_id'][0];
        student.first_name = item['first_name'][0];
        student.last_name = item['last_name'][0];
        student.email = item['email'][0];
        student.date_of_birth = item['date_of_birth'][0];
        student.birth_place = item['birth_place'][0];
        student.final_grade = item['final_grade'][0];
        output.push(student);
      }
    });
    return output;
  }

  redirectStudentCreate() {
    this._router.navigate(['create-student']);
  }

  redirectEditStudent(id: number) {
    this._router.navigate(['update-student', id]);
  }

  redirectDeleteStudent(id: number) {
    if (confirm('Are you sure???'))
      this._service.deleteStudentByIdToAPI(id).subscribe(
        (success) => {
          window.location.reload();
        },
        (error) => console.log('Exception Occurred [DELETE]')
      );
  }
}
