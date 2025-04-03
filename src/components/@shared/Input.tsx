import { FormikProps } from "formik";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  formikAndName: { formik: FormikProps<any>; name: string };
}

const style: React.CSSProperties = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

export function Input(props: InputProps) {
  const { formik, name } = props.formikAndName;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(name, event.target.value);
  };

  return <input style={style} {...props} onChange={handleChange} />;
}
