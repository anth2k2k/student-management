import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Student } from '../student';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css'],
})
export class StudentCreateComponent implements OnInit {
  student = new Student();

  constructor(private _router: Router, private _service: AppService) {}

  ngOnInit(): void {}

  addStudent() {
    let xml_request = '<student>'
    + '<student_id>' + this.student.student_id + '</student_id>'
    + '<first_name>' + this.student.first_name + '</first_name>'
    + '<last_name>' + this.student.last_name + '</last_name>'
    + '<email>' + this.student.email + '</email>'
    + '<date_of_birth>' + this.student.date_of_birth + '</date_of_birth>'
    + '<birth_place>' + this.student.birth_place + '</birth_place>'
    + '<final_grade>' + this.student.final_grade + '</final_grade>'
    + '</student>'

    this._service.createStudentToAPI(xml_request).subscribe(
      (data) => {
        alert(data);
        this._router.navigate(['students']);
      },
      (error) => console.log(error)
    )
  }

  redirectStudentList() {
    this._router.navigate(['students']);
  }
}
