import React from "react";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import styles from "../styles/Note.module.css";
import { formateDate } from "../utils/formateDate";

interface NoteProps {
  note: NoteModel;
  className?: string;
}

const Note = (props: NoteProps) => {
  const { title, text, createdAt, updatedAt } = props.note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formateDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formateDate(createdAt);
  }

  return (
    <div>
      <Card className={`${styles.noteCard} ${props.className}`}>
        <Card.Body className={styles.cardBody}>
          <Card.Title>{title}</Card.Title>
          <Card.Text className={styles.noteText}>{text}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
      </Card>
    </div>
  );
};

export default Note;
