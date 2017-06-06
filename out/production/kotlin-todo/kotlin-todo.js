if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'kotlin-todo'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'kotlin-todo'.");
}
this['kotlin-todo'] = function (_, Kotlin) {
  'use strict';
  var asList = Kotlin.org.w3c.dom.asList_kt9thq$;
  var substringAfter = Kotlin.kotlin.text.substringAfter_8cymmc$;
  var addClass = Kotlin.kotlin.dom.addClass_hhb33f$;
  function main(args) {
    var storage = new Storage('todoList');
    var view = new View();
    new App(storage, view);
  }
  function App(storage, view) {
    this.storage = storage;
    this.view = view;
    var tmp$, tmp$_0;
    var newTodo = Kotlin.isType(tmp$ = document.getElementById('new-todo'), HTMLInputElement) ? tmp$ : Kotlin.throwCCE();
    this.on_0(newTodo, 'keyup', App_init$lambda(this));
    var todoList = Kotlin.isType(tmp$_0 = document.querySelector('.todo-list'), HTMLElement) ? tmp$_0 : Kotlin.throwCCE();
    this.delegate_0(todoList, '.destroy', 'click', App_init$lambda_0(this));
    this.delegate_0(todoList, '.toggle', 'click', App_init$lambda_1(this));
    window.addEventListener('hashchange', App_init$lambda_2(this));
    this.refreshItems_0();
  }
  App.prototype.on_0 = function (target, type, callback, useCapture) {
    if (useCapture === void 0)
      useCapture = false;
    target.addEventListener(type, callback, !!useCapture);
  };
  function App$delegate$lambda(closure$selector, closure$handler) {
    return function (event) {
      var tmp$;
      var targetElement = Kotlin.isType(tmp$ = event.target, HTMLElement) ? tmp$ : Kotlin.throwCCE();
      var potentialElements = document.querySelectorAll(closure$selector);
      var $receiver = asList(potentialElements);
      var any$result;
      any$break: {
        var tmp$_0;
        tmp$_0 = $receiver.iterator();
        while (tmp$_0.hasNext()) {
          var element = tmp$_0.next();
          if (Kotlin.equals(element, targetElement)) {
            any$result = true;
            break any$break;
          }
        }
        any$result = false;
      }
      var hasMatch = any$result;
      if (hasMatch) {
        closure$handler(targetElement, event);
      }
    };
  }
  App.prototype.delegate_0 = function (target, selector, type, handler) {
    var dispatchEvent = App$delegate$lambda(selector, handler);
    var useCapture = Kotlin.equals(type, 'blur') || Kotlin.equals(type, 'focus');
    this.on_0(target, type, dispatchEvent, useCapture);
  };
  App.prototype.refreshItems_0 = function () {
    this.setFilter_61zpoe$(window.location.hash);
  };
  function App$setFilter$lambda(it) {
    return !it.completed;
  }
  function App$setFilter$lambda_0(it) {
    return it.completed;
  }
  function App$setFilter$lambda_1(it) {
    return true;
  }
  App.prototype.setFilter_61zpoe$ = function (location) {
    var tmp$;
    var $receiver = substringAfter(location, 47);
    var route = $receiver.length > 0 ? $receiver.substring(0, 1).toUpperCase() + $receiver.substring(1) : $receiver;
    if (Kotlin.equals(route, 'Active'))
      tmp$ = this.storage.find_69yoy8$(App$setFilter$lambda);
    else if (Kotlin.equals(route, 'Completed'))
      tmp$ = this.storage.find_69yoy8$(App$setFilter$lambda_0);
    else
      tmp$ = this.storage.find_69yoy8$(App$setFilter$lambda_1);
    var items = tmp$;
    this.view.setFilter_61zpoe$(route.toLowerCase());
    this.view.displayItems_7g4tbo$(items);
  };
  App.prototype.addTodo_61zpoe$ = function (title) {
    var todo = new TodoListItem((new Date()).getTime().toString(), title, false);
    this.storage.save_8u6hcn$(todo);
    this.view.clearNewTodoInput();
    this.refreshItems_0();
  };
  App.prototype.removeTodo_61zpoe$ = function (id) {
    this.storage.remove_61zpoe$(id);
    this.refreshItems_0();
  };
  function App$toggleTodo$lambda(closure$id) {
    return function (it) {
      return Kotlin.equals(it.id, closure$id);
    };
  }
  App.prototype.toggleTodo_ivxn3r$ = function (id, completed) {
    var items = this.storage.find_69yoy8$(App$toggleTodo$lambda(id));
    if (!items.isEmpty()) {
      var item = items.get_za3lpa$(0);
      item.completed = completed;
      this.storage.save_8u6hcn$(item);
    }
    this.view.toggleItem_ivxn3r$(id, completed);
    this.refreshItems_0();
  };
  function App_init$lambda(this$App) {
    return function (it) {
      var tmp$, tmp$_0;
      it.preventDefault();
      Kotlin.isType(tmp$ = it, KeyboardEvent) ? tmp$ : Kotlin.throwCCE();
      if (it.keyCode === 13) {
        var item = Kotlin.isType(tmp$_0 = it.target, HTMLInputElement) ? tmp$_0 : Kotlin.throwCCE();
        if (!Kotlin.equals(item.value, ''))
          this$App.addTodo_61zpoe$(item.value);
      }
    };
  }
  function App_init$lambda_0(this$App) {
    return function (element, f) {
      var tmp$, tmp$_0, tmp$_1;
      var item = Kotlin.isType(tmp$ = element.parentNode, HTMLElement) ? tmp$ : Kotlin.throwCCE();
      tmp$_1 = (tmp$_0 = item.dataset['id']) != null ? tmp$_0 : Kotlin.throwNPE();
      this$App.removeTodo_61zpoe$(tmp$_1);
    };
  }
  function App_init$lambda_1(this$App) {
    return function (element, f) {
      var tmp$, tmp$_0;
      Kotlin.isType(tmp$ = element, HTMLInputElement) ? tmp$ : Kotlin.throwCCE();
      var item = Kotlin.isType(tmp$_0 = element.parentNode, HTMLElement) ? tmp$_0 : Kotlin.throwCCE();
      var id = item.dataset['id'];
      this$App.toggleTodo_ivxn3r$(id != null ? id : Kotlin.throwNPE(), element.checked);
    };
  }
  function App_init$lambda_2(this$App) {
    return function (it) {
      this$App.refreshItems_0();
    };
  }
  App.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'App',
    interfaces: []
  };
  function Storage(dbName) {
    this.dbName = dbName;
    this.todos = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
  }
  Storage.prototype.find_69yoy8$ = function (predicate) {
    var $receiver = this.todos;
    var destination = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (predicate(element)) {
        destination.add_11rb$(element);
      }
    }
    return destination;
  };
  Storage.prototype.save_8u6hcn$ = function (item) {
    var $receiver = this.todos;
    var firstOrNull_6jwkkr$result;
    firstOrNull_6jwkkr$break: {
      var tmp$;
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (Kotlin.equals(element.id, item.id)) {
          firstOrNull_6jwkkr$result = element;
          break firstOrNull_6jwkkr$break;
        }
      }
      firstOrNull_6jwkkr$result = null;
    }
    var todo = firstOrNull_6jwkkr$result;
    if (todo != null) {
      todo.title = item.title;
      todo.completed = item.completed;
    }
     else {
      this.todos.add_11rb$(item);
    }
  };
  Storage.prototype.remove_61zpoe$ = function (id) {
    var $receiver = this.todos;
    var firstOrNull_6jwkkr$result;
    firstOrNull_6jwkkr$break: {
      var tmp$;
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (Kotlin.equals(element.id, id)) {
          firstOrNull_6jwkkr$result = element;
          break firstOrNull_6jwkkr$break;
        }
      }
      firstOrNull_6jwkkr$result = null;
    }
    var todo = firstOrNull_6jwkkr$result;
    if (todo != null) {
      this.todos.remove_11rb$(todo);
    }
  };
  Storage.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Storage',
    interfaces: []
  };
  function TodoListItem(id, title, completed) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }
  TodoListItem.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'TodoListItem',
    interfaces: []
  };
  function View() {
    var tmp$, tmp$_0;
    this.newTodo = Kotlin.isType(tmp$ = document.getElementById('new-todo'), HTMLInputElement) ? tmp$ : Kotlin.throwCCE();
    this.todoList = Kotlin.isType(tmp$_0 = document.getElementById('todo-list'), HTMLUListElement) ? tmp$_0 : Kotlin.throwCCE();
  }
  View.prototype.displayItems_7g4tbo$ = function (items) {
    this.todoList.innerHTML = '';
    var tmp$;
    tmp$ = items.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      this.addItem_8u6hcn$(element);
    }
  };
  View.prototype.setFilter_61zpoe$ = function (route) {
    var tmp$, tmp$_0;
    var selectedFilter = Kotlin.isType(tmp$ = document.querySelector('.filters .selected'), HTMLElement) ? tmp$ : Kotlin.throwCCE();
    selectedFilter.className = '';
    var currentPage = Kotlin.isType(tmp$_0 = document.querySelector('.filters [href=' + '"' + '#/' + route + '"' + ']'), HTMLElement) ? tmp$_0 : Kotlin.throwCCE();
    currentPage.className = 'selected';
  };
  View.prototype.clearNewTodoInput = function () {
    this.newTodo.value = '';
  };
  View.prototype.addItem_8u6hcn$ = function (item) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var todoElement = Kotlin.isType(tmp$ = document.createElement('li'), HTMLLIElement) ? tmp$ : Kotlin.throwCCE();
    todoElement.setAttribute('data-id', item.id);
    var checkMark = Kotlin.isType(tmp$_0 = document.createElement('input'), HTMLInputElement) ? tmp$_0 : Kotlin.throwCCE();
    checkMark.type = 'checkbox';
    addClass(checkMark, ['toggle']);
    todoElement.append(checkMark);
    var label = Kotlin.isType(tmp$_1 = document.createElement('label'), HTMLLabelElement) ? tmp$_1 : Kotlin.throwCCE();
    label.innerHTML = item.title;
    todoElement.append(label);
    var destroyButton = Kotlin.isType(tmp$_2 = document.createElement('button'), HTMLButtonElement) ? tmp$_2 : Kotlin.throwCCE();
    addClass(destroyButton, ['destroy']);
    todoElement.append(destroyButton);
    if (item.completed) {
      checkMark.checked = true;
      addClass(todoElement, ['completed']);
    }
    this.todoList.append(todoElement);
  };
  View.prototype.removeItem_61zpoe$ = function (id) {
    var tmp$;
    var todoElement = Kotlin.isType(tmp$ = document.querySelector('[data-id=' + '"' + id + '"' + ']'), HTMLLIElement) ? tmp$ : Kotlin.throwCCE();
    this.todoList.removeChild(todoElement);
  };
  View.prototype.toggleItem_ivxn3r$ = function (id, completed) {
    var tmp$;
    var todoElement = Kotlin.isType(tmp$ = document.querySelector('[data-id=' + '"' + id + '"' + ']'), HTMLLIElement) ? tmp$ : Kotlin.throwCCE();
    todoElement.className = completed ? 'completed' : '';
  };
  View.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'View',
    interfaces: []
  };
  _.main_kand9s$ = main;
  _.App = App;
  _.Storage = Storage;
  _.TodoListItem = TodoListItem;
  _.View = View;
  Kotlin.defineModule('kotlin-todo', _);
  main([]);
  return _;
}(typeof this['kotlin-todo'] === 'undefined' ? {} : this['kotlin-todo'], kotlin);
