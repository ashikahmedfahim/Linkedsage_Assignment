import React,{useState} from "react";
import axios from "axios";
import ButtonGroup from "./components/ButtonGroup";

function App() {
  const [selectedButton, setSelectedButton] = useState();

  const loadData = (value) => {
    console.log(value);
  }
  const loadStudent = async () => {
    const result = await axios.get("http://localhost:5000/api/students");
    console.log(result.data);
  };
  const loadSubject = () => {};
  return (
    <div className="container my-5">
      <h1 className="display-1 text-center">Linkedsage Assignment</h1>
      <div className="d-flex justify-content-center p-5">
        <button
          className="btn btn-lg btn-primary mx-2 px-3"
          onClick={()=>{setSelectedButton("Student")}}
        >
          Student
        </button>
        <button
          className="btn btn-lg btn-primary mx-2 px-3"
          onClick={()=>{setSelectedButton("Subject")}}
        >
          Subject
        </button>
      </div>
     <div>
       {selectedButton && <ButtonGroup value={selectedButton} loadData={loadData}/>}
     </div>
    </div>
  );
}

export default App;
