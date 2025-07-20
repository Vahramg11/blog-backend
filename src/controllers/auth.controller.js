import * as authService from "../services/auth.service.js";

export async function register(req, res) {
  const { email, password, username } = req.body;
  console.log(req.body);
  
  if (!email || !password || !username) {
    return res.status(400).json({ error: "Email  username and password required" });
  }

  try {
    const user = await authService.registerUser(email, password, username);
    return res.status(201).json({ message: "User created", userId: user.id });
  } catch (error) {
    if (error.message === "User already exists") {
      return res.status(409).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error haha" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const { token } = await authService.loginUser(email, password);
    return res.json({ token });
  } catch (error) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}


export const getMe = async (req, res) => {
  try {
    const userId = req.userId
    console.log("userId", userId);
    
    const user = await authService.getMeService(userId);
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};