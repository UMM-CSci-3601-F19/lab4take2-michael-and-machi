import {browser, by, element, Key} from 'protractor';

export class TodoPage {
  navigateTo() {
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
}
