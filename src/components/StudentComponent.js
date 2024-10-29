import React, { useEffect } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  Row,
  Form,
  Table,
} from "react-bootstrap";
import { useState } from "react";
import { createStudent, deleteStudent, getAllStudents } from "../API/MainAPI";
import { Link, useNavigate } from "react-router-dom";

const StudentComponent = () => {
  const [studentName, setStudentName] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [isActive, setActive] = useState(false);
  const [studentChecked, setStudentChecked] = useState([]);
  const [totalSelected, setTotalSelected] = useState(0);

  const [studentArr, setStudentArr] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllStudents().then((data) => {
      if (data) {
        setStudentArr(data);
      }
    });
  }, []);

  const handleStudentClick = (id) => {
    navigate(`/details/${id}`);
  };
  const handleAddNew = async () => {
    const newStudent = {
      name: studentName,
      studentCode: studentCode,
      isActive: isActive === "Active",
    };
    try {
      const createdStudent = await createStudent(newStudent);
      if (createdStudent) {
        setStudentArr((prevStudentArr) => [...prevStudentArr, createdStudent]);
        setStudentName("");
        setStudentCode("");
        setActive(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      setStudentArr(studentArr.filter((student) => student._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectedStudent = (index, checked) => {
    let newSelectedStudent = [...studentChecked];
    newSelectedStudent[index] = checked;
    setStudentChecked(newSelectedStudent);
    setTotalSelected(checked ? totalSelected + 1 : totalSelected - 1);
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>Total Selected Student: {totalSelected}</h2>
        </Col>
        <Col>
          <Button
            onClick={() => {
              setStudentArr([]);
              setTotalSelected(0);
              setStudentChecked([]);
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <FormControl
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Student name"
          ></FormControl>
          <FormControl
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
            className="my-3"
            placeholder="Student code"
          ></FormControl>
          <Form.Check
            checked={isActive === "Active"}
            onChange={(e) =>
              setActive(e.target.checked ? "Active" : "In-active")
            }
            type="checkbox"
            label="Still Active"
          ></Form.Check>
        </Col>
        <Col>
          <Button onClick={handleAddNew}>Add</Button>
        </Col>
      </Row>

      <Row className="mt-5">
        <Table>
          <thead>
            <tr>
              <th>Selected</th>
              <th>Student Name</th>
              <th>Student Code</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(studentArr) && studentArr.length > 0 ? (
              studentArr.map((students, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={studentChecked[index] || false}
                        onChange={(e) =>
                          handleSelectedStudent(index, e.target.checked)
                        }
                      ></Form.Check>
                    </td>
                    <td>
                      <Link to={`/details/${students._id}`}>
                        {students.name}
                      </Link>
                    </td>
                    <td>{students.studentCode}</td>
                    <td>
                      <Button
                        variant={students.isActive ? "success" : "secondary"}
                      >
                        {students.isActive === true ? "Active" : "In-active"}
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDelete(students._id);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">No students available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default StudentComponent;
