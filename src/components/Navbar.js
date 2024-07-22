import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faList, faShoppingCart, faBriefcase, faCheck, faPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; // Import the CSS file
import './Global.css'; // Import the CSS file
const AppNavbar = ({ lists, setLists }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  const handleShowDialog = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);
  const handleInputChange = (e) => setNewListName(e.target.value);
  
  const handleAddList = () => {
    if (newListName.trim()) {
      setLists([...lists, { name: newListName.trim(), icon: faList }]);
      setNewListName('');
      handleCloseDialog();
    }
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-custom">
        <Container fluid>
          <Row className="w-100">
            <Col xs="auto">
              <Navbar.Brand href="#home">
                <FontAwesomeIcon icon={faCheckCircle} size="2x" className="brand-icon" />
              </Navbar.Brand>
            </Col>
            <Col className="text-center">
              <Nav className="mx-auto">
                <NavDropdown title="All lists" id="basic-nav-dropdown">
                  {lists.map((list, index) => (
                    <NavDropdown.Item href={`#${list.name.toLowerCase()}`} key={index}>
                      <FontAwesomeIcon icon={list.icon} className="mr-2" />
                      {list.name}
                    </NavDropdown.Item>
                  ))}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleShowDialog}>
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    New List
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Col>
            <Col xs="auto" className="ml-auto d-flex align-items-center">
              <Form inline className="d-flex align-items-center">
                <div className={`search-container ${searchVisible ? 'visible' : ''}`}>
                  <FormControl
                    type="text"
                    placeholder="Search tasks"
                    className="search-input"
                  />
                </div>
                <Button variant="outline-light" onClick={handleSearchClick} className="search-button">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Navbar>

      {/* Plus Button for Adding New Task */}
      <Button
        variant="primary"
        className="add-task-button"
        href="/new-task"
      >
        <FontAwesomeIcon icon={faPlus} size="lg" />
      </Button>

      {/* Modal for Adding New List */}
      <Modal show={showDialog} onHide={handleCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>New List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>List Name</Form.Label>
            <Form.Control
              type="text"
              value={newListName}
              onChange={handleInputChange}
              placeholder="Enter new list name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddList}>
            Add List
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppNavbar;
