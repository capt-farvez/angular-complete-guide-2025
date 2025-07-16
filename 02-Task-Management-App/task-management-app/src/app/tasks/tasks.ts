import { Component, Input } from '@angular/core';

import { Task } from "./task/task";
import { NewTask } from './new-task/new-task';
import { type NewTaskData } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [Task, NewTask],
    templateUrl: './tasks.html',
    styleUrl: './tasks.css'
})

export class Tasks {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;

  isAddingTask = false;

  // Dependency Injection
  constructor(private tasksService: TasksService){}

  get selectedUserTasks(){
    return this.tasksService.getUserTasks(this.userId);
  }

  onCompleteTask(id: string){
    
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }

  // onAddTask (taskData: NewTaskData){
  //   this.isAddingTask = false;
  // }
}