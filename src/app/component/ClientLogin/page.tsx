"use client";
import React, { useEffect, useState } from "react";
import {
  useClientLoginState,
  useClientLoginActions,
} from "@/app/providers/ClientLogin/provider";
import { LogIn, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import styles from "./Login.module.css";
import router from "next/router";

const Login: React.FC = () => {
  const { isPending, isSuccess, isError, message } = useClientLoginState();
  const { loginClient } = useClientLoginActions();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const errors = {
      email: "",
      password: "",
    };

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      valid = false;
    }

    useEffect(() => {
      const isAuthenticated = false; // Replace with actual authentication logic
      if (isAuthenticated) {
        router.push("/component/LogClient");
      }
    }, [router]);

    setFormErrors(errors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await loginClient(formData);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <LogIn className="mx-auto h-8 w-8 text-primary mb-4" />
        Welcome Back
      </h2>

      {isSuccess && (
        <div className={styles.success}>
          <CheckCircle className="h-5 w-5" />
          <span>{message || "Login successful!"}</span>
        </div>
      )}

      {isError && (
        <div className={styles.error}>
          <AlertCircle className="h-5 w-5" />
          <span>{message || "Login failed. Please try again."}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="you@example.com"
          />
          {formErrors.email && (
            <span className={styles.error}>{formErrors.email}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            placeholder="••••••••"
          />
          {formErrors.password && (
            <span className={styles.error}>{formErrors.password}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={styles.submitButton}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
              Logging in...
            </>
          ) : (
            "Log In"
          )}
        </button>
      </form>

      <div className={styles.registerLink}>
        Don't have an account? <a href="/register">Sign up</a>
      </div>
    </div>
  );
};

export default Login;
