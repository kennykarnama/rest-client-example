import { Component, OnInit } from '@angular/core';
import { Todo } from './Todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
 
  todos:Todo[];

  isDeleteModal:boolean;
  isCreateModal:boolean;
  isEditModal:boolean;
  selectedTodoId:number;
  selectedTodo:Todo;

  constructor(private todoService: TodoService) { 
  }

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

  changeTodoStatus(todo: Todo){
    //negate
    todo.complete = !todo.complete;

    this.todoService.updateTodo(todo).subscribe(
        todo=>{
          console.log(todo);
        }
     );

  }

  changeTitle(title: string){
   if(this.selectedTodo){
     this.todoService.updateTodo(this.selectedTodo).subscribe(
         todo=>{
           this.closeEditModal();
         }
       );
   }
  }

  showCreateModal(){
    this.isCreateModal = true;
  }

  closeCreateModal(){
    this.isCreateModal = false;
  }

  showEditModal(selectedTodo:Todo){
    this.selectedTodo = selectedTodo;
    this.isEditModal = true;
  }

  closeEditModal(){
    this.isEditModal = false;
  }

  showDeleteModal(selectedTodoId: number){
    this.selectedTodoId = selectedTodoId;
    this.isDeleteModal = true;
    console.log(this.selectedTodoId);
  }

  closeDeleteModal(){
    this.isDeleteModal = false;
  }

}
