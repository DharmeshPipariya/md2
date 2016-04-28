/// <reference path="../../models.ts"/>

import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, AbstractControl} from 'angular2/common';
import {Validators} from 'angular2/common';
import {TodoItem} from '../../models';

@Component({
  selector: 'todo',
  viewProviders: [FormBuilder],
  templateUrl: './app/components/todo/todo.html',
  directives: [
    FORM_DIRECTIVES]
})
export class Todo implements OnInit {
  todos: Array<TodoItem>;

  fb: FormBuilder;
  myForm: ControlGroup;
  newTodo: Control;

  constructor(fb: FormBuilder) {
    this.fb = fb;
    this.todos = new Array<TodoItem>();
    this.todos.push(new TodoItem('Hello world', false));

    this.buildForm();
  }

  ngOnInit(): void {
    console.log('ngOnInit() called');
  }

  buildForm(): void {
    this.newTodo = new Control('', Validators.required);

    this.myForm = this.fb.group({
      'newTodo': this.newTodo
    });
  }

  removeTodo(item: TodoItem) {
    this.todos.splice(this.todos.indexOf(item), 1);
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      this.todos.push(new TodoItem(this.newTodo.value, false));

      // How in hell do I reset this thing and prevent it from being validated?
      // The only thing that works is rebuilding the whole form/&%¤#""
      this.buildForm();
    }
  }

  toggleAll(completed: boolean) {
    this.todos.forEach(function(todo) {
      todo.completed = completed;
    });
  }
}
