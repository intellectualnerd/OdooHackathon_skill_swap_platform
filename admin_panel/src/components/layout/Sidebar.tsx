import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  RefreshCw, 
  BarChart3, 
  LogOut, 
  Shield,
  X
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/slices/authSlice';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { admin } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  const navItems = [
    {
      to: '/dashboard/swap-requests',
      icon: RefreshCw,
      label: 'Swap Requests',
    },
    {
      to: '/dashboard/users',
      icon: Users,
      label: 'User Management',
    },
    {
      to: '/dashboard/activities',
      icon: BarChart3,
      label: 'Swap Activities',
    },
  ];

  const handleNavClick = () => {
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-800 text-white 
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col min-h-screen
      `}>
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-slate-600 p-2 rounded-lg">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-bold truncate">Admin Panel</h1>
                <p className="text-slate-400 text-xs sm:text-sm truncate">
                  {admin?.admins_email}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md hover:bg-slate-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6">
          <ul className="space-y-1 sm:space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 sm:px-4 py-3 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                      isActive
                        ? 'bg-slate-700 text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 sm:px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors w-full text-sm sm:text-base"
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;