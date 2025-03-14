import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Task,
  TaskService,
  TaskStatus,
} from '../../services/task/task.service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  @Input() task: Task | null = null;
  @Output() closeForm = new EventEmitter<void>();

  fb = inject(FormBuilder);
  taskForm = this.fb.group({
    id: [null as number | null],
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: ['Pendiente' as TaskStatus],
  });

  statuses: TaskStatus[] = ['Pendiente', 'En curso', 'Terminado'];

  constructor(private taskService: TaskService) {}

  ngOnChanges() {
    if (this.task) {
      this.taskForm.patchValue(this.task);
    } else {
      this.taskForm.reset({ status: 'Pendiente' });
    }
  }

  submit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;

      if (this.task) {
        this.taskService.updateTask({ id: this.task.id, ...formValue } as Task);
      } else {
        this.taskService.addTask({ ...formValue, id: Date.now() } as Task);
      }

      this.taskForm.reset({ status: 'Pendiente' });
      this.closeForm.emit();
    }
  }
}
