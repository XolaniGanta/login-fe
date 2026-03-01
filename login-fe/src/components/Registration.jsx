import { useState } from "react";
import { register } from "../services/loginService";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ui.css";

export default function Registration() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
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
            await register(form);
            navigate("/login");
        } catch (err) {
            setError(err?.message || "Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="u-page">
            <div className="card" role="form" aria-labelledby="register-title">
                <h2 id="register-title" className="h2 u-text-center">Create account</h2>

                {error && (
                    <p className="alert alert--error" role="alert" aria-live="assertive">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="form" noValidate>
                    <div className="form-field">
                        <label htmlFor="firstName" className="label">First name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            className="input"
                            placeholder="First name"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            autoComplete="given-name"
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="lastName" className="label">Last name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            className="input"
                            placeholder="Last name"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                            autoComplete="family-name"
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="email" className="label">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="input"
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
                            type="password"
                            name="password"
                            className="input"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                            minLength={8}
                        />
                        <div className="help">Use at least 8 characters.</div>
                    </div>

                    <div className="actions">
                        <button
                            type="submit"
                            className="btn btn--primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating account..." : "Register"}
                        </button>
                    </div>
                </form>

                <p className="u-text-center mt-2 text-muted">
                    Already have an account?{" "}
                    <Link to="/login" className="link">Sign in</Link>
                </p>
            </div>
        </div>
    );
}