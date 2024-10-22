import logo from "./logo.svg";
import "./App.css";
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

function App() {
  const [studentName, setStudentName] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [active, setActive] = useState("In-active");
  const [isChecked, setIsChecked] = useState("none");
  const [studentChecked, setStudentChecked] = useState([]);
  const [totalSelected, setTotalSelected] = useState(0);

  const [studentArr, setStudentArr] = useState([
    {
      name: "Nguyen Van A",
      code: "CODE12345",
      active: "Active",
    },
    {
      name: "Tran Van B",
      code: "CODE67890",
      active: "In-active",
    },
  ]);
  const handleAddNew = () => {
    const newStudent = {
      name: studentName,
      code: studentCode,
      active: active,
    };
    setStudentArr([...studentArr, newStudent]);
    setStudentName("");
    setStudentCode("");
  };

  const handleDelete = (indexArr) => {
    let updateStudentArr = studentArr.filter(
      (student, index) => index !== indexArr
    );
    setStudentArr(updateStudentArr);
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
            checked={active === "Active"}
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
            {studentArr &&
              studentArr.length > 0 &&
              studentArr.map((student, index) => {
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
                    <td>{student.name}</td>
                    <td>{student.code}</td>
                    <td>
                      <Button
                        className={
                          student.active === "Active"
                            ? "btn btn-info"
                            : "btn btn-warning"
                        }
                      >
                        {student.active}
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDelete(index);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default App;
