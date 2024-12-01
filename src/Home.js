import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // List of coffee items
  const coffeeItems = [
    { name: 'Espresso', description: 'Strong and bold, pure coffee.' },
    { name: 'Cappuccino', description: 'A balanced mix of espresso, steamed milk, and foam.' },
    { name: 'Latte', description: 'Espresso with a generous amount of steamed milk and foam.' },
    { name: 'Americano', description: 'Espresso diluted with hot water for a smooth flavor.' },
    { name: 'Macchiato', description: 'Espresso topped with a small dollop of foam.' },
    { name: 'Mocha', description: 'A delightful mix of espresso, chocolate, and steamed milk.' },
    { name: 'Flat White', description: 'Espresso blended with silky smooth steamed milk.' },
    { name: 'Irish Coffee', description: 'Coffee with a kick of Irish whiskey and cream.' },
  ];

  return (
    <div className="home-container">
      {/* Login link at the top left */}
      <div className="login-form">
        <Link to="/login" className="login-link">Login</Link>
        <Link to="/new-order" style={{ marginLeft: "20px" }}>Add New Order</Link>
      </div>

      {/* Welcome message */}
      <header className="home-header">
        <h3 align="center">Welcome to Coffee Haven</h3>
        <p align="center">Discover your favorite coffee flavors.</p>
      </header>
      {/* Coffee menu */}
      <ul className="coffee-menu">
        {coffeeItems.map((coffee, index) => (
          <li key={index} className="coffee-item">
            <h3>{coffee.name}</h3>
            <p>{coffee.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
