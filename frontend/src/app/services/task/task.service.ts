import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type TaskStatus = 'Pendiente' | 'En curso' | 'Terminado';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = new BehaviorSubject<Task[]>([
    {
      id: 1,
      title: 'Buy groceries',
      description: 'Milk, Bread, Cheese',
      status: 'Pendiente',
    },
    {
      id: 2,
      title: 'Complete project',
      description: 'Finish Angular CRUD app',
      status: 'En curso',
    },
  ]);
  tasks$ = this.tasks.asObservable();

  addTask(task: Task) {
    const currentTasks = this.tasks.value;
    this.tasks.next([
      ...currentTasks,
      { ...task, id: currentTasks.length + 1 },
    ]);
  }

  updateTask(updatedTask: Task) {
    this.tasks.next(
      this.tasks.value.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  }

  deleteTask(id: number) {
    this.tasks.next(this.tasks.value.filter((task: Task) => task.id !== id));
  }
}
