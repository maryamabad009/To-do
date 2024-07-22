import React, { useState } from 'react';
import { Navbar, Container, Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import './NewTaskPage.css';

const NewTaskPage = ({ lists }) => {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [repeat, setRepeat] = useState('No repeat');
  const [selectedList, setSelectedList] = useState(lists[0]?.name || 'Default');
  const [isListening, setIsListening] = useState(false);

  const handleTaskNameChange = (e) => setTaskName(e.target.value);
  const handleDueDateChange = (e) => setDueDate(e.target.value);
  const handleDueTimeChange = (e) => setDueTime(e.target.value);
  const handleRepeatChange = (e) => setRepeat(e.target.value);
  const handleListChange = (e) => setSelectedList(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save the task
    console.log({ taskName, dueDate, dueTime, repeat, selectedList });
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support voice recognition.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTaskName(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="new-task-page">

      <Navbar expand="lg" className="navbar-custom">
        <Container fluid>
          <Row className="w-100">
            <Col xs="auto">
              <a href="/" className="back-button">
                <FontAwesomeIcon icon={faArrowLeft} />
              </a>
            </Col>
            <Col className="text-center">
              <Navbar.Brand>New Task</Navbar.Brand>
            </Col>
          </Row>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="taskName">
                <Form.Label>Enter Task</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="text"
                    value={taskName}
                    onChange={handleTaskNameChange}
                    placeholder="Task name"
                  />
                  <button
                    type="button"
                    className="voice-button"
                    onClick={handleVoiceInput}
                    disabled={isListening}
                  >
                    <FontAwesomeIcon icon={faMicrophone} />
                  </button>
                </div>
              </Form.Group>

              <Form.Group controlId="dueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={dueDate}
                  onChange={handleDueDateChange}
                />
              </Form.Group>

              <Form.Group controlId="dueTime">
                <Form.Label>Due Time</Form.Label>
                <Form.Control
                  type="time"
                  value={dueTime}
                  onChange={handleDueTimeChange}
                />
              </Form.Group>

              <Form.Group controlId="repeat">
                <Form.Label>Repeat</Form.Label>
                <Form.Control as="select" value={repeat} onChange={handleRepeatChange}>
                  <option>No repeat</option>
                  <option>Once a day</option>
                  <option>Once a week</option>
                  <option>Once a month</option>
                  <option>Once a year</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="addToList">
                <Form.Label>Add to List</Form.Label>
                <Form.Control as="select" value={selectedList} onChange={handleListChange}>
                  {lists.map((list, index) => (
                    <option key={index} value={list.name}>{list.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <button type="submit" className="fab">
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewTaskPage;