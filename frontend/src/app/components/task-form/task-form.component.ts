import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Task,
  TaskService,
  TaskStatus,
} from '../../services/task/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  @Output() closeForm = new EventEmitter<void>();

  taskForm: FormGroup;
  selectedTask$: Observable<any>;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['Pendiente', Validators.required],
    });

    this.selectedTask$ = this.taskService.getSelectedTask();
  }

  ngOnInit(): void {
    this.selectedTask$.subscribe((task) => {
      if (task) {
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          status: task.status || 'Pendiente',
        });
      }
    });
  }

  submit(): void {
    if (this.taskForm.valid) {
      const updatedTask = { ...this.taskForm.value };
      this.taskService.updateTask(updatedTask);
      this.closeForm.emit();
    }
  }
}
