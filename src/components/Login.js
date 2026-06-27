import { useState } from 'react';

function Login({ onGoBack, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1400);
  };

  return (
    <section className="page-content">
      <div className="auth-card">
        <h2>Login to StudentDesk</h2>
        <p>Access the dashboard by signing in with your learner account.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="loginEmail">Email</label>
            <input
              id="loginEmail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="loginPassword">Password</label>
            <input
              id="loginPassword"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
          {error && <p className="alert-text">{error}</p>}
          <button className="secondary-button" type="button" onClick={onGoBack} disabled={loading}>
            Back to Home
          </button>
        </form>
        {loading && (
          <div className="loading-overlay">
            <div className="spinner" />
            <p>Loading student dashboard...</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Login;
