const API_BASE_URL = "http://127.0.0.1:8000/admin_service"; // Change this if your backend URL differs

export const signUp = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token); // Store token
  return data.token;
};

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Invalid credentials");
  }

  const data = await response.json();

  // **🔹 Token Validation**
  if (!data.token || typeof data.token !== "string") {
    throw new Error("Invalid token received from server.");
  }

  // Store token if it's valid
  localStorage.setItem("token", data.token);
  return data.token;
};


export const getAuthToken = () => localStorage.getItem("token");

export const logout = () => {
  localStorage.removeItem("token");
};
