import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowLeft, Clock, CheckCircle, AlertTriangle, XCircle, Star } from 'lucide-react';
import { FeedbackModal } from './FeedbackModal';

interface TrackComplaintsProps {
  onBack: () => void;
}

interface Complaint {
  id: string;
  description: string;
  area: string;
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  severity: string;
  reportedDate: string;
  lastUpdated: string;
  department?: string;
}

const mockComplaints: Complaint[] = [
  {
    id: 'CIV-2024-001',
    description: 'Broken street light on Main Street causing safety concerns',
    area: 'Ward 1 - Central District',
    status: 'resolved',
    severity: 'Medium',
    reportedDate: '2024-01-15',
    lastUpdated: '2024-01-18',
    department: 'Public Works'
  },
  {
    id: 'CIV-2024-002',
    description: 'Pothole causing traffic disruption near City Hall',
    area: 'Ward 2 - North Zone',
    status: 'in-progress',
    severity: 'High',
    reportedDate: '2024-01-20',
    lastUpdated: '2024-01-22',
    department: 'Transportation'
  },
  {
    id: 'CIV-2024-003',
    description: 'Overflowing garbage bin attracting pests',
    area: 'Ward 3 - South Zone',
    status: 'new',
    severity: 'Low',
    reportedDate: '2024-01-25',
    lastUpdated: '2024-01-25',
    department: 'Health & Safety'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'new':
      return <AlertTriangle className="h-4 w-4" />;
    case 'in-progress':
      return <Clock className="h-4 w-4" />;
    case 'resolved':
      return <CheckCircle className="h-4 w-4" />;
    case 'closed':
      return <XCircle className="h-4 w-4" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new':
      return 'bg-red-500';
    case 'in-progress':
      return 'bg-yellow-500';
    case 'resolved':
      return 'bg-green-500';
    case 'closed':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'low':
      return 'bg-green-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'high':
      return 'bg-red-500';
    case 'urgent':
      return 'bg-red-600';
    case 'critical':
      return 'bg-red-800';
    default:
      return 'bg-gray-500';
  }
};

export function TrackComplaints({ onBack }: TrackComplaintsProps) {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleFeedbackSubmit = (feedback: { rating: number; comment: string; action: 'close' | 'reopen' }) => {
    console.log('Feedback submitted:', feedback);
    setShowFeedbackModal(false);
    setSelectedComplaint(null);
    // Update complaint status based on action
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-white hover:bg-[#1E293B]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">Track Complaints</h1>
          <div className="w-20"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {mockComplaints.map((complaint) => (
            <Card 
              key={complaint.id} 
              className="bg-[#1E293B] border-[#475569] hover:bg-[#334155] transition-colors cursor-pointer"
              onClick={() => setSelectedComplaint(complaint)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center space-x-2">
                    <span>{complaint.id}</span>
                    {complaint.status === 'resolved' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedComplaint(complaint);
                          setShowFeedbackModal(true);
                        }}
                        className="text-yellow-400 hover:text-yellow-300 hover:bg-[#334155]"
                      >
                        <Star className="h-4 w-4 mr-1" />
                        Rate
                      </Button>
                    )}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getSeverityColor(complaint.severity)} text-white`}>
                      {complaint.severity}
                    </Badge>
                    <Badge className={`${getStatusColor(complaint.status)} text-white flex items-center space-x-1`}>
                      {getStatusIcon(complaint.status)}
                      <span className="capitalize">{complaint.status.replace('-', ' ')}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <p className="text-gray-300">{complaint.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Area:</span>
                      <p className="text-white">{complaint.area}</p>
                    </div>
                    
                    {complaint.department && (
                      <div>
                        <span className="text-gray-400">Department:</span>
                        <p className="text-white">{complaint.department}</p>
                      </div>
                    )}
                    
                    <div>
                      <span className="text-gray-400">Last Updated:</span>
                      <p className="text-white">{new Date(complaint.lastUpdated).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {complaint.status === 'in-progress' && (
                    <div className="bg-[#334155] rounded-lg p-3 mt-4">
                      <p className="text-yellow-300 text-sm font-medium">🔄 In Progress</p>
                      <p className="text-gray-300 text-sm mt-1">
                        Your complaint is being actively worked on by the {complaint.department} department.
                      </p>
                    </div>
                  )}

                  {complaint.status === 'resolved' && (
                    <div className="bg-[#334155] rounded-lg p-3 mt-4">
                      <p className="text-green-300 text-sm font-medium">✅ Resolved</p>
                      <p className="text-gray-300 text-sm mt-1">
                        This issue has been resolved. Please rate your experience.
                      </p>
                    </div>
                  )}

                  {complaint.status === 'new' && (
                    <div className="bg-[#334155] rounded-lg p-3 mt-4">
                      <p className="text-blue-300 text-sm font-medium">📋 New</p>
                      <p className="text-gray-300 text-sm mt-1">
                        Your complaint has been received and is awaiting assignment.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {mockComplaints.length === 0 && (
            <Card className="bg-[#1E293B] border-[#475569]">
              <CardContent className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">No Complaints Found</h3>
                <p className="text-gray-300">You haven't submitted any complaints yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {showFeedbackModal && selectedComplaint && (
        <FeedbackModal
          complaint={selectedComplaint}
          onSubmit={handleFeedbackSubmit}
          onClose={() => {
            setShowFeedbackModal(false);
            setSelectedComplaint(null);
          }}
        />
      )}
    </div>
  );
}