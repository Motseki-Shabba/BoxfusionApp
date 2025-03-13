'use client';

import React, { useState, useEffect } from 'react';
import { useLoginState, useLoginActions } from '@/app/providers/Login/provider';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';
// import { validateForm } from '@/app/utils/validation';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const { loginUser } = useLoginActions();
  const { isPending, isSuccess, isError, isAuthenticated, message } = useLoginState();
  
  const router = useRouter();
  
  const validationRules = {
    email: { 
      required: true, 
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
    },
    password: { 
      required: true,
      minLength: 6
    }
  };
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/component/layout');
    }
  }, [isAuthenticated, router]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // const validationErrors = validateForm(formData, validationRules);
    
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }
    
    await loginUser(formData);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>
          Trainer Login
        </h2>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>
          
          {isError && (
            <div className={styles.error}>
              {message}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isPending}
            className={styles.submitButton}
          >
            {isPending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}