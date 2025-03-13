"use client";
import React, { useState, useEffect } from 'react';
import { useClientRegistrationState, useClientRegistrationActions } from '@/app/providers/clientregistration/provider';
import { UserPlus, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import styles from './RegisterClient.module.css';

const RegisterClient: React.FC = () => {
  const { isPending, isSuccess, isError, message } = useClientRegistrationState();
  const { registerClient } = useClientRegistrationActions();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    contactNumber: '',
    policiesAccepted: false,
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    contactNumber: '',
    policiesAccepted: '',
  });

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        contactNumber: '',
        policiesAccepted: false,
      });
    }
  }, [isSuccess]);

  const validateForm = () => {
    let valid = true;
    const errors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
      contactNumber: '',
      policiesAccepted: '',
    };

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
      valid = false;
    }

    if (!formData.contactNumber.trim()) {
      errors.contactNumber = 'Contact number is required';
      valid = false;
    }

    if (!formData.policiesAccepted) {
      errors.policiesAccepted = 'You must accept the policies to register';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await registerClient(formData);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Your Account</h2>

      {isSuccess && (
        <div className={styles.success}>
          <CheckCircle className="h-5 w-5" />
          <span>{message || 'Registration successful!'}</span>
        </div>
      )}

      {isError && (
        <div className={styles.error}>
          <AlertCircle className="h-5 w-5" />
          <span>{message || 'Registration failed. Please try again.'}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="John Doe"
          />
          {formErrors.name && <span className={styles.error}>{formErrors.name}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="you@example.com"
          />
          {formErrors.email && <span className={styles.error}>{formErrors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            placeholder="••••••••"
          />
          {formErrors.password && <span className={styles.error}>{formErrors.password}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.input}
            placeholder="••••••••"
          />
          {formErrors.confirmPassword && <span className={styles.error}>{formErrors.confirmPassword}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dateOfBirth" className={styles.label}>Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={styles.input}
          />
          {formErrors.dateOfBirth && <span className={styles.error}>{formErrors.dateOfBirth}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contactNumber" className={styles.label}>Contact Number</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className={styles.input}
            placeholder="(123) 456-7890"
          />
          {formErrors.contactNumber && <span className={styles.error}>{formErrors.contactNumber}</span>}
        </div>

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="policiesAccepted"
            name="policiesAccepted"
            checked={formData.policiesAccepted}
            onChange={handleChange}
            className={styles.checkbox}
          />
          <label htmlFor="policiesAccepted" className={styles.checkboxLabel}>
            I accept the Terms of Service and Privacy Policy
          </label>
        </div>
        {formErrors.policiesAccepted && <span className={styles.error}>{formErrors.policiesAccepted}</span>}

        <button
          type="submit"
          disabled={isPending}
          className={styles.submitButton}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
              Registering...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterClient;