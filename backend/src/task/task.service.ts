import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable({})
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.taskRepository.create(createTaskDto);
    await this.taskRepository.save(newTask);
    return newTask;
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      order: {
        created_at: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = this.taskRepository.findOneBy({ id });
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }
}
