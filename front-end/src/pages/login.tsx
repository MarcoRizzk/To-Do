import { useState, useContext } from "react";
import AuthContext from "../context/auth-context";
import { login } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      auth?.login(data.access_token);
    } catch (err) {
      alert("Invalid credentials");
      console.log(err);
    }
  };

  return (
    <div className="flex items-center px-5">
      <div className="max-w-md mx-auto mt-10 p-5 border rounded-xl">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="w-full p-2 border mb-3 rounded-xl"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full p-2 border mb-3 rounded-xl"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded-xl">
            Login
          </button>
          <div className="mt-2 text-sm underline hover:text-blue-600">
            <a href="/register">Don't have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
