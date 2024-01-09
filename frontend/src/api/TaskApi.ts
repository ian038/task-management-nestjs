type Task = {
  name: string;
  description: string;
  due_date: Date;
};

const BASE_URL: string = 'http://localhost:3001';

/**
 * Sends a GET request for all existing tasks.
 * @returns Array of tasks
 */
async function GetAllTasks() {
  const res = await fetch(`${BASE_URL}/task`, { method: 'GET' });
  return res.json();
}

/**
 * Sends a GET request for one task.
 * @returns Array of tasks
 */
async function GetTask(id: string) {
  const res = await fetch(`${BASE_URL}/task/${id}`, { method: 'GET' });
  return res.json();
}

/**
 * Sends a POST request for a new task.
 * @param {Task Object} newTask
 * @returns New Task
 */
async function CreateTask(newTask: Task) {
  const res = await fetch(`${BASE_URL}/task/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask),
  });
  return await res.json();
}

/**
 * Sends a PATCH request for a task update.
 * @param {Task} updateTask
 * @returns Updated task
 */
async function UpdateTask(id: string, updateTask: Task) {
  const res = await fetch(`${BASE_URL}/task/update/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateTask),
  });
  return await res.json();
}

export { GetAllTasks, GetTask, CreateTask, UpdateTask };
