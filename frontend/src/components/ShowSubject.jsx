import React from "react";

const ShowSubject = (props) => {
  return (
    <div className="p-5">
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Students</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowSubject;
