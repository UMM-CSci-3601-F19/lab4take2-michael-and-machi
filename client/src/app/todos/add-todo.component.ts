import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";

import {Todo} from './todo';
import {OwnerValidator} from "./owner.validator";
import {validate} from "codelyzer/walkerFactory/walkerFn";

@Component({
  selector: 'add-todo-component',
  templateUrl: 'add-todo.component.html'
})
export class AddTodoComponent implements OnInit {
  addTodoForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { todo: Todo}, private fb : FormBuilder) {
}

  add_todo_validation_messages = {
    'owner': [
      {type: 'required', message: 'Owner is required'},
      {type: 'minlength', message: 'Owner must be at least 2 characters long'},
      {type: 'maxlength', message: 'Owner cannot be more than 25 characters long'},
      {type: 'pattern', message: 'Owner must contain only numbers and letters'},
      {type: 'existingOwner', message: 'Owner has already been taken'}
    ],

    'status': [
      {type: 'pattern', message: 'Status is true or false'},
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
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.pattern('^[A-Za-z0-9\\s]+[A-Za-z0-9\\s]+$(\\.0-9+)?'),
        Validators.required
      ])),

      status: new FormControl('status', Validators.compose([
        Validators.pattern('[true, false, True, False]+'),
        Validators.required
      ])),

      body: new FormControl('body'),

      category: new FormControl('category', Validators.compose([
        Validators.pattern('^[A-Za-z0-9\\s]+[A-Za-z0-9\\s]+$(\\.0-9+)?')
      ]))
    })
  }

  ngOnInit() {
    this.createForms();
  }
}
