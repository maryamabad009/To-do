import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import NewTaskPage from './components/NewTaskPage';
import NoTasksIllustration from './components/NoTasksIllustration'; // Import the illustration component

import { faSearch, faList, faShoppingCart, faBriefcase, faCheck, faPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [lists, setLists] = useState([
    { name: "Default", icon: faList },
    { name: "Personal", icon: faList },
    { name: "Shopping", icon: faList },
    { name: "Work", icon: faList },
    { name: "Finished", icon: faCheck }
  ]);

  const [tasks, setTasks] = useState([]); // Add state for tasks

  const location = useLocation();
  const showNavbar = location.pathname !== '/new-task';

  return (
    <div className="app-container">
      {showNavbar && <AppNavbar lists={lists} setLists={setLists} />}
      {tasks.length === 0 ? (
        <NoTasksIllustration />
      ) : (
        <Routes>
          <Route path="/new-task" element={<NewTaskPage lists={lists} />} />
          {/* Add other routes here */}
        </Routes>
      )}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
