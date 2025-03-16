import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private selectedTaskSubject = new BehaviorSubject<any | null>(null);

  constructor() {
    // 📌 Inicializar con algunas tareas de prueba
    this.tasksSubject.next([
      {
        id: 1,
        title: 'Tarea 1',
        description: 'Descripción 1',
        status: 'Pendiente',
      },
      {
        id: 2,
        title: 'Tarea 2',
        description: 'Descripción 2',
        status: 'En curso',
      },
    ]);
  }

  getAllTasks(): Observable<any[]> {
    return this.tasksSubject.asObservable();
  }

  setSelectedTask(task: Task): void {
    this.selectedTaskSubject.next(task);
  }

  getSelectedTask(): Observable<Task> {
    return this.selectedTaskSubject.asObservable();
  }

  addTask(task: Task) {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([
      ...currentTasks,
      { ...task, id: currentTasks.length + 1 },
    ]);
  }

  updateTask(updatedTask: Task) {
    this.tasksSubject.next(
      this.tasksSubject.value.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  }

  deleteTask(id: number) {
    this.tasksSubject.next(
      this.tasksSubject.value.filter((task: Task) => task.id !== id)
    );
  }
}
