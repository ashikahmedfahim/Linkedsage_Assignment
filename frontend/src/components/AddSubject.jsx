import React, { useState, useEffect } from "react";
import { useForm } from "./useForm";
import axios from "axios";

const AddSubject = (props) => {
  const [form, setForm] = useForm({ subjectName: "" });
  const [isFilledUP, setIsFilledUP] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:5000/api/subjects", {
      name: form.subjectName,
    });
    props.loadData("Show Subject");
  };

  useEffect(() => {
    form.subjectName.length ? setIsFilledUP(true) : setIsFilledUP(false);
  }, [form]);

  return (
    <div className="row justify-content-center p-5">
      <form className="col-4 ">
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Enter Subject Name"
            value={form.subjectName}
            name="subjectName"
            onChange={setForm}
          ></input>
        </div>
        {!isFilledUP ? <small className="form-text text-danger p-1">Subject name can not be empty</small> : <></>}
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
