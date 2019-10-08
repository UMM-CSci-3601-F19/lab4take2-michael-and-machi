import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 100ms wait between test
  //This delay is only put here so that you can watch the browser do its' thing.
  //If you're tired of it taking long you can remove this call
  origFn.call(browser.driver.controlFlow(), function () {
    return protractor.promise.delayed(100);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
  });

  it('should get and highlight Todo Name attribute ', () => {
    page.navigateTo();
    expect(page.getTodoTitle()).toEqual('Todo');
  });

  it('should type something into \'Filter by owner\' box', () => {
    page.navigateTo();
    page.typeAName("o");
    expect(page.getUniqueTodo("true")).toEqual("Workman");
    page.backspace();
    page.typeAName("Fry");
    expect(page.getUniqueTodo("true")).toEqual("Fry");
  });

  it('should type in body \'in\'', () => {
    page.navigateTo();
    page.getTodoByBody("in");

    expect(page.getUniqueTodo("true")).toEqual("Fry");

    expect(page.getUniqueTodo("false")).toEqual("Blanche");

  });

  it('should type \'complete\' into status and also \'Nisi sit\' into body', () => {
    page.navigateTo();
    page.getTodoByStatus("complete");
    page.getTodoByBody("Nisi sit");
    expect(page.getUniqueTodo("true")).toEqual(("Barry"));
  });

  it('should type \'Dawn\' into filter by owner, \'proident v\' into filter by body, ' +
    'and \'Incomplete\' into filter by status', () =>  {
    page.navigateTo();
    page.getTodoByStatus("Incomplete");
    page.getTodoByBody("proident v");
    page.typeAName("Dawn");

    expect(page.getUniqueTodo("false")).toEqual("Dawn");

    for (let i = 0; i < 4 ; i++) {
      page.backspace();
    }
    page.typeAName("Workman");


    expect(page.getUniqueTodo("false")).toEqual("Workman");
  });

  it('Should have an add todo button', () => {
    page.navigateTo();
    expect(page.elementExistsWithId('addNewTodo')).toBeTruthy();
  });

  it('Should open a dialog box when add todo button is clicked', () => {
    page.navigateTo();
    expect(page.elementExistsWithCss('add-todo')).toBeFalsy('There should not be a modal window yet');
    page.click('addNewTodo');
    expect(page.elementExistsWithCss('add-todo')).toBeTruthy('There should be a modal window now');
  });


});
