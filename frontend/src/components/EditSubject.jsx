import React, { useState } from "react";
import axios from "axios";

const EditSubject = (props) => {
  const [newName, setNewName] = useState("");
  const handleSave = async (value) => {
    if (newName) {
      const result = await axios.put(`http://localhost:5000/api/subjects/${value}`, {
        name: newName,
      });
      if(!result.error) return props.loadData("Show Subject");
    }
  };
  return (
    <div className="p-5">
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col"></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.data.data.map((subject) => (
            <tr key={subject._id}>
              <td>{subject.name}</td>
              <td>
                {subject.students &&
                  subject.students.map((student) => (
                    <span key={student + Math.random()}>
                      {student.name + ", "}
                    </span>
                  ))}
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Enter New Name"
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                />
              </td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    handleSave(subject._id);
                  }}
                  disabled={newName.length ? false : true}
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditSubject;
