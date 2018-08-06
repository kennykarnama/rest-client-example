import { Component, OnInit } from '@angular/core';
import { Todo } from './Todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
 
 /**
  * Todo list
  * @type {Todo[]}
  */
  todos:Todo[];
  /**
   * deleteModal prop
   * @type {boolean}
   */
  isDeleteModal:boolean;
  /**
   * createModal prop
   * @type {boolean}
   */
  isCreateModal:boolean;
  /**
   * createModal prop
   * @type {boolean}
   */
  isEditModal:boolean;
  /**
   * selected todo id
   * @type {number}
   */
  selectedTodoId:number;
  /**
   * selected todo
   * @type {Todo}
   */
  selectedTodo:Todo;
  /**
   * Constructor
   * Register todo service
   * @param {TodoService} private todoService
   */
  constructor(private todoService: TodoService) { 
  }
  /**
   * Init
   */
  ngOnInit() {
  	this.getAllToDos();
    this.isDeleteModal = false;
    this.isCreateModal = false;
    this.isEditModal = false;
    this.selectedTodoId = -1;
  }
  /**
   * List all todo
   */
  getAllToDos(){
  	this.todoService.getAllToDos().subscribe(

  		todos=>{
  			console.log(todos);
  			this.todos = todos;
  		}
  	);
  }
  /**
   * Create new todo
   * @param {string} title
   */
  createTodo(title:string){
    
    let complete: boolean = false;

    const newTodo:Todo = {title,complete} as Todo;

    this.todoService.createTodo(newTodo).subscribe(
      todo=>{
        this.todos.push(todo);
        this.closeCreateModal();
      }
      );

  }
  /**
   * Delete todo
   * @param {number} todoId
   */
  deleteTodo(){
    if(this.selectedTodoId != -1){
      this.todoService.deleteTodo(this.selectedTodoId).subscribe(
        (_)=>{
          this.closeDeleteModal();
          this.todos = this.todos.filter(
            (t)=>t.id != this.selectedTodoId
          );
          console.log(this.todos);
        }
      );
    }else{
      console.log('No todo is selected');
    }

  }
  /**
   * Change todo status
   * @param {Todo} todo
   */
  changeTodoStatus(todo: Todo){
    //negate
    todo.complete = !todo.complete;

    this.todoService.updateTodo(todo).subscribe(
        todo=>{
          console.log(todo);
        }
     );

  }
  /**
   * Change todo title
   * @param {string} title
   */
  changeTitle(title: string){
   if(this.selectedTodo){
     this.todoService.updateTodo(this.selectedTodo).subscribe(
         todo=>{
           this.closeEditModal();
         }
       );
   }
  }
  /**
   * Show create modal
   */
  showCreateModal(){
    this.isCreateModal = true;
  }
  /**
   * Close create modal
   */
  closeCreateModal(){
    this.isCreateModal = false;
  }
  /**
   * Show edit modal
   * @param {Todo} selectedTodo
   */
  showEditModal(selectedTodo:Todo){
    this.selectedTodo = selectedTodo;
    this.isEditModal = true;
  }
  /**
   * Close edit modal
   */
  closeEditModal(){
    this.isEditModal = false;
  }
  /**
   * Show delete modal
   * @param {number} selectedTodoId
   */
  showDeleteModal(selectedTodoId: number){
    this.selectedTodoId = selectedTodoId;
    this.isDeleteModal = true;
    console.log(this.selectedTodoId);
  }
  /**
   * Close delete modal
   */
  closeDeleteModal(){
    this.isDeleteModal = false;
  }

}
