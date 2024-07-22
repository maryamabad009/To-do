import React from 'react';
import './NoTasksIllustration.css'; // Create this CSS file to style the illustration
import illustration from '../images/task.png'; // Adjust the path if needed

const NoTasksIllustration = () => {
  return (
    <div className="no-tasks-container">
      <img src={illustration} alt="No Tasks" className="no-tasks-image" />
      <p className="no-tasks-text">You have no tasks!</p>
    </div>
  );
};

export default NoTasksIllustration;
