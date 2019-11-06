import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {AddTodoComponent} from './add-todo.component';
import {CustomModule} from '../custom.module';
import {By} from '@angular/platform-browser';
import {NgForm} from '@angular/forms';

describe('Add todo component', () => {

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
        {provide: MAT_DIALOG_DATA, useValue: null}]
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    calledClose = false;
    fixture = TestBed.createComponent(AddTodoComponent);
    addTodoComponent = fixture.componentInstance;
  });

  it('should not allow a owner to contain a symbol'), async(() => {
    // tslint:disable-next-line:no-shadowed-variable
    const fixture = TestBed.createComponent(AddTodoComponent);
    const debug = fixture.debugElement;
    const input = debug.query(By.css('[owner=category]'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      input.nativeElement.value = 'bad';
      dispatchEvent(input.nativeElement);
      fixture.detectChanges();

      const form: NgForm = debug.children[0].injector.get(NgForm);
      const control = form.control.get('category');
      expect(control.hasError('notPeeskillet')).toBe(true);
      expect(form.control.valid).toEqual(false);
      expect(form.control.hasError('notPeeskillet', ['category'])).toEqual(true);

      input.nativeElement.value = 'peeskillet';
      dispatchEvent(input.nativeElement);
      fixture.detectChanges();

      expect(control.hasError('notPeeskillet')).toBe(false);
      expect(form.control.valid).toEqual(true);
      expect(form.control.hasError('notPeeskillet', ['category'])).toEqual(false);
    });
  });
});
