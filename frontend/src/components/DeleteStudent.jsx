import React from "react";
import axios from "axios";

const DeleteStudent = (props) => {
  const handleDelete = async (value) => {
    await axios.delete(`http://localhost:5000/api/students/${value}`);
    props.loadData("Show Student");
  };
  return (
    <div className="p-5">
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.data.data.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    handleDelete(student._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteStudent;
