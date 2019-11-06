import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {Todo} from './todo';
import {TodoListService} from './todo-list.service';

describe('Todo list service: ', () => {
// A small collection of test users
  const testTodos: Todo[] = [
    {
      _id: '58af3a600343927e48e8720f',
      owner: 'Blanche',
      status: false,
      body: 'Nostrud ullamco labore exercitation magna. Excepteur aute aliqua veniam veniam nisi eu occaecat ea magna do.',
      category: 'video games'
    },
    {
      _id: '58af3a600343927e48e87211',
      owner: 'Fry',
      status: true,
      body: 'Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.',
      category: 'software design'
    },
    {
      _id: '58af3a600343927e48e87216',
      owner: 'Blanche',
      status: true,
      body: 'Nostrud ullamco labore exercitation magna. Excepteur aute aliqua veniam veniam nisi eu occaecat ea magna do.',
      category: 'homework'
    }
  ];
  let todoListService: TodoListService;
// These are used to mock the HTTP requests so that we (a) don't have to
// have the server running and (b) we can check exactly which HTTP
// requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todoListService = new TodoListService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('getTodos() calls api/todo', () => {
    // Assert that the users we get from this call to getUsers()
    // should be our set of test users. Because we're subscribing
    // to the result of getUsers(), this won't actually get
    // checked until the mocked HTTP request "returns" a response.
    // This happens when we call req.flush(testUsers) a few lines
    // down.
    todoListService.getTodos().subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    // Specify that (exactly) one request will be made to the specified URL.
    const req = httpTestingController.expectOne(todoListService.todoUrl);
    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');
    // Specify the content of the response to that request. This
    // triggers the subscribe above, which leads to that check
    // actually being performed.
    req.flush(testTodos);
  });

  it('getTodoById() calls api/todos/id', () => {
    const targetTodo: Todo = testTodos[1];
    const targetId: string = targetTodo._id;
    todoListService.getTodoById(targetId).subscribe(
      todo => expect(todo).toBe(targetTodo)
    );

    const expectedUrl: string = todoListService.todoUrl + '/' + targetId;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(targetTodo);
  });

  it('filterTodos() filters by Owner', () => {
    expect(testTodos.length).toBe(3);
    const todoOwner = 'F';
    // @ts-ignore
    expect(todoListService.filterTodos(testTodos, todoOwner).length).toBe(1);
  });

  it('filterTodos() filters by Status', () => {
    expect(testTodos.length).toBe(3);
    const todoStatus = 'incomplete';
    // @ts-ignore
    expect(todoListService.filterTodos(testTodos, null, todoStatus).length).toBe(2);
  });

  it('filterTodos() filters by Body', () => {
    expect(testTodos.length).toBe(3);
    const todoBody = 'Incididunt';
    // @ts-ignore
    expect(todoListService.filterTodos(testTodos, null, null, todoBody).length).toBe(3);
  });

  it('filterTodos() filters by Owner and Status', () => {
    expect(testTodos.length).toBe(3);
    const todoStatus = 'complete';
    const todoOwner = 'Blanche';
    // @ts-ignore
    expect(todoListService.filterTodos(testTodos, todoOwner, todoStatus).length).toBe(1);
  });

  it('filterTodos() filters by Owner, Status, and Body', () => {
    expect(testTodos.length).toBe(3);
    const todoBody = 'Incididunt'
    const todoStatus = 'complete';
    const todoOwner = 'Blanche';
    // @ts-ignore
    expect(todoListService.filterTodos(testTodos, todoOwner, todoStatus, todoBody).length).toBe(1);
  });
})
