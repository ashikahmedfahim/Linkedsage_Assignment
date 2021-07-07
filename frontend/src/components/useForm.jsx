import { useState } from "react";

export const useForm = (init) => {
  const [values, setValues] = useState(init);
  return [
    values,
    (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    },
  ];
};
