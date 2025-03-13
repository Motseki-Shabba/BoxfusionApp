"use client";

import { Dumbbell, Users, Timer, Trophy, Link } from "lucide-react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground} />
        <nav className={styles.nav}>
          <div className={styles.navContent}>
            <div className={styles.logo}>
              <Dumbbell className={styles.logoIcon} />
              <span>Boxfusion Fitness</span>
            </div>
            <div className={styles.navButtons}>
              <button
                className={styles.secondaryButton}
                onClick={() => router.push("/component/Login")}
              >
                Login
              </button>
              <button
                className={styles.primaryButton}
                onClick={() => router.push("/component/Registration")}
              >
                Register
              </button>
            </div>
          </div>
        </nav>

        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Transform Your Body,
              <br />
              Transform Your Life
            </h1>
            <p className={styles.heroDescription}>
              Get personalized workout plans and nutrition advice from certified
              trainers. Start your fitness journey today.
            </p>
            <button
              className={styles.secondaryButton}
              onClick={() => router.push("/component/clientregistration")}
            >
              Register as a client
            </button>
            <button
              className={styles.primaryButton}
              onClick={() => router.push("/component/ClientLogin")}
            >
              Login as a client
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <Users className={styles.featureIcon} />
            <h3 className={styles.featureTitle}>Expert Trainers</h3>
            <p className={styles.featureDescription}>
              Work with certified personal trainers who are passionate about
              helping you achieve your goals.
            </p>
          </div>
          <div className={styles.featureCard}>
            <Timer className={styles.featureIcon} />
            <h3 className={styles.featureTitle}>Flexible Schedule</h3>
            <p className={styles.featureDescription}>
              Train on your own time with 24/7 access to workout plans and video
              tutorials.
            </p>
          </div>
          <div className={styles.featureCard}>
            <Trophy className={styles.featureIcon} />
            <h3 className={styles.featureTitle}>Proven Results</h3>
            <p className={styles.featureDescription}>
              Join thousands of successful members who have achieved their
              fitness goals.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <Dumbbell />
            <span>Boxfusion Fitness</span>
          </div>
          <p className={styles.copyright}>
            © 2024 Boxfusion Fitness. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
