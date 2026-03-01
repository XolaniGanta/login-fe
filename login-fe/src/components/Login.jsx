import { useState } from "react";
import { login } from "../services/loginService";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ui.css"; 

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(form);
      navigate("/user");
    } catch (err) {
      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="u-page">
      <div className="card" role="form" aria-labelledby="login-title">
        <h2 id="login-title" className="h2 u-text-center">Login</h2>

        {error && (
          <p className="alert alert--error" role="alert" aria-live="assertive">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="form" noValidate>
          <div className="form-field">
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              className="input"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-field">
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              className="input"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="actions">
            <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="u-text-center mt-2 text-muted">
          Don’t have an account?{" "}
          <Link to="/register" className="link">Register here</Link>
        </p>
      </div>
    </div>
  );
}