import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { X, Phone, MessageSquare, Upload, MapPin } from 'lucide-react';

interface Issue {
  id: string;
  description: string;
  location: string;
  citizenPhone: string;
  severity: string;
  status: string;
  department: string;
  assignedTo: string;
  reportedDate: string;
}

interface IssueDetailPanelProps {
  issue: Issue;
  onClose: () => void;
}

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

export function IssueDetailPanel({ issue, onClose }: IssueDetailPanelProps) {
  const [transferDepartment, setTransferDepartment] = useState('');
  const [transferReason, setTransferReason] = useState('');
  const [newStatus, setNewStatus] = useState(issue.status);
  const [updateNote, setUpdateNote] = useState('');

  const handleTransfer = () => {
    // Handle department transfer
    console.log('Transfer to:', transferDepartment, 'Reason:', transferReason);
  };

  const handleStatusUpdate = () => {
    // Handle status update
    console.log('Update status to:', newStatus, 'Note:', updateNote);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('After photo uploaded:', file.name);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-[420px] bg-[#1E293B] border-l border-[#475569] shadow-xl z-50 overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#334155] -m-4 p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div>
              <h2 className="text-white font-semibold">{issue.id}</h2>
              <Badge className={`${getStatusColor(issue.status)} text-white text-xs`}>
                {issue.status}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-[#475569]"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Reporter Details */}
        <Card className="bg-[#334155] border-[#475569]">
          <CardHeader>
            <CardTitle className="text-white text-sm">Reporter Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-[#1E293B] p-3 rounded space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Phone:</span>
                <span className="text-white">{issue.citizenPhone}</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-blue-500 text-blue-400 hover:bg-blue-500/20"
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  SMS
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issue Information */}
        <Card className="bg-[#334155] border-[#475569]">
          <CardHeader>
            <CardTitle className="text-white text-sm">Issue Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Before Image */}
            <div>
              <label className="text-gray-300 text-sm">Before Image</label>
              <div className="mt-1 w-full h-32 bg-[#1E293B] border border-[#475569] rounded flex items-center justify-center">
                <span className="text-gray-400">No image uploaded</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-gray-300 text-sm">Description</label>
              <div className="mt-1 p-3 bg-[#1E293B] rounded border border-[#475569]">
                <p className="text-white text-sm">{issue.description}</p>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="text-gray-300 text-sm">Location</label>
              <div className="mt-1 p-3 bg-[#1E293B] rounded border border-[#475569] flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-white text-sm">{issue.location}</span>
              </div>
            </div>

            {/* Severity */}
            <div>
              <label className="text-gray-300 text-sm">Severity</label>
              <div className="mt-1">
                <Badge className={`${getSeverityColor(issue.severity)} text-white`}>
                  {issue.severity}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transfer to Department */}
        <Card className="bg-[#334155] border-[#475569]">
          <CardHeader>
            <CardTitle className="text-white text-sm">Transfer to Department</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select value={transferDepartment} onValueChange={setTransferDepartment}>
              <SelectTrigger className="bg-[#1E293B] border-[#475569] text-white">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent className="bg-[#1E293B] border-[#475569]">
                <SelectItem value="public-works">Public Works</SelectItem>
                <SelectItem value="health-safety">Health & Safety</SelectItem>
                <SelectItem value="transportation">Transportation</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
              </SelectContent>
            </Select>
            
            <Textarea
              placeholder="Reason for transfer"
              value={transferReason}
              onChange={(e) => setTransferReason(e.target.value)}
              className="bg-[#1E293B] border-[#475569] text-white placeholder:text-gray-400"
            />
            
            <Button
              onClick={handleTransfer}
              disabled={!transferDepartment || !transferReason}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            >
              Transfer Issue
            </Button>
          </CardContent>
        </Card>

        {/* Update Status */}
        <Card className="bg-[#334155] border-[#475569]">
          <CardHeader>
            <CardTitle className="text-white text-sm">Update Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="bg-[#1E293B] border-[#475569] text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1E293B] border-[#475569]">
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            
            <Textarea
              placeholder="Add update note"
              value={updateNote}
              onChange={(e) => setUpdateNote(e.target.value)}
              className="bg-[#1E293B] border-[#475569] text-white placeholder:text-gray-400"
            />
            
            <Button
              onClick={handleStatusUpdate}
              disabled={newStatus === issue.status && !updateNote}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Update Status
            </Button>
          </CardContent>
        </Card>

        {/* Upload After Photo */}
        <Card className="bg-[#334155] border-[#475569]">
          <CardHeader>
            <CardTitle className="text-white text-sm">Upload After Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-[#475569] rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="after-image-upload"
              />
              <label htmlFor="after-image-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-white text-sm">Upload after photo</p>
                <p className="text-gray-400 text-xs">Click to select file</p>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Management */}
        <Card className="bg-[#334155] border-[#475569]">
          <CardHeader>
            <CardTitle className="text-white text-sm">Citizen Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Request Feedback
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Allow Citizen Close
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/20"
              >
                Allow Reopen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}