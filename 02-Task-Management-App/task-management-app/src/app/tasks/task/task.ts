import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TaskInterface } from './task.model';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css'
})

export class Task {
  @Input({ required:true}) task!: TaskInterface;
  @Output() complete= new EventEmitter<string>();

  onCompleteTask(){
    this.complete.emit(this.task.id);
  }
}