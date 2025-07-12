import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchSwapRequests } from '../../store/slices/dashboardSlice';
import { BarChart3, TrendingUp, Users, RefreshCw } from 'lucide-react';

const SwapActivities: React.FC = () => {
  const dispatch = useAppDispatch();
  const { swapRequests, loading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchSwapRequests());
  }, [dispatch]);

  const getStatusCounts = () => {
    const counts = {
      pending: 0,
      accepted: 0,
      cancelled: 0,
      rejected: 0,
    };

    swapRequests.forEach((request) => {
      if (counts.hasOwnProperty(request.status)) {
        counts[request.status as keyof typeof counts]++;
      }
    });

    return counts;
  };

  const getRecentActivity = () => {
    return swapRequests
      .slice()
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10);
  };

  const statusCounts = getStatusCounts();
  const recentActivity = getRecentActivity();

  const totalRequests = swapRequests.length;
  const acceptanceRate = totalRequests > 0 ? ((statusCounts.accepted / totalRequests) * 100).toFixed(1) : '0';

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
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Swap Activities</h1>
          <p className="text-sm text-slate-600 mt-1">Monitor platform activity and performance metrics</p>
        </div>
        <button
          onClick={() => dispatch(fetchSwapRequests())}
          className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Requests</p>
              <p className="text-xl sm:text-2xl font-bold text-slate-900">{totalRequests}</p>
            </div>
            <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
              <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Pending</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
            </div>
            <div className="bg-yellow-100 p-2 sm:p-3 rounded-full">
              <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Acceptance Rate</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">{acceptanceRate}%</p>
            </div>
            <div className="bg-green-100 p-2 sm:p-3 rounded-full">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active Users</p>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">
                {new Set([...swapRequests.map(r => r.from_user_id), ...swapRequests.map(r => r.to_user_id)]).size}
              </p>
            </div>
            <div className="bg-purple-100 p-2 sm:p-3 rounded-full">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow border">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Request Status Distribution</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(statusCounts).map(([status, count]) => {
            const percentage = totalRequests > 0 ? ((count / totalRequests) * 100).toFixed(1) : '0';
            const colors = {
              pending: 'bg-yellow-500',
              accepted: 'bg-green-500',
              cancelled: 'bg-red-500',
              rejected: 'bg-red-600',
            };

            return (
              <div key={status} className="text-center">
                <div className="mb-2 bg-slate-200 rounded-full h-3 sm:h-4 overflow-hidden">
                  <div 
                    className={`h-full ${colors[status as keyof typeof colors]} rounded-full transition-all duration-300`}
                    style={{ width: `${Math.max(Number(percentage), 5)}%` }} 
                  />
                </div>
                <p className="text-sm font-medium text-slate-900 capitalize">{status}</p>
                <p className="text-lg sm:text-xl font-bold text-slate-700">{count}</p>
                <p className="text-xs text-slate-500">{percentage}%</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow border">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Recent Activity</h2>
        <div className="space-y-3 sm:space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map((request) => (
              <div key={request.request_id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-slate-50 rounded-lg gap-2 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    Skill Exchange: {request.skill_offered} ↔ {request.skill_wanted}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(request.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <RefreshCw className="mx-auto h-8 w-8 text-slate-400" />
              <p className="mt-2 text-sm text-slate-500">No recent activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapActivities;