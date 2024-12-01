import axios from "axios";

const authService = {
  async login(email: string, password: string) {
    const { data } = await axios.post("/api/login", { email, password });
    return data;
  },
};

export default authService;
