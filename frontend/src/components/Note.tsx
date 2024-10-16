import React from "react";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import styles from '../styles/Note.module.css'

interface NoteProps {
  note: NoteModel;
}

const Note = (props: NoteProps) => {
  const { title, text, createdAt, updatedAt } = props.note;
  return (
    <div>
      <Card className={styles.noteCard}>
        <Card.Title >{title}</Card.Title>
        <Card.Text className={styles.noteText}>{text}</Card.Text>
      </Card>
    </div>
  );
};

export default Note;
