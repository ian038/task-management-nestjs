import { FormEvent } from 'react';
import { CreateTask } from '../../api/TaskApi';
import { Link, useNavigate } from 'react-router-dom';

const TaskCreation = () => {
  const navigate = useNavigate();

  const createTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEventTarget = e.target as HTMLFormElement & {
      name: { value: string };
      description: { value: string };
      due_date: { value: string };
    };
    const newTask = {
      name: formEventTarget.name.value,
      description: formEventTarget.description.value,
      due_date: new Date(formEventTarget.due_date.value),
    };
    await CreateTask(newTask);
    formEventTarget.reset();
    navigate('/');
  };

  return (
    <div className="flex flex-col sm:px-6 lg:px-8 mt-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={createTask}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald-300 placeholder:text-gray-400 focus:ring-emerald-600 focus:border-emerald-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={10}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald-300 placeholder:text-gray-400 focus:ring-emerald-600 focus:border-emerald-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Due Date
              </label>
              <div className="mt-2">
                <input
                  id="date"
                  name="due_date"
                  type="date"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald-300 placeholder:text-gray-400 focus:ring-emerald-600 focus:border-emerald-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Create Task
              </button>
              <Link to="/">
                <button className="mt-10 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-emerald-500 shadow-sm hover:bg-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800">
                  Return to Main Page
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { TaskCreation };
