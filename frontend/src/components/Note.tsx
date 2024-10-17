
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import styles from "../styles/Note.module.css";
import { formateDate } from "../utils/formateDate";
import { MdDelete } from "react-icons/md";
import stylesutil from "../styles/utils.module.css";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void,
  onDeleteNoteClicked: (note: NoteModel) => void;
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
      
      <Card
      onClick={ () => props.onNoteClicked(props.note)}
      className={`${styles.noteCard} ${props.className}`}>
        <Card.Body className={styles.cardBody}>
          <Card.Title className={stylesutil.flexCenter}>
            {title}
            <MdDelete
              className="text-muted ms-auto"
              onClick={(e) => {
                props.onDeleteNoteClicked(props.note);
                e.stopPropagation();
              }}
            />
          </Card.Title>
          <Card.Text className={styles.cardText}>{text}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
      </Card>
    </div>
  );
};

export default Note;
