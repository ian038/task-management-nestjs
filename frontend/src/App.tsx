import { Fragment } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from './components/Main';
import { TaskCreation } from './components/tasks/TaskCreation';
import { TaskUpdate } from './components/tasks/TaskUpdate';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create" element={<TaskCreation />} />
          <Route path="/update/:taskId" element={<TaskUpdate />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
