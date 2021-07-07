import React, { useState } from "react";
import axios from "axios";
import ButtonGroup from "./components/ButtonGroup";
import ShowStudent from "./components/ShowStudent";
import ShowSubject from "./components/ShowSubject";
import AddSubject from "./components/AddSubject";
import DeleteSubject from "./components/DeleteSubject";

function App() {
  const [selectedButton, setSelectedButton] = useState();
  const [selectedData, setSelectedData] = useState();
  const [studentData, setStudentData] = useState();
  const [subjectData, setSubjectData] = useState();

  const loadData = async (value) => {
    console.log(value);
    if (value === "Show Student") {
      const result = await loadStudent();
      setSelectedData("Show Student");
      setStudentData(result);
    } else if (value === "Show Subject") {
      const result = await loadSubject();
      setSelectedData("Show Subject");
      setSubjectData(result);
    } else if (value === "Add Subject") {
      setSelectedData("Add Subject");
    } else if (value === "Delete Subject") {
      const result = await loadStudent();
      setSelectedData("Delete Subject");
      setStudentData(result);
    }
  };
  const loadStudent = async () => {
    return await axios.get("http://localhost:5000/api/students");
  };
  const loadSubject = async () => {
    return await axios.get("http://localhost:5000/api/subjects");
  };
  return (
    <div className="container my-5">
      <h1 className="display-1 text-center">Linkedsage Assignment</h1>
      <div className="d-flex justify-content-center p-5">
        <button
          className="btn btn-lg btn-primary mx-2 px-3"
          onClick={() => {
            setSelectedButton("Student");
          }}
        >
          Student
        </button>
        <button
          className="btn btn-lg btn-primary mx-2 px-3"
          onClick={() => {
            setSelectedButton("Subject");
          }}
        >
          Subject
        </button>
      </div>
      <div>
        {selectedButton && (
          <ButtonGroup value={selectedButton} loadData={loadData} />
        )}
        {selectedData && selectedData === "Show Student" && studentData ? (
          <ShowStudent data={studentData}  loadData={loadData}/>
        ) : selectedData === "Show Subject" && subjectData ? (
          <ShowSubject data={subjectData}  loadData={loadData}/>
        ) : selectedData === "Add Subject" ? (
          <AddSubject  loadData={loadData}/>
        ) : selectedData === "Delete Subject" ? (
          <DeleteSubject data={subjectData} loadData={loadData}/>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
