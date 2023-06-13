import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeserviceService } from './employeeservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  public employees: Employee[] | any ;
  public editEmployee: Employee | any;
  public deleteEmployee: Employee | any;

  constructor(private employeeService: EmployeeserviceService){
  }

  ngOnInit(){
    this.getEmployees();

  }
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      );
  }
  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
      this.employeeService.addEmployee(addForm.value).subscribe(
        (response: Employee) => {
          console.log(response);
          this.getEmployees();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          addForm.reset();
        }
    );
  }
  
public updateEmployee(employee: Employee): void {
  this.employeeService.updateEmployee(employee).subscribe(
    (response: Employee) => {
      console.log(response);
      this.getEmployees();
    },
    (error: HttpErrorResponse) => {
      console.error(error);
    }
);
}
public onDeleteEmployee(employeeId: number): void {
  this.employeeService.deleteEmployee(employeeId).subscribe(
    () => {
      console.log(`Employee deleted`);
      this.getEmployees();
    },
    (error: HttpErrorResponse) => {
      console.error(error);
    }
);
}
public searchEmployees(key: string): void {
  console.log(key);
  const results: Employee[] = [];
  for (const employee of this.employees) {
    if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
    }
  }
  this.employees = results;
  if (results.length === 0 || !key) {
    this.getEmployees();
}
}

public onOpenModal(employee: Employee|null, mode: string): void {
  const container:any = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addEmployeeModal');
  }
  if (mode === 'edit') {
    button.setAttribute('data-target', '#editEmployeeModal');
  }
  if (mode === 'delete') {
    button.setAttribute('data-target', '#deleteEmployeeModal');
  }
  container.appendChild(button);
  button.click();
}
}
