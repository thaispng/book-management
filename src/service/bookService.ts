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

const updateBook = async (
  id: string,
  updatedBook: Partial<Book>
): Promise<Book> => {
  try {
    const response = await api.put(`/books/${id}`, updatedBook);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw new Error("Failed to update book");
  }
};

const deleteBook = async (id: string): Promise<void> => {
  try {
    await api.delete(`/books/${id}`);
  } catch (error) {
    console.error("Error deleting book:", error);
    throw new Error("Failed to delete book");
  }
};

const Bookservice = {
  fetchBooks,
  addBook,
  updateBook,
  deleteBook,
};

export default Bookservice;
