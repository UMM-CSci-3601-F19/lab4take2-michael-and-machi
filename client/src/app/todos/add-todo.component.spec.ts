import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatDialogRef, MAT_DIALOG_DATA, MATERIAL_COMPATIBILITY_MODE} from "@angular/material";

import {AddTodoComponent} from './add-todo.component';
import {CustomModule} from '../custom.module';
import {By} from "@angular/platform-browser";
import {NgForm} from "@angular/forms";


describe('Add Todo component', () => {

  let addTodoComponent: AddTodoComponent;
  let calledClose: boolean;

  const mockMatDialogRef = {
    close() {
      calledClose = true;
    }
  };

  let fixture: ComponentFixture<AddTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [AddTodoComponent],
      providers: [
        {provide: MatDialogRef, useValue: mockMatDialogRef},
        {provide: MAT_DIALOG_DATA, useValue: null},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    calledClose = false;
    fixture = TestBed.createComponent(AddTodoComponent);
    addTodoComponent = fixture.componentInstance;
  });


  it('Should not allow a owner to contain a symbol', async() => {
    let fixture = TestBed.createComponent(AddTodoComponent);
    let debug = fixture.debugElement;
    let input = debug.query(By.css('[owner=category]'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      input.nativeElement.value = 'bad';
      dispatchEvent(input.nativeElement);
      fixture.detectChanges();

      let form: NgForm = debug.children[0].injector.get(NgForm);
      let control = form.control.get('compant');
      expect(control.hasError('notPeeskillet')).toBe(true);
      expect(form.control.valid).toEqual(false);
      expect(form.control.hasError('notPeeskillet', ['company]'])).toEqual(true);

      input.nativeElement.value = 'peeskillet';
      dispatchEvent(input.nativeElement);
      fixture.detectChanges();

      expect(control.hasError('notPeeskillet')).toBe(true);
      expect(form.control.valid).toEqual(true);
      expect(form.control.hasError('notPeeskillet')).toBe(false);
  });
  });

  });
