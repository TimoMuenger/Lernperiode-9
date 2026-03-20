/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body('text') text: string) {
    return this.tasksService.create(text);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    //id wird in Zahl umgewandelt
    return this.tasksService.remove(+id);
  }
}
