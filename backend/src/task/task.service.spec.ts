import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';

const tasksArray = [
  {
    name: 'All 2',
    description: 'Task 2',
    due_date: new Date('2024-06-24'),
  },
  {
    name: 'All 3',
    description: 'Task 3',
    due_date: new Date('2024-06-25'),
  },
];

const newTaskDto: CreateTaskDto = {
  name: 'First',
  description: 'first task',
  due_date: new Date('2024-06-21'),
};

const updatedTaskDto: UpdateTaskDto = {
  name: 'Updated First',
  description: 'updated first task',
  due_date: new Date('2024-06-24'),
};

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepo: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          // define all the methods that you use from the catRepo
          // give proper return values as expected or mock implementations, your choice
          useValue: {
            findAll: jest.fn(),
            create: jest.fn().mockResolvedValue(newTaskDto),
            update: jest.fn().mockResolvedValue(updatedTaskDto),
            findOneBy: jest.fn().mockResolvedValue(updatedTaskDto),
            find: jest.fn().mockResolvedValue(tasksArray),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepo = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  describe('get tasks', () => {
    it('should return an array of cats', async () => {
      const tasks = await taskService.findAll();
      expect(tasks).toEqual(tasksArray);
    });
  });

  describe('create task', () => {
    it('it should create task', async () => {
      expect(taskService.create(newTaskDto)).resolves.toEqual(newTaskDto);
      expect(taskRepo.create).toHaveBeenCalledTimes(1);
      expect(taskRepo.create).toHaveBeenCalledWith(newTaskDto);
      expect(taskRepo.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('update task', () => {
    it('it should update task', async () => {
      expect(taskService.update(1, updatedTaskDto)).resolves.toEqual(
        updatedTaskDto,
      );
      expect(taskRepo.update).toHaveBeenCalledTimes(1);
      expect(taskRepo.update).toHaveBeenCalledWith(1, updatedTaskDto);
      expect(taskRepo.update).toHaveBeenCalledTimes(1);
    });
  });
});
