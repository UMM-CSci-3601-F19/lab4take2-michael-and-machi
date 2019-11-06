import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Todo} from './todo';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {OwnerValidator} from './owner.validator';

@Component({
  selector: 'add-todo.component',
  templateUrl: 'add-todo.component.html',
})
export class AddTodoComponent implements OnInit {

  addTodoForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { todo: Todo }, private fb: FormBuilder) {
  }

  add_todo_validation_messages = {
    'owner': [
      {type: 'required', message: 'Owner is required'},
      {type: 'minlength', message: 'Owner must be at least 2 characters long'},
      {type: 'maxlength', message: 'Owner cannot be more than 25 characters long'},
      {type: 'pattern', message: 'Owner must contain only numbers and letters'},
      {type: 'existingOwner', message: 'Owner has already been taken'}
    ],

    'Status': [
      {type: 'pattern', message: 'Status must be a number'},
      {type: 'min', message: 'Status must be at least 15'},
      {type: 'max', message: 'Status may not be greater than 200'},
      {type: 'required', message: 'Status is required'}
    ],

    'category': [
      {type: 'category', message: 'Category must be formatted properly'}
    ]
  };

  createForms() {

    this.addTodoForm = this.fb.group({

      owner: new FormControl('owner', Validators.compose([
        OwnerValidator.validOwner,
        Validators.required
      ])),

      status: new FormControl('status', Validators.compose ([
        Validators.pattern('^[0-9]+[0-9]?'),
        Validators.minLength(15),
        Validators.maxLength(200),
        Validators.required
      ])),

      body: new FormControl('body'),

      category: new FormControl('category')
    });

  }

  ngOnInit() {
    this.createForms();
  }

}
