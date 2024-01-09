import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Task Module', () => {
    it('Create task, get all tasks, delete task and then update task', async () => {
      const task = {
        name: 'E2E',
        description: 'Task 1',
        due_date: new Date('2024-10-28'),
      };
      // Create
      const data = await request(app.getHttpServer())
        .post('/task/new')
        .send(task)
        .expect(201);
      expect(data.body).toEqual({
        ...task,
        due_date: task.due_date.toISOString(),
        id: expect.any(Number),
      });

      // Find All
      const tasks = await request(app.getHttpServer()).get('/task').expect(200);
      expect(tasks.body).toEqual(expect.any(Array));
      expect(tasks.body.length).toBe(1);
      expect(tasks.body[0]).toEqual({
        ...task,
        due_date: task.due_date.toISOString(),
        id: expect.any(Number),
      });

      // Update
      const taskV2 = await request(app.getHttpServer())
        .patch(`/task/update/${data.body.id}`)
        .send({
          description: 'updated task',
          due_date: new Date('2024-06-28'),
        })
        .expect(200);
      expect(taskV2.body).toEqual({
        ...data.body,
        id: data.body.id,
        description: 'updated task',
        due_date: new Date('2024-06-28').toISOString(),
      });
    });
  });
});
