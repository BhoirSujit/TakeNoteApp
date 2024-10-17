import { ConflictError, UnauthoriseError } from "../errors/http_errors";
import { Note } from "../models/note";
import { User } from "../models/user";

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData(
    import.meta.env.VITE_BACKEND + "/api/users",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
}

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, { ...init, credentials: "include" });

  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;

    if (response.status === 401) throw new UnauthoriseError(errorMessage);
    else if (response.status === 409) throw new ConflictError(errorMessage);
    else
      throw Error(
        "Request failed with status: " +
          response.status +
          " message is : " +
          errorMessage
      );
  }
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData(
    import.meta.env.VITE_BACKEND + "/api/users/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );
  return response.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData(
    import.meta.env.VITE_BACKEND + "/api/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );
  return response.json();
}

export async function logout() {
  await fetchData(import.meta.env.VITE_BACKEND + "/api/users/logout", {
    method: "POST",
  });
}

export async function fetchNote(): Promise<Note[]> {
  const response = await fetchData(
    import.meta.env.VITE_BACKEND + "/api/notes",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchData(
    import.meta.env.VITE_BACKEND + "/api/notes",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(note),
    }
  );

  return response.json();
}

export async function deleteNote(noteId: string) {
  await fetchData(import.meta.env.VITE_BACKEND + "/api/notes/" + noteId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetchData(
    import.meta.env.VITE_BACKEND + "/api/notes/" + noteId,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(note),
    }
  );

  return response.json();
}
