import { useState } from "react";
import { register } from "../services/api";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(name, email, password, phone);
      alert("Registration successful. Please login.");
    } catch (err) {
      alert("Error registering user.");
      console.log(err);
    }
  };

  return (
    <div className="flex items-center px-5">
      <div className="max-w-md mx-auto mt-10 p-5 border rounded-xl">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            className="w-full p-2 border mb-3 rounded-xl"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <input
            type="text"
            className="w-full p-2 border mb-3 rounded-xl"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded-xl">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
