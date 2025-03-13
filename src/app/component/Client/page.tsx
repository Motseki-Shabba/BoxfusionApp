"use client";
import React, { useState, useEffect } from "react";
import { useClientState, useClientActions } from "@/app/providers/createclient/provider";
import { useUserState, useUserActions } from "@/app/providers/currentUser/provider";
import styles from "./CreateClientForm.module.css";

const CreateClientForm: React.FC = () => {
  const { isPending, isSuccess, isError, message } = useClientState();
  const { createClient } = useClientActions();
  const userState = useUserState();
  const { getCurrentUser } = useUserActions();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    sex: "male",
    dateOfBirth: "",
    activeState: true,
    trainerId: userState.user?.id || "", 
  });

  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    dateOfBirth: "",
  });

  // Load user data when component mounts
  useEffect(() => {
    if (!userState.user) {
      getCurrentUser();
    }
  }, []);

  // Reset form after successful submission
  useEffect(() => {
    if (isSuccess) {
      setFormData({
        fullName: "",
        email: "",
        contactNumber: "",
        sex: "male",
        dateOfBirth: "",
        activeState: true,
        trainerId: userState.user?.id || "",
      });
    }
  }, [isSuccess]);

  const validateForm = () => {
    let valid = true;
    const errors = {
      fullName: "",
      email: "",
      contactNumber: "",
      dateOfBirth: "",
    };

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.contactNumber.trim()) {
      errors.contactNumber = "Contact number is required";
      valid = false;
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Ensure we have a trainer ID
    if (!userState.user?.id) {
      alert("Trainer information is missing. Please make sure you're logged in.");
      return;
    }

    // Prepare the client data with the trainer ID
    const clientData = {
      ...formData,
      trainerId: userState.user.id,
    };

    await createClient(clientData);
  };

  // If user data is still loading, show a loading indicator
  if (userState.isPending) {
    return <div className={styles.container}>Loading trainer data...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create New Client</h2>
      
      {isSuccess && (
        <div className={styles.success}>
          {message || "Client created successfully!"}
        </div>
      )}
      
      {isError && (
        <div className={styles.error}>
          {message || "Failed to create client. Please try again."}
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName" className={styles.label}>
            Full Name*
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={formErrors.fullName ? styles.inputError : styles.input}
            placeholder="John Doe"
          />
          {formErrors.fullName && (
            <p className={styles.errorText}>{formErrors.fullName}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={formErrors.email ? styles.inputError : styles.input}
            placeholder="john@example.com"
          />
          {formErrors.email && (
            <p className={styles.errorText}>{formErrors.email}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contactNumber" className={styles.label}>
            Contact Number*
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className={formErrors.contactNumber ? styles.inputError : styles.input}
            placeholder="(123) 456-7890"
          />
          {formErrors.contactNumber && (
            <p className={styles.errorText}>{formErrors.contactNumber}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="sex" className={styles.label}>
            Sex
          </label>
          <select
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dateOfBirth" className={styles.label}>
            Date of Birth*
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={formErrors.dateOfBirth ? styles.inputError : styles.input}
          />
          {formErrors.dateOfBirth && (
            <p className={styles.errorText}>{formErrors.dateOfBirth}</p>
          )}
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="activeState"
            name="activeState"
            checked={formData.activeState}
            onChange={handleChange}
            className={styles.checkbox}
          />
          <label htmlFor="activeState" className={styles.checkboxLabel}>
            Active Client
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={styles.submitButton}
        >
          {isPending ? "Creating..." : "Create Client"}
        </button>
      </form>
    </div>
  );
};

export default CreateClientForm;