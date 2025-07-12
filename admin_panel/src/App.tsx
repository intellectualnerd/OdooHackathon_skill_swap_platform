import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import LoginPage from './components/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import SwapRequests from './components/dashboard/SwapRequests';
import UserManagement from './components/dashboard/UserManagement';
import SwapActivities from './components/dashboard/SwapActivities';

function App() {
  return ( 
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/dashboard/swap-requests" replace />} />
              <Route path="swap-requests" element={<SwapRequests />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="activities" element={<SwapActivities />} />
            </Route>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#059669',
                },
              },
              error: {
                style: {
                  background: '#dc2626',
                },
              },
            }}
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;