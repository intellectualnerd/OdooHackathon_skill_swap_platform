import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUsers, banUser, unbanUser } from '../../store/slices/dashboardSlice';
import { Ban, Shield, Mail, MapPin, Clock, RefreshCw, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const UserManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.dashboard);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  
  // Filter and search state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleBanUser = async (userId: string, isBanned: boolean) => {
    try {
      if (isBanned) {
        await dispatch(unbanUser(userId)).unwrap();
        toast.success('User unbanned successfully');
      } else {
        await dispatch(banUser(userId)).unwrap();
        toast.success('User banned successfully');
      }
    } catch (error) {
      console.error('Error updating user ban status:', error);
      toast.error(`Failed to ${isBanned ? 'unban' : 'ban'} user`);
      // Only refresh on error to get the correct state
      dispatch(fetchUsers());
    }
  };

  // Filter users based on search and status
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'active' && !user.is_ban) ||
      (statusFilter === 'banned' && user.is_ban);
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">User Management</h1>
          <p className="text-sm text-slate-600 mt-1">Manage user accounts and permissions</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow border">
          <span className="text-sm text-slate-600">Total Users: </span>
          <span className="font-semibold text-slate-900">{filteredUsers.length}</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow border">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search users by name, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm sm:text-base"
              />
            </div>
          </div>
          
          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden flex items-center justify-center px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          
          {/* Status Filter (Desktop) */}
          <div className="hidden sm:block">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm sm:text-base min-w-[140px]"
            >
              <option value="all">All Users</option>
              <option value="active">Active</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </div>
        
        {/* Mobile Filters */}
        {showFilters && (
          <div className="sm:hidden mt-4 pt-4 border-t border-slate-200">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="all">All Users</option>
              <option value="active">Active</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        )}
      </div>

      {/* Users Table/Cards */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Registration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {currentUsers.map((user) => (
                <tr key={user.user_id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-slate-700">
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">
                          {user.name || 'Unnamed User'}
                        </div>
                        <div className="text-sm text-slate-500">
                          ID: {user.user_id.slice(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">
                      <div className="flex items-center mb-1">
                        <Mail className="h-4 w-4 mr-2 text-slate-400" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      {user.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                          <span className="truncate">{user.location}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.is_ban ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <Ban className="h-3 w-3 mr-1" />
                        Banned
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Shield className="h-3 w-3 mr-1" />
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleBanUser(user.user_id, user.is_ban)}
                      className={`inline-flex items-center px-3 py-1 border rounded-md transition-colors text-sm ${
                        user.is_ban
                          ? 'border-green-300 text-green-700 hover:bg-green-50'
                          : 'border-red-300 text-red-700 hover:bg-red-50'
                      }`}
                    >
                      {user.is_ban ? (
                        <>
                          <Shield className="h-4 w-4 mr-1" />
                          Unban
                        </>
                      ) : (
                        <>
                          <Ban className="h-4 w-4 mr-1" />
                          Ban
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden">
          {currentUsers.map((user) => (
            <div key={user.user_id} className="p-4 border-b border-slate-200 last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center">
                    <span className="text-lg font-medium text-slate-700">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-medium text-slate-900 truncate">
                      {user.name || 'Unnamed User'}
                    </h3>
                    <p className="text-sm text-slate-500">
                      ID: {user.user_id.slice(0, 8)}...
                    </p>
                  </div>
                </div>
                {user.is_ban ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <Ban className="h-3 w-3 mr-1" />
                    Banned
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Shield className="h-3 w-3 mr-1" />
                    Active
                  </span>
                )}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-slate-600">
                  <Mail className="h-4 w-4 mr-2 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.location && (
                  <div className="flex items-center text-sm text-slate-600">
                    <MapPin className="h-4 w-4 mr-2 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{user.location}</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-slate-600">
                  <Clock className="h-4 w-4 mr-2 text-slate-400 flex-shrink-0" />
                  <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              
              <button
                onClick={() => handleBanUser(user.user_id, user.is_ban)}
                className={`w-full flex items-center justify-center px-4 py-3 border rounded-lg transition-colors font-medium ${
                  user.is_ban
                    ? 'border-green-300 text-green-700 hover:bg-green-50'
                    : 'border-red-300 text-red-700 hover:bg-red-50'
                }`}
              >
                {user.is_ban ? (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Unban User
                  </>
                ) : (
                  <>
                    <Ban className="h-4 w-4 mr-2" />
                    Ban User
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 sm:px-6 rounded-lg shadow border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-700">
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-slate-300 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              {/* Page Numbers */}
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`px-3 py-2 text-sm rounded-md transition-colors ${
                        currentPage === pageNumber
                          ? 'bg-slate-600 text-white'
                          : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-slate-300 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Shield className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-sm font-medium text-slate-900">No users found</h3>
          <p className="mt-1 text-sm text-slate-500">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'No user profiles have been created yet.'
            }
          </p>
          {(searchTerm || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
              className="mt-4 inline-flex items-center px-4 py-2 border border-slate-300 rounded-md text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserManagement;