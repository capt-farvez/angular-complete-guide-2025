import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-task',
  imports: [],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css'
})
export class NewTask {
  @Output() cancel = new EventEmitter<void>()

  onCancel() {
    this.cancel.emit();
  }
}
