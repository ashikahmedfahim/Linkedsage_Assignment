import React from "react";
import axios from "axios";

const ShowSubject = (props) => {

  const handleDelete =async (value)=>{
    await axios.delete(`http://localhost:5000/api/subjects/${value}`);
    props.loadData("Show Subject");
  }
  return (
    <div className="p-5">
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col"></th>
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
                    <span key={student + Math.random()}>{student.name + ", "}</span>
                  ))}
              </td>
              <td><button className="btn btn-danger btn-sm" onClick={()=>{handleDelete(subject._id)}}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowSubject;
