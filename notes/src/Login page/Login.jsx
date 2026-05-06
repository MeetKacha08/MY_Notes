import "./Login.css";

function Login({ loginData, setLoginData, handleLogin }) {
  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in.</p>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                email: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                password: e.target.value,
              })
            }
            required
          />
        </div>

        <button type="submit" className="login-btn">
          Sign In
        </button>

        <div className="login-info">
          <span>Demo Credentials</span>
          <p>Email: <strong>admin@gmail.com</strong></p>
          <p>Password: <strong>123456</strong></p>
        </div>
      </form>
    </div>
  );
}

export default Login;