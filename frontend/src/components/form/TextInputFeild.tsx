import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFeildProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
  [x: string]: any;
}

const TextInputFeild = (props: TextInputFeildProps) => {
  return (
    <Form.Group className="mb-3" controlId={props.name + "-input"}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        {...props}
        {...props.register(props.name, props.registerOptions)}
        isInvalid={!!props.error}
      ></Form.Control>
      <Form.Control.Feedback type="invalid">
        {props.error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default TextInputFeild;
