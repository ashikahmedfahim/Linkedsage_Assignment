import React from "react";

const ShowStudent = (props) => {
  return (
    <div className="p-5">
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">E-mail</th>
            <th scope="col">Phone</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">Subjects</th>
          </tr>
        </thead>
        <tbody>
          {props.data.data.map((student)=>(
             <tr key={student._id}>
             <td>{student.name}</td>
             <td>{student.email}</td>
             <td>{student.phone}</td>
             <td>{student.dob.slice(0,10)}</td>
             <td>{student.subjects && student.subjects.map((subject)=>(
              <span key={subject + Math.random()}>{subject.name  + ", "}</span>
             ))}</td>
           </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowStudent;
