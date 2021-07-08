import React, { useState, useEffect } from "react";
import { useForm } from "./useForm";
import axios from "axios";

const AddSubject = (props) => {
  const [form, setForm] = useForm({ name: "", student: "" });
  const [isFilledUP, setIsFilledUP] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const st = [];
    let startIndex = 0;
    let endIndex = 0;
    for (let i = 0; i < form.student.length; i++) {
      if (form.student[i] === " " || i === form.student.length - 1) {
        endIndex = i;
        st.push(
          form.student.slice(
            startIndex,
            i === form.student.length - 1 ? endIndex + 1 : endIndex
          )
        );
        startIndex = endIndex + 1;
      }
    }
    const result = await axios.post("http://localhost:5000/api/subjects", {
      name: form.name,
      students: [...st],
    });
    props.loadData("Show Subject");
  };

  useEffect(() => {
    form.name.length && form.student.length
      ? setIsFilledUP(true)
      : setIsFilledUP(false);
  }, [form]);

  return (
    <div className="row justify-content-center p-5">
      <form className="col-4 ">
        <div className="form-group">
          <input
            className="form-control m-1"
            placeholder="Enter Subject Name"
            value={form.name}
            name="name"
            onChange={setForm}
          ></input>
          <input
            className="form-control m-1"
            placeholder="Enter Students Name separated by space"
            value={form.student}
            name="student"
            onChange={setForm}
          ></input>
        </div>
        <div className="row">
          <button
            className="btn btn-success col-4 offset-4 my-3"
            onClick={handleSubmit}
            disabled={isFilledUP ? false : true}
          >
            Add Subject
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubject;
