import { useState, useEffect } from 'react';
import { GetAllTasks } from '../api/TaskApi';
import { TaskTable } from './tasks/TaskTable';
import { Link } from 'react-router-dom';

const Main = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetAllTasks();
      if (result) setTasks(result);
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="py-8 flex space-y-3 lg:space-y-0 lg:flex-row min-h-12">
        <div>
          <h1 className="text-3xl font-bold leading-8 text-emerald-700">
            Task Management
          </h1>
        </div>
      </div>

      <div className="py-8 flex space-x-8 lg:flex-row min-h-12">
        <Link to="/create">
          <button className="flex justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
            Create Task
          </button>
        </Link>
      </div>

      <TaskTable tasks={tasks} />
    </div>
  );
};

export { Main };
