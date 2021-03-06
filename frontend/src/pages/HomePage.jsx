import React, { useState } from "react";
import axios from "axios";
import ButtonGroup from "../components/ButtonGroup";
import ShowStudent from "../components/ShowStudent";
import AddStudent from "../components/AddStudent";
import DeleteStudent from "../components/DeleteStudent";
import ShowSubject from "../components/ShowSubject";
import AddSubject from "../components/AddSubject";
import EditSubject from "../components/EditSubject";
import DeleteSubject from "../components/DeleteSubject";

const HomePage = () => {
  const [selectedButton, setSelectedButton] = useState();
  const [selectedData, setSelectedData] = useState();
  const [studentData, setStudentData] = useState();
  const [subjectData, setSubjectData] = useState();

  const loadData = async (value) => {
    if (value === "Show Student") {
      const result = await loadStudent();
      setStudentData(result);
      setSelectedData("Show Student");
    } else if (value === "Add Student") {
      setSelectedData("Add Student");
    } else if (value === "Delete Student") {
      const result = await loadStudent();
      setStudentData(result);
      setSelectedData("Delete Student");
    } else if (value === "Show Subject") {
      const result = await loadSubject();
      setSubjectData(result);
      setSelectedData("Show Subject");
    } else if (value === "Add Subject") {
      setSelectedData("Add Subject");
    } else if (value === "Edit Subject") {
      const result = await loadSubject();
      setSubjectData(result);
      setSelectedData("Edit Subject");
    } else if (value === "Delete Subject") {
      const result = await loadSubject();
      setSubjectData(result);
      setSelectedData("Delete Subject");
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
          <ShowStudent data={studentData} loadData={loadData} />
        ) : selectedData === "Add Student" ? (
          <AddStudent loadData={loadData} />
        ): selectedData === "Delete Student" ? (
          <DeleteStudent data={studentData} loadData={loadData} />
        ) : selectedData === "Show Subject" && subjectData ? (
          <ShowSubject data={subjectData} loadData={loadData} />
        ) : selectedData === "Add Subject" ? (
          <AddSubject loadData={loadData} />
        ) : selectedData === "Edit Subject" ? (
          <EditSubject data={subjectData} loadData={loadData} />
        ) : selectedData === "Delete Subject" ? (
          <DeleteSubject data={subjectData} loadData={loadData} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default HomePage;
