import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Eye, Edit, ArrowRight, Search, Calendar, Phone, MessageSquare } from 'lucide-react';
import { IssueDetailPanel } from './IssueDetailPanel';

interface Issue {
  id: string;
  image?: string;
  description: string;
  location: string;
  citizenPhone: string;
  severity: 'Low' | 'Medium' | 'High' | 'Urgent' | 'Critical';
  status: 'New' | 'In Progress' | 'Resolved' | 'Closed';
  department: string;
  assignedTo: string;
  reportedDate: string;
}

const mockIssues: Issue[] = [
  {
    id: 'CIV-2024-089',
    description: 'Broken street light causing safety concerns for pedestrians',
    location: 'Main Street, Ward 1',
    citizenPhone: '+1-234-567-8901',
    severity: 'Medium',
    status: 'New',
    department: 'Public Works',
    assignedTo: 'John Smith',
    reportedDate: '2024-01-25T10:30:00Z'
  },
  {
    id: 'CIV-2024-088',
    description: 'Large pothole causing traffic disruption',
    location: 'City Hall Avenue, Ward 2',
    citizenPhone: '+1-234-567-8902',
    severity: 'High',
    status: 'In Progress',
    department: 'Transportation',
    assignedTo: 'Sarah Johnson',
    reportedDate: '2024-01-24T14:15:00Z'
  },
  {
    id: 'CIV-2024-087',
    description: 'Overflowing garbage bin attracting pests',
    location: 'Park Avenue, Ward 3',
    citizenPhone: '+1-234-567-8903',
    severity: 'Low',
    status: 'Resolved',
    department: 'Health & Safety',
    assignedTo: 'Mike Wilson',
    reportedDate: '2024-01-23T09:45:00Z'
  },
  {
    id: 'CIV-2024-086',
    description: 'Water main leak causing flooding',
    location: 'Oak Street, Ward 4',
    citizenPhone: '+1-234-567-8904',
    severity: 'Critical',
    status: 'In Progress',
    department: 'Utilities',
    assignedTo: 'Emma Davis',
    reportedDate: '2024-01-22T16:20:00Z'
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Low': return 'bg-green-500';
    case 'Medium': return 'bg-yellow-500';
    case 'High': return 'bg-red-500';
    case 'Urgent': return 'bg-red-600';
    case 'Critical': return 'bg-red-800';
    default: return 'bg-gray-500';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'New': return 'bg-red-500';
    case 'In Progress': return 'bg-yellow-500';
    case 'Resolved': return 'bg-green-500';
    case 'Closed': return 'bg-purple-500';
    default: return 'bg-gray-500';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInHours < 48) return 'Yesterday';
  return date.toLocaleDateString();
};

export function IssuesManagement() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    severity: 'all',
    department: 'all',
    dateRange: 'all'
  });

  const filteredIssues = mockIssues.filter(issue => {
    if (filters.search && !issue.description.toLowerCase().includes(filters.search.toLowerCase()) && 
        !issue.id.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.status !== 'all' && issue.status.toLowerCase() !== filters.status) return false;
    if (filters.severity !== 'all' && issue.severity.toLowerCase() !== filters.severity) return false;
    if (filters.department !== 'all' && issue.department.toLowerCase().replace(/\s+/g, '-') !== filters.department) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Issues Management</h1>
          <p className="text-gray-300">Manage and track all civic issues across departments</p>
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="bg-[#1E293B] border-[#475569]">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search issues..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="pl-10 bg-[#334155] border-[#475569] text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger className="bg-[#334155] border-[#475569] text-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#334155] border-[#475569]">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            {/* Severity Filter */}
            <Select value={filters.severity} onValueChange={(value) => setFilters({ ...filters, severity: value })}>
              <SelectTrigger className="bg-[#334155] border-[#475569] text-white">
                <SelectValue placeholder="All Severity" />
              </SelectTrigger>
              <SelectContent className="bg-[#334155] border-[#475569]">
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>

            {/* Department Filter */}
            <Select value={filters.department} onValueChange={(value) => setFilters({ ...filters, department: value })}>
              <SelectTrigger className="bg-[#334155] border-[#475569] text-white">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent className="bg-[#334155] border-[#475569]">
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="public-works">Public Works</SelectItem>
                <SelectItem value="health-&-safety">Health & Safety</SelectItem>
                <SelectItem value="transportation">Transportation</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Range Filter */}
            <Select value={filters.dateRange} onValueChange={(value) => setFilters({ ...filters, dateRange: value })}>
              <SelectTrigger className="bg-[#334155] border-[#475569] text-white">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent className="bg-[#334155] border-[#475569]">
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-3-months">Last 3 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Issues Table */}
      <Card className="bg-[#1E293B] border-[#475569]">
        <CardHeader className="bg-[#334155]">
          <CardTitle className="text-white">
            Issues ({filteredIssues.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#475569] hover:bg-[#334155]">
                  <TableHead className="text-gray-300">Issue ID</TableHead>
                  <TableHead className="text-gray-300">Image</TableHead>
                  <TableHead className="text-gray-300">Description</TableHead>
                  <TableHead className="text-gray-300">Location</TableHead>
                  <TableHead className="text-gray-300">Citizen</TableHead>
                  <TableHead className="text-gray-300">Severity</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Department</TableHead>
                  <TableHead className="text-gray-300">Assigned To</TableHead>
                  <TableHead className="text-gray-300">Reported</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((issue) => (
                  <TableRow 
                    key={issue.id} 
                    className="border-[#475569] hover:bg-[#334155] cursor-pointer"
                    onClick={() => setSelectedIssue(issue)}
                  >
                    <TableCell className="text-white font-mono">{issue.id}</TableCell>
                    <TableCell>
                      <div className="w-12 h-12 bg-[#334155] rounded border border-[#475569] flex items-center justify-center">
                        <span className="text-gray-400 text-xs">IMG</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-white max-w-xs">
                      <div className="truncate">{issue.description}</div>
                    </TableCell>
                    <TableCell className="text-gray-300">{issue.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-300 text-sm">{issue.citizenPhone}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-6 w-6 text-green-400 hover:bg-green-500/20"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-6 w-6 text-blue-400 hover:bg-blue-500/20"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getSeverityColor(issue.severity)} text-white`}>
                        {issue.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(issue.status)} text-white`}>
                        {issue.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select defaultValue={issue.department.toLowerCase().replace(/\s+/g, '-')}>
                        <SelectTrigger className="w-32 bg-[#334155] border-[#475569] text-white text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#334155] border-[#475569]">
                          <SelectItem value="public-works">Public Works</SelectItem>
                          <SelectItem value="health-&-safety">Health & Safety</SelectItem>
                          <SelectItem value="transportation">Transportation</SelectItem>
                          <SelectItem value="environment">Environment</SelectItem>
                          <SelectItem value="utilities">Utilities</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-gray-300">{issue.assignedTo}</TableCell>
                    <TableCell className="text-gray-300">{formatDate(issue.reportedDate)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-6 w-6 text-blue-400 hover:bg-blue-500/20"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIssue(issue);
                          }}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-6 w-6 text-yellow-400 hover:bg-yellow-500/20"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-6 w-6 text-purple-400 hover:bg-purple-500/20"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Issue Detail Panel */}
      {selectedIssue && (
        <IssueDetailPanel
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
        />
      )}
    </div>
  );
}