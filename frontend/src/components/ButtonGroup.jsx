import React from "react";

const ButtonGroup = (props) => {
  return (
    <div className="d-flex justify-content-center">
      <button
        className="btn btn-lg btn-primary mx-2 px-3"
        onClick={()=>{props.loadData( `Show ${props.value}`)}}
      >
       { `Show ${props.value}`}
      </button>
      <button
        className="btn btn-lg btn-primary mx-2 px-3"
        onClick={()=>{props.loadData( `Add ${props.value}`)}}
      >
       { `Add ${props.value}`}
      </button>
      <button
        className="btn btn-lg btn-primary mx-2 px-3"
        onClick={()=>{props.loadData(`Edit ${props.value}`)}}
      >
       { `Edit ${props.value}`}
      </button>
      <button
        className="btn btn-lg btn-primary mx-2 px-3"
        onClick={()=>{props.loadData(`Delete ${props.value}`)}}
      >
       { `Delete ${props.value}`}
      </button>
    </div>
  );
};

export default ButtonGroup;
