import api from "../axios";
import { Book } from "../types/book";

const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await api.get("/books");
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error("Failed to fetch books");
  }
};

const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await api.post("/books", newBook);
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
    throw new Error("Failed to add book");
  }
};

const Bookservice = {
  fetchBooks,
  addBook,
};

export default Bookservice;
