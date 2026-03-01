import { useEffect, useState } from "react";
import { getUserDetails, logout } from "../services/loginService";
import { useNavigate } from "react-router-dom";
import "../styles/ui.css"; 

export default function UserDetails() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserDetails();
                setUser(data);
            } catch (err) {
                setError(err?.message || "Could not load user details.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="u-page">
                <div className="card u-text-center">
                    <h2 className="h2">User Details</h2>
                    <p className="text-muted">Loading…</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="u-page">
                <div className="card">
                    <h2 className="h2 u-text-center">User Details</h2>
                    <p className="alert alert--error" role="alert" aria-live="assertive">
                        {error}
                    </p>
                    <div className="actions">
                        <button className="btn btn--primary" onClick={() => window.location.reload()}>
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return null; // safety fallback
    }

    return (
        <div className="u-page">
            <div className="card u-stack-md">
                <h2 className="h2 u-text-center">Your details</h2>

                {/* Avatar placeholder (optional) */}
                <div className="u-center">
                    <div
                        aria-hidden
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, var(--bg-accent), var(--bg))",
                            border: "1px solid var(--border)",
                            display: "grid",
                            placeItems: "center",
                            color: "var(--muted-text)",
                            fontWeight: 700,
                        }}
                        title={`${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.trim()}
                    >
                        {(user.firstName?.[0] || "").toUpperCase()}
                        {(user.lastName?.[0] || "").toUpperCase()}
                    </div>
                </div>

                {/* Details grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: 10,
                    }}
                >
                    <div>
                        <strong>First Name:</strong> {user.firstName}
                    </div>
                    <div>
                        <strong>Last Name:</strong> {user.lastName}
                    </div>
                    <div>
                        <strong>Email:</strong> {user.email}
                    </div>
                </div>

                <div className="actions" style={{ gap: 10 }}>
                    <button type="button" className="btn btn--primary" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}