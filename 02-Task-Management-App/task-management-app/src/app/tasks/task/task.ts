import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

import { TaskInterface } from './task.model';
import { Card } from "../../shared/card/card";

@Component({
  selector: 'app-task',
  imports: [Card, DatePipe],
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