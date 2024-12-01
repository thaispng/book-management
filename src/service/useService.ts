import api from "../axios";
import { User } from "../types/user";

const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data;
};

const service = {
  fetchUsers,
};

export default service;
