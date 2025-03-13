'use client';

import { useTrainerActions, useTrainerState } from '@/app/providers/Registration/provider';
import { useState } from 'react';
import styles from './RegisterTrainerForm.module.css';

export default function RegisterTrainerForm() {
  const { registerTrainer } = useTrainerActions();
  const { isPending, isSuccess, isError, message } = useTrainerState();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
    contactNumber: '',
    planType: 'base',
    activeState: true,
    trial: false,
    policiesAccepted: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerTrainer(formData);
  };
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register as Trainer</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
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
            required
          />
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
            required
          />
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
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="role" className={styles.label}>Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="admin">Admin</option>
            <option value="trainer">Trainer</option>
          </select>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="planType" className={styles.label}>Plan Type</label>
          <select
            id="planType"
            name="planType"
            value={formData.planType}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="base">Base</option>
            <option value="premium">Premium</option>
            <option value="pro">Pro</option>
          </select>
        </div>
        
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="activeState"
            name="activeState"
            checked={formData.activeState}
            onChange={handleChange}
            className={styles.checkbox}
          />
          <label htmlFor="activeState" className={styles.checkboxLabel}>Active State</label>
        </div>
        
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="trial"
            name="trial"
            checked={formData.trial}
            onChange={handleChange}
            className={styles.checkbox}
          />
          <label htmlFor="trial" className={styles.checkboxLabel}>Trial</label>
        </div>
        
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="policiesAccepted"
            name="policiesAccepted"
            checked={formData.policiesAccepted}
            onChange={handleChange}
            className={styles.checkbox}
            required
          />
          <label htmlFor="policiesAccepted" className={styles.checkboxLabel}>
            I accept the terms and policies
          </label>
        </div>
        
        <button 
          type="submit" 
          disabled={isPending}
          className={styles.submitButton}
        >
          {isPending ? 'Registering...' : 'Register Trainer'}
        </button>
      </form>
      
      {isSuccess && (
        <div className={styles.success}>
          {message}
        </div>
      )}
      
      {isError && (
        <div className={styles.error}>
          {message}
        </div>
      )}
    </div>
  );
}