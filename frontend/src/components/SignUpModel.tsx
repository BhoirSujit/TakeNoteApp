import React from "react";
import { useForm } from "react-hook-form";
import { SignUpCredentials } from "../api/notes_api";
import * as NoteApi from "../api/notes_api";
import { Modal, Form, Button } from "react-bootstrap";
import TextInputFeild from "./form/TextInputFeild";
import styleUtils from "../styles/utils.module.css"

interface SignUpModelProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModel = (props: SignUpModelProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await NoteApi.signUp(credentials);
      props.onSignUpSuccessful(newUser);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={props.onDismiss}>
      <Modal.Header closeButton>Sign Up</Modal.Header>

      <Modal.Body>
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
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
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
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModel;
