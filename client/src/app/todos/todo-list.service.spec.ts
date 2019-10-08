import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {Todo} from './todo';
import {TodoListService} from './todo-list.service';

describe('Todo list service: ', () => {
// A small collection of test users
  const testTodos: Todo[] = [
    {
      id: "58895985c1849992336c219b",
      owner: "Fry",
      status: false,
      body: "Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.",
      category: "video games"
    },
    {
      id: "58895985186754887e0381f5",
      owner: "Blanche",
      status: true,
      body: "Incididunt enim ea sit qui esse magna eu. Nisi sunt exercitation est Lorem consectetur incididunt cupidatat laboris commodo veniam do ut sint.",
      category: "software design"
    },
    {
      id: "58895985c32328e015584db2",
      owner: "Workman",
      status: false,
      body: "Proident cupidatat exercitation id ullamco magna do qui aliquip id. Eiusmod labore non nostrud culpa duis incididunt incididunt esse occaecat amet officia.",
      category: "homework"
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
    const targetId: string = targetTodo.id;
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
    let todoOwner = 'F';
    expect(todoListService.filterTodos(testTodos, todoOwner).length).toBe(1);
  });

  it('filterTodos() filters by Status', () => {
    expect(testTodos.length).toBe(3);
    let todoStatus = 'incomplete';
    expect(todoListService.filterTodos(testTodos, null, todoStatus).length).toBe(2);
  });

  it('filterTodos() filters by Body', () => {
    expect(testTodos.length).toBe(3);
    let todoBody = 'Incididunt';
    expect(todoListService.filterTodos(testTodos, null, null, todoBody).length).toBe(3);
  });

  it('filterTodos() filters by Owner and Status', () => {
    expect(testTodos.length).toBe(3);
    let todoStatus = 'complete';
    let todoOwner = 'Blanche';
    expect(todoListService.filterTodos(testTodos, todoOwner, todoStatus).length).toBe(1);
  });

  it('filterTodos() filters by Owner, Status, and Body', () => {
    expect(testTodos.length).toBe(3);
    let todoBody = 'Incididunt'
    let todoStatus = 'complete';
    let todoOwner = 'Blanche';
    expect(todoListService.filterTodos(testTodos, todoOwner, todoStatus, todoBody).length).toBe(1);
  });
})
