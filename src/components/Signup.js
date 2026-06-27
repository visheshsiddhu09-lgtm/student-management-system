import { useState } from 'react';

function Signup({ onGoBack, onSignupSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required to sign up.');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onSignupSuccess();
    }, 1400);
  };

  return (
    <section className="page-content">
      <div className="auth-card">
        <h2>Create your account</h2>
        <p>Register quickly to manage student records and performance analytics.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="signupName">Full Name</label>
            <input
              id="signupName"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your full name"
              disabled={loading}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="signupEmail">Email</label>
            <input
              id="signupEmail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="signupPassword">Password</label>
            <input
              id="signupPassword"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Choose a password"
              disabled={loading}
            />
          </div>
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
          {error && <p className="alert-text">{error}</p>}
          <button className="secondary-button" type="button" onClick={onGoBack} disabled={loading}>
            Back to Home
          </button>
        </form>
        {loading && (
          <div className="loading-overlay">
            <div className="spinner" />
            <p>Preparing your dashboard...</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Signup;
