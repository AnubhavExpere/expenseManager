import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductPage.css';

export default function ProductPage() {
  const navigate = useNavigate();

  const handleSignin = (e) => {
    navigate('/login');
  };

  const handleSignup = (e) => {
    navigate('/register');
  };

  return (
    <div className="product-page">
      <header className="header">
        <h1 className="logo">Expnsy</h1>
        <button className="signin-btn" onClick={handleSignin}>Sign In</button>
      </header>

      <main className="main">
        <h2 className="headline">Track. Analyze. All in one place.</h2>
        <p className="subtext">
          Expnsy helps you manage your personal and shared expenses effortlessly. Visualize your spending,
          split bills with friends, and make smarter financial decisions — all from one sleek dashboard.
        </p>

        <div className="features">
          <Feature title="Expense Tracking" description="Log and categorize expenses easily and visually." />
          <Feature title="Analytics & Insights" description="Get breakdowns, graphs, and trends of your finances." />
          {/* <Feature title="Split with Friends" description="Plan group expenses and settle up instantly." /> */}
        </div>

        <button className="get-started-btn" onClick={handleSignup}>Get Started — It's Free</button>
      </main>
    </div>
  );
}

function Feature({ title, description }) {
  return (
    <div className="feature-box">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}