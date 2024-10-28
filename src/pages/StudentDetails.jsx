import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentById, updateStudent } from "../API/MainAPI";
import { Form, Button, Container, Modal } from "react-bootstrap";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    studentCode: "",
    isActive: false,
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      const studentData = await getStudentById(id);
      if (studentData) {
        setStudent(studentData);
      }
    };
    fetchStudent();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(id, student);
      alert("Student updated successfully");
      const updatedStudent = await getStudentById(id); // Lấy lại dữ liệu sau khi cập nhật
      setStudent(updatedStudent); // Cập nhật lại state với dữ liệu mới
      setShowModal(false); // Đóng modal
      navigate("/"); // Chuyển hướng về trang danh sách
    } catch (error) {
      console.error("Failed to update student:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Student Details</h2>
      <p>
        <strong>Name:</strong> {student.name}
      </p>
      <p>
        <strong>Code:</strong> {student.studentCode}
      </p>
      <p>
        <strong>Status:</strong> {student.isActive ? "Active" : "In-active"}
      </p>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Update Student
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={student.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formCode" className="mt-3">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                name="studentCode" // Chỉnh sửa lại tên trường
                value={student.studentCode}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formIsActive" className="mt-3">
              <Form.Check
                type="checkbox"
                name="isActive"
                label="Active"
                checked={student.isActive}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Update Student
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default StudentDetails;
