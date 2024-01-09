import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

// const createTask = new Task('First', 'first task', new Date('2024-06-21'))

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            find: jest.fn().mockResolvedValue([
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
            ]),
            create: jest
              .fn()
              .mockImplementation((task: CreateTaskDto) =>
                Promise.resolve({ id: 1, ...task }),
              ),
            update: jest
              .fn()
              .mockImplementation((id: string, updateTask: UpdateTaskDto) =>
                Promise.resolve({ id, ...updateTask }),
              ),
            findOneBy: jest.fn().mockImplementation(() =>
              Promise.resolve({
                name: 'Find 1',
                description: 'Updated Task',
                due_date: new Date('2024-06-25'),
                id: 1,
              }),
            ),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
  });

  describe('create task', () => {
    it('it should create task', async () => {
      const newTaskDto: CreateTaskDto = {
        name: 'First',
        description: 'first task',
        due_date: new Date('2024-06-21'),
      };
      await expect(taskController.create(newTaskDto)).resolves.toEqual({
        id: 1,
        ...newTaskDto,
      });
    });
  });

  describe('get all tasks', () => {
    it('it should get all tasks', async () => {
      await expect(taskController.findAll()).resolves.toEqual([
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
      ]);
    });
  });

  describe('update task', () => {
    it('should update a task', async () => {
      const updateTaskDTO: UpdateTaskDto = {
        name: 'Find 1',
        description: 'Updated Task',
        due_date: new Date('2024-06-25'),
      };
      await expect(taskController.update('1', updateTaskDTO)).resolves.toEqual({
        id: 1,
        ...updateTaskDTO,
      });
    });
  });
});
