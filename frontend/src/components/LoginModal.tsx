import { useState } from "react";
import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../api/notes_api";
import * as NotesApi from "../api/notes_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputFeild from "./form/TextInputFeild";
import styleUtils from "../styles/utils.module.css";
import { UnauthoriseError } from "../errors/http_errors";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LoginModal = (props: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await NotesApi.login(credentials);
      props.onLoginSuccessful(user);
    } catch (error) {
      if (error instanceof UnauthoriseError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }

      console.error(error);
    }
  }

  return (
    <Modal show onHide={props.onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputFeild
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />

          <TextInputFeild
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
