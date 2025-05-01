import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Example placeholder for data fetched from backend
  // useEffect(() => {
  //   fetch('/api/user/dashboard')
  //     .then(res => res.json())
  //     .then(data => setDashboardData(data));
  // }, []);

  return (
    <div className="dashboardContainer">
      <h2 className="title">Welcome to your Dashboard</h2>
      <section className="section">
        <h3 className="subtitle">Your Recent Activity</h3>
        <ul className="activityList">
          <li>Viewed Bengal Kitten</li>
          <li>Added Golden Retriever to Cart</li>
          <li>Completed Payment for Persian Cat</li>
        </ul>
      </section>
      <section className="section">
        <h3 className="subtitle">Recommended for You</h3>
        <div className="recommendations">
          {/* Replace this with dynamic content later */}
          <div className="card">British Shorthair</div>
          <div className="card">Cavalier King Charles</div>
          <div className="card">Siberian Husky</div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;