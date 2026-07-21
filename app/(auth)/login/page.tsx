'use client'
import { useState } from "react";
import { users } from "@/data/users";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // input
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  // loading
  const [loading, setLoading] = useState(false);

  // error
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    const newErrors = {
      username: "",
      password: "",
    };

    if (form.username.trim() === "") {
      newErrors.username = "Username không được để trống";
    }

    if (form.password.trim() === "") {
      newErrors.password = "Password không được để trống";
    }

    setErrors(newErrors);

    if (newErrors.username || newErrors.password) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const user = users.find(
        (u) =>
          u.username === form.username &&
          u.password === form.password
      );

      if (!user) {
        alert("Wrong username or password");
        return;
      }

      localStorage.setItem("role", user.role);
      localStorage.setItem("username", user.username);

      if (user.role === "ADMIN") {
        router.push("/admin")
      }
      else if (user.role === "STAFF") {
        router.push("/staff");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-box bg-base-100 max-w-7xl mx-auto mt-40 border-2 border-base-300">
      <h1 className="login-title text-base-content">Login</h1>
      <form
        className="flex flex-col items-center pb-10"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input
          id="account"
          type="text"
          placeholder="Username"
          className="input-field border-2 border-base-300"
          value={form.username}
          onChange={(e) => {
            setForm({
              ...form,
              username: e.target.value,
            });

            setErrors({
              ...errors,
              username: "",
            });
          }}
        />
        {errors.username && (
          <p className="text-red-500">
            {errors.username}
          </p>
        )}

        <input
          id="pass"
          type="password"
          placeholder="Password"
          className="input-field border-2 border-base-300"
          value={form.password}
          onChange={(e) => {
            setForm({
              ...form,
              password: e.target.value,
            });

            setErrors({
              ...errors,
              password: "",
            });
          }}
        />
        {errors.password && (
          <p className="text-red-500">
            {errors.password}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-error login-button"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}