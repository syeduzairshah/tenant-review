import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import NotificationList from '../UI/NotificationList';
import { NotificationProvider } from '../../context/NotificationContext';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <NotificationProvider>
        <main className="flex-grow">
          <Outlet />
        </main>
        <NotificationList />
      </NotificationProvider>
      <Footer />
    </div>
  );
};

export default Layout;