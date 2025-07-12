import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchSwapRequests, rejectSwapRequest, setStatusFilter } from '../../store/slices/dashboardSlice';
import { MessageCircle, X, CheckCircle, Clock, Ban, RefreshCw, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';

const SwapRequests: React.FC = () => {
  const dispatch = useAppDispatch();
  const { swapRequests, loading, filters } = useAppSelector((state) => state.dashboard);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchSwapRequests());
  }, [dispatch]);

  const handleRejectRequest = async (requestId: string) => {
    try {
      await dispatch(rejectSwapRequest(requestId)).unwrap();
      toast.success('Swap request rejected successfully');
    } catch (error) {
      toast.error('Failed to reject swap request');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <X className="h-4 w-4 text-red-500" />;
      case 'rejected':
        return <Ban className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'accepted':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const filteredRequests = swapRequests.filter(request => {
    console.log(request);
    const matchesStatus = filters.status === 'all' || request.status === filters.status;
    const matchesSearch = 
      request.skill_offered.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.skill_wanted.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.from_user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.to_user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

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
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Swap Requests</h1>
          <p className="text-sm text-slate-600 mt-1">Review and moderate skill exchange requests</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow border">
          <span className="text-sm text-slate-600">Total Requests: </span>
          <span className="font-semibold text-slate-900">{filteredRequests.length}</span>
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
                placeholder="Search by skills, users, or message content..."
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
            Status Filter
          </button>
          
          {/* Status Filter (Desktop) */}
          <div className="hidden sm:block">
            <select
              value={filters.status}
              onChange={(e) => dispatch(setStatusFilter(e.target.value))}
              className="px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm sm:text-base min-w-[140px]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="cancelled">Cancelled</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        
        {/* Mobile Filters */}
        {showFilters && (
          <div className="sm:hidden mt-4 pt-4 border-t border-slate-200">
            <select
              value={filters.status}
              onChange={(e) => dispatch(setStatusFilter(e.target.value))}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="cancelled">Cancelled</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        )}
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Request Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Skills Exchange
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredRequests.map((request) => (
                <React.Fragment key={request.request_id}>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">
                        ID: {request.request_id}
                      </div>
                      <div className="text-sm text-slate-500">
                        {new Date(request.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">
                        <div>From: {request.from_user?.name || 'Unknown'}</div>
                        <div>To: {request.to_user?.name || 'Unknown'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900">
                        <div className="mb-1">
                          <span className="font-medium">Offering:</span> {request.skill_offered}
                        </div>
                        <div>
                          <span className="font-medium">Wanting:</span> {request.skill_wanted}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(request.status)}
                        <span className={getStatusBadge(request.status)}>
                          {request.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <button
                        onClick={() => setSelectedRequest(
                          selectedRequest === request.request_id ? null : request.request_id
                        )}
                        className="inline-flex items-center px-3 py-1 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </button>
                      {request.status === 'pending' && (
                        <button
                          onClick={() => handleRejectRequest(request.request_id)}
                          className="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-red-700 hover:bg-red-50 transition-colors"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                  {selectedRequest === request.request_id && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 bg-slate-50">
                        <div className="bg-white p-4 rounded-lg border">
                          <h4 className="font-medium text-slate-900 mb-2">Message Content:</h4>
                          <p className="text-slate-700">
                            {request.message || 'No message provided'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden">
          {filteredRequests.map((request) => (
            <div key={request.request_id} className="p-4 border-b border-slate-200 last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {getStatusIcon(request.status)}
                    <span className={getStatusBadge(request.status)}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">
                    ID: {request.request_id} {new Date(request.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 mb-1">Users</h4>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">From:</span> {request.from_user?.name || 'Unknown'}
                  </p>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">To:</span> {request.to_user?.name || 'Unknown'}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-slate-900 mb-1">Skills Exchange</h4>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Offering:</span> {request.skill_offered}
                  </p>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Wanting:</span> {request.skill_wanted}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedRequest(
                    selectedRequest === request.request_id ? null : request.request_id
                  )}
                  className="w-full flex items-center justify-center px-4 py-3 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {selectedRequest === request.request_id ? 'Hide Message' : 'View Message'}
                  {selectedRequest === request.request_id ? 
                    <ChevronUp className="h-4 w-4 ml-2" /> : 
                    <ChevronDown className="h-4 w-4 ml-2" />
                  }
                </button>
                
                {request.status === 'pending' && (
                  <button
                    onClick={() => handleRejectRequest(request.request_id)}
                    className="w-full flex items-center justify-center px-4 py-3 border border-red-300 rounded-lg text-red-700 hover:bg-red-50 transition-colors font-medium"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject Request
                  </button>
                )}
              </div>
              
              {selectedRequest === request.request_id && (
                <div className="mt-4 p-4 bg-slate-50 rounded-lg border">
                  <h4 className="font-medium text-slate-900 mb-2">Message Content:</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {request.message || 'No message provided'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <RefreshCw className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-sm font-medium text-slate-900">No swap requests found</h3>
          <p className="mt-1 text-sm text-slate-500">
            {searchTerm || filters.status !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'No swap requests have been created yet.'
            }
          </p>
          {(searchTerm || filters.status !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                dispatch(setStatusFilter('all'));
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

export default SwapRequests;