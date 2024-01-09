import { useNavigate } from 'react-router-dom';

type TaskTableProps = {
  tasks: Array<{
    id: number;
    name: string;
    description: string;
    due_date: Date;
    created_at: Date;
  }>;
};

const TaskTable = ({ tasks }: TaskTableProps) => {
  const navigate = useNavigate();

  const displayTaskStatus = (dueDate: Date) => {
    let status;
    const currentDate = new Date(Date.now());
    const timeDiff = dueDate.getTime() - currentDate.getTime();
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

    switch (true) {
      case daysDiff < 0:
        status = 'Overdue';
        break;
      case daysDiff <= 7:
        status = 'Urgent';
        break;
      default:
        status = 'Not Urgent';
        break;
    }

    return status;
  };

  return (
    <div className="w-1/2 rounded-xl sm:-mx-6 md:mx-0 overflow-x-auto">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-emerald-600">Created At</th>
            <th className="px-4 py-2 text-emerald-600">Name</th>
            <th className="px-4 py-2 text-emerald-600">Description</th>
            <th className="px-4 py-2 text-emerald-600">Due Date</th>
            <th className="px-4 py-2 text-emerald-600">Status</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task, idx) => (
            <tr
              key={idx}
              onClick={() => navigate(`/update/${task.id}`)}
              className="hover:cursor-pointer hover:bg-emerald-300"
            >
              <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                {new Date(task.created_at).toLocaleDateString()}
              </td>
              <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                {task.name}
              </td>
              <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                {task.description}
              </td>
              <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                {new Date(task.due_date).toLocaleDateString()}
              </td>
              <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                {displayTaskStatus(new Date(task.due_date))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { TaskTable };
