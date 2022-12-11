import { Component } from '@angular/core';
import { Task } from '../../Task';
import { Subscription } from 'rxjs';

import { UiService } from 'src/app/services/ui.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  tasks: Task[] = [];
  showAddTask: boolean = false;
  private subscription: Subscription;

  constructor(private TaskService: TaskService, private uiService:UiService) {
    this.subscription = this.uiService
    .onToggle()
    .subscribe(
      (value: boolean) => (this.showAddTask = value)
    )
  }

  ngOnInit(): void {
    this.TaskService.getTasks().subscribe((tasks) => {
      return (this.tasks = tasks);
    });
  }

  deleteTask(task:Task) {
    this.TaskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter(t => t.id !== task.id))
      );
  }

  toggleReminder(task:Task) {
    task.reminder = !task.reminder;
    this.TaskService.updateTaskReminder(task).subscribe()
  }

  addTask(task: Task) {
    this.TaskService.addTask(task).subscribe((task) => {
      (this.tasks.push(task));
    });
  }
}
