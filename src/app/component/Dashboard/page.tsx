"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useUserState,
  useUserActions,
} from "@/app/providers/currentUser/provider";
import { useLoginState, useLoginActions } from "@/app/providers/Login/provider";
import "./dashboard.css";
import CreateClientForm from "../Client/page";

interface UserData {
  name: string;
  email: string;
  role: string;
  contactNumber: string;
  planType: string;
  activeState: boolean;
  trial: boolean;
  date: string;
}

export default function Dashboard() {
  const router = useRouter();

  // User state and actions
  const { isPending, isError, user, message } = useUserState();
  const { getCurrentUser } = useUserActions();

  // Login state and actions
  const { isAuthenticated } = useLoginState();
  const { logoutUser } = useLoginActions();

  // Fetch user data on component mount
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/component/Login");
      return;
    }

    // Fetch current user data
    getCurrentUser();
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logoutUser();
    router.push("/NextProject/src/app/page.tsx");
  };

  // Loading state
  if (isPending) {
    return (
      <div className="container loading-container">
        <div className="loading-card">
          <h2>Loading your profile...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="container error-container">
        <div className="error-card">
          <h2>Error</h2>
          <p>{message || "Failed to load user data"}</p>
          <div className="button-group">
            <button
              onClick={() => getCurrentUser()}
              className="btn primary-btn"
            >
              Try Again
            </button>
            <button onClick={handleLogout} className="btn secondary-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header>
        <div className="header-content">
          <h1>Trainer Dashboard</h1>
          <button onClick={handleLogout} className="btn logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main>
        <div className="profile-card">
          <div className="card-header">
            <h2>Trainer Profile</h2>
            <p>Personal details and account information</p>
          </div>

          {user && (
            <div className="profile-details">
              <dl>
                <div className="detail-row">
                  <dt>Full name</dt>
                  <dd>{user.name}</dd>
                </div>
                <div className="detail-row alt">
                  <dt>Email address</dt>
                  <dd>{user.email}</dd>
                </div>
                <div className="detail-row">
                  <dt>Role</dt>
                  <dd className="capitalize">{user.role}</dd>
                </div>
                <div className="detail-row alt">
                  <dt>Contact number</dt>
                  <dd>{user.contactNumber}</dd>
                </div>
                <div className="detail-row">
                  <dt>Plan type</dt>
                  <dd className="capitalize">{user.planType}</dd>
                </div>
                <div className="detail-row alt">
                  <dt>Account status</dt>
                  <dd>
                    <span
                      className={`status-badge ${
                        user.activeState ? "active" : "inactive"
                      }`}
                    >
                      {user.activeState ? "Active" : "Inactive"}
                    </span>
                  </dd>
                </div>
                <div className="detail-row">
                  <dt>Trial status</dt>
                  <dd>
                    <span
                      className={`status-badge ${
                        user.trial ? "trial" : "regular"
                      }`}
                    >
                      {user.trial ? "Trial User" : "Regular User"}
                    </span>
                  </dd>
                </div>
                <div className="detail-row alt">
                  <dt>Account created</dt>
                  <dd>
                    {new Date(user.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </dd>

                  <div></div>
                </div>
              </dl>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
