const API_URL = "http://localhost:5108/api";
export const register = async (user) => {
    const res = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Registration failed");
    }
    return res.json();
};
export const login = async (user) => {
    const res = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Login failed");
    }
    const data = await res.json();
    localStorage.setItem("token", data.token);
    return data;
};
export const getUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");
    const res = await fetch(`${API_URL}/user/userDetails`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to fetch user");
    }
    return res.json();
};
export const logout = () => {
    localStorage.removeItem("token");
};