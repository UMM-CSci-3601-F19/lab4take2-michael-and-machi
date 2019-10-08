import {browser, by, element, promise, Key} from 'protractor';

export class TodoPage {
  navigateTo(): promise.Promise<any> {
    return browser.get('/todos');
  }

  //http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
  highlightElement(byObject) {
    function setStyle(element, style) {
      const previous = element.getAttribute('style');
      element.setAttribute('style', style);
      setTimeout(() => {
        element.setAttribute('style', previous);
      }, 200);
      return "highlighted";
    }

    return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
  }

  getTodoTitle() {
    let title = element(by.id('todo-list-title')).getText();
    this.highlightElement(by.id('todo-list-title'));

    return title;
  }

  typeAName(name: string) {
    let input = element(by.id('todoOwner'));
    input.click();
    input.sendKeys(name);
  }

  getTodoByBody(name: string) {
    let input = element(by.id('todoBody'));
    input.click();
    input.sendKeys(name);
  }

  backspace() {
    browser.actions().sendKeys(Key.BACK_SPACE).perform();
  }


  getUniqueTodo(status: string) {
    let todo = element(by.id(status)).getText();
    this.highlightElement(by.id(status));

    return todo;
  }

  getTodoByStatus(name: string) {
    let input = element(by.id('todoStatus'));
    input.click();
    input.sendKeys(name);
  }

  elementExistsWithId(idOfElement: string): promise.Promise<boolean> {
    if (element(by.id(idOfElement)).isPresent()) {
      this.highlightElement(by.id(idOfElement));
    }
    return element(by.id(idOfElement)).isPresent();
  }

  elementExistsWithCss(cssOfElement: string): promise.Promise<boolean> {
    return element(by.css(cssOfElement)).isPresent();
  }

  click(idOfButton: string): promise.Promise<void> {
    this.highlightElement(by.id(idOfButton));
    return element(by.id(idOfButton)).click();
  }

 /* field(idOfField: string) {
    return element(by.id(idOfField));
  }


  button(idOfButton: string) {
    this.highlightElement(by.id(idOfButton));
    return element(by.id(idOfButton));
  }

  getTextFromField(idOfField: string) {
    this.highlightElement(by.id(idOfField));
    return element(by.id(idOfField)).getText();
  } */
}
