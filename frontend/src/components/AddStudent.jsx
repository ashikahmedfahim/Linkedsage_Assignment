import React, { useState, useEffect } from "react";
import { useForm } from "./useForm";
import axios from "axios";

const AddStudent = (props) => {
  const [form, setForm] = useForm({
    name: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [isFilledUP, setIsFilledUP] = useState(false);

  const checkForm = () =>
    form.name.length &&
    form.email.length &&
    form.phone.length &&
    form.dob.length &&
    form.phone.length === 9 &&
    form.phone[0] === "+";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:5000/api/students", {
      name: form.name,
      email: form.email,
      phone: form.phone,
      dob: form.dob,
    });
    props.loadData("Show Student");
  };

  useEffect(() => {
    console.log(checkForm());
    checkForm() ? setIsFilledUP(true) : setIsFilledUP(false);
  }, [form]);
  return (
    <div className="row justify-content-center p-5">
      <form className="col-4 ">
        <div className="form-group">
          <input
            className="form-control m-1"
            placeholder="Enter Student Name"
            value={form.name}
            name="name"
            onChange={setForm}
          ></input>
          <input
            className="form-control m-1"
            placeholder="Enter Student E-mail"
            value={form.email}
            name="email"
            onChange={setForm}
          ></input>
          <input
            className="form-control m-1"
            placeholder="Enter Student Phone i.e +12345678"
            value={form.phone}
            name="phone"
            onChange={setForm}
          ></input>
          <input
            className="form-control m-1"
            type="date"
            value={form.dob}
            name="dob"
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

export default AddStudent;
