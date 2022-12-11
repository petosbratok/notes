import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs'

import { Task } from '../../Task';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter()
  title: string = '';
  text: string = '';
  day: string = '';
  reminder: boolean = false;
  showAddTask: boolean = true;
  private subscription: Subscription;

  constructor(private uiService:UiService) {
    this.subscription = this.uiService
    .onToggle()
    .subscribe(
      (value) => (this.showAddTask = value)
    )
  }

  onSubmit() {
    if (!this.text) {
      alert('Please add text')
      return
    }
    if (!this.day) {
      alert('Please select date')
      return
    }

    const newTask: Task = {
      title: this.title,
      text: this.text,
      day: this.day, 
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask);
    this.title = '';
    this.text = '';
    this.day = '';
    this.reminder = false;
  } 
}
