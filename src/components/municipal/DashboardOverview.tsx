import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { AlertCircle, Clock, Settings, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';

const statsCards = [
  {
    title: 'Total Issues',
    value: '247',
    change: '+12.5%',
    trend: 'up',
    icon: AlertCircle,
    color: 'blue'
  },
  {
    title: 'Open Issues',
    value: '89',
    change: '-8.2%',
    trend: 'down',
    icon: Clock,
    color: 'red'
  },
  {
    title: 'In Progress',
    value: '34',
    change: '+15.3%',
    trend: 'up',
    icon: Settings,
    color: 'yellow'
  },
  {
    title: 'Resolved Today',
    value: '18',
    change: '+22.1%',
    trend: 'up',
    icon: CheckCircle,
    color: 'green'
  }
];

const recentIssues = [
  {
    id: 'CIV-2024-089',
    description: 'Broken street light on Main Street',
    area: 'Ward 1',
    severity: 'Medium',
    status: 'new',
    time: '5 mins ago'
  },
  {
    id: 'CIV-2024-088',
    description: 'Pothole near City Hall entrance',
    area: 'Ward 2',
    severity: 'High',
    status: 'in-progress',
    time: '12 mins ago'
  },
  {
    id: 'CIV-2024-087',
    description: 'Overflowing garbage bin',
    area: 'Ward 3',
    severity: 'Low',
    status: 'resolved',
    time: '1 hour ago'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new': return 'bg-red-500';
    case 'in-progress': return 'bg-yellow-500';
    case 'resolved': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'low': return 'bg-green-500';
    case 'medium': return 'bg-yellow-500';
    case 'high': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getCardBorderColor = (color: string) => {
  switch (color) {
    case 'blue': return 'border-l-blue-500';
    case 'red': return 'border-l-red-500';
    case 'yellow': return 'border-l-yellow-500';
    case 'green': return 'border-l-green-500';
    default: return 'border-l-gray-500';
  }
};

const getIconColor = (color: string) => {
  switch (color) {
    case 'blue': return 'text-blue-500';
    case 'red': return 'text-red-500';
    case 'yellow': return 'text-yellow-500';
    case 'green': return 'text-green-500';
    default: return 'text-gray-500';
  }
};

export function DashboardOverview() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-300">Monitor and manage civic issues across all departments</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card 
              key={stat.title} 
              className={`bg-[#1E293B] border-[#475569] border-l-4 ${getCardBorderColor(stat.color)}`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${getIconColor(stat.color)}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="flex items-center text-xs text-gray-400">
                  <TrendIcon className={`h-3 w-3 mr-1 ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`} />
                  <span className={stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}>
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Map Placeholder */}
        <Card className="bg-[#1E293B] border-[#475569]">
          <CardHeader>
            <CardTitle className="text-white">Issue Distribution Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] bg-[#334155] rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="w-16 h-16 bg-[#475569] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-medium">Interactive Map</p>
                <p className="text-sm">Issue locations will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Issues */}
        <Card className="bg-[#1E293B] border-[#475569]">
          <CardHeader>
            <CardTitle className="text-white">Recent Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIssues.map((issue) => (
                <div key={issue.id} className="flex items-center justify-between p-3 bg-[#334155] rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-white font-medium text-sm">{issue.id}</span>
                      <Badge className={`${getSeverityColor(issue.severity)} text-white text-xs`}>
                        {issue.severity}
                      </Badge>
                      <Badge className={`${getStatusColor(issue.status)} text-white text-xs`}>
                        {issue.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm">{issue.description}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-gray-400 text-xs">{issue.area}</span>
                      <span className="text-gray-400 text-xs">{issue.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card className="bg-[#1E293B] border-[#475569]">
        <CardHeader>
          <CardTitle className="text-white">Department Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { dept: 'Public Works', resolved: 45, pending: 12, efficiency: 85 },
              { dept: 'Transportation', resolved: 23, pending: 8, efficiency: 92 },
              { dept: 'Health & Safety', resolved: 34, pending: 15, efficiency: 78 }
            ].map((dept) => (
              <div key={dept.dept} className="bg-[#334155] p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">{dept.dept}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Resolved:</span>
                    <span className="text-green-400">{dept.resolved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Pending:</span>
                    <span className="text-yellow-400">{dept.pending}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Efficiency:</span>
                    <span className="text-blue-400">{dept.efficiency}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}