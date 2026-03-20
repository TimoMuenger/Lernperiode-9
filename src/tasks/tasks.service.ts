import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  findAll(): Task[] {
    return this.tasks;
  }

  create(text: string): Task {
    const newTask: Task = {
      id: Date.now(),
      text: text,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  remove(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
