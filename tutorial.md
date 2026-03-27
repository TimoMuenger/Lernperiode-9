---
title: NestJS Tutorial
---

# Goal

A backend for a TS frontend

# Previous Knowledge

We'll assume you already know the basics of TS and already have a TS frontend to connect to the backed

# What you'll learn

You'll learen how to create a backend with NestJS

# Tutorial

**install NestJS CLL**

```bash
npm i -g @nestjs/cli
```

**generate project**

```bash
nest new proj-name
```

**generate controller, service and modules**

```bash
nest g resource name
```

**logic (entity)**

```typescript
//example entity.ts (defines how a task looks)
export class Task {
  id: number;
  text: string;
}
```

**logic (service)**

```typescript
//example services.ts (array and functions)
import { Injectable } from "@nestjs/common";
import { Task } from "./entities/task.entity";

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

  update(id: number, newText: string): Task | undefined {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex > -1) {
      this.tasks[taskIndex].text = newText;
      return this.tasks[taskIndex];
    }
    return undefined;
  }
}
```

**logic (controller)**

```typescript
// example controller.ts (HTTP-requests)
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body("text") text: string) {
    return this.tasksService.create(text);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    //id wird in Zahl umgewandelt
    return this.tasksService.remove(+id);
  }
  @Put(":id")
  update(@Param("id") id: string, @Body("text") text: string) {
    return this.tasksService.update(+id, text);
  }
}
```

**enable cors**

```typescript
//for the comunication between the front- and backend to work you need to enable cors in your main.ts file
app.enableCors();
```

**start the server**

```bash
npm run start:dev
```

# Result

As a result you should now be able to store something in the backend for me it is the tasks in the task app.
![image task app](image-1.png)

# What could go wrong?

1. I often forgot to move the shell to the right folder when i wanted to start the server so you need to run this command first

```bash
cd name-backend
```

2. Something where I was stuck very long was the point where I must have added Cors to the main.ts. So this is why I added it to my tutorial

```bash
app.enableCors()
```
