import { Component, inject, signal, Signal } from '@angular/core';
import {
  Task,
  TaskService,
  TaskStatus,
} from '../../services/task/task.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  imports: [NgFor, AsyncPipe, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;
  selectedTask: Task | null = null;
  isAddTask = signal<boolean>(false);

  statuses: TaskStatus[] = ['Pendiente', 'En curso', 'Terminado'];

  constructor() {}

  addTask() {
    this.isAddTask.set(true);
  }

  editTask(task: Task) {
    this.selectedTask = { ...task };
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    if (this.selectedTask?.id === id) {
      this.closeForm();
    }
  }

  updateStatus(task: Task, event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      this.taskService.updateTask({
        ...task,
        status: target.value as TaskStatus,
      });
    }
  }

  closeForm() {
    this.selectedTask = null;
  }
}
