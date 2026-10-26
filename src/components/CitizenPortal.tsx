import { useState } from 'react';
import { CitizenAuth } from './citizen/CitizenAuth';
import { ReportIssue } from './citizen/ReportIssue';
import { TrackComplaints } from './citizen/TrackComplaints';
import { Button } from './ui/button';
import { ArrowLeft, Plus, Search, Home } from 'lucide-react';

interface CitizenPortalProps {
  onBack: () => void;
}

type CitizenPage = 'auth' | 'home' | 'report' | 'track';

export function CitizenPortal({ onBack }: CitizenPortalProps) {
  const [currentPage, setCurrentPage] = useState<CitizenPage>('auth');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F172A]">
        <div className="p-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-white hover:bg-[#1E293B]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Main
          </Button>
        </div>
        <CitizenAuth onSuccess={handleAuthSuccess} />
      </div>
    );
  }

  if (currentPage === 'report') {
    return (
      <div className="min-h-screen bg-[#0F172A]">
        <ReportIssue onBack={() => setCurrentPage('home')} />
      </div>
    );
  }

  if (currentPage === 'track') {
    return (
      <div className="min-h-screen bg-[#0F172A]">
        <TrackComplaints onBack={() => setCurrentPage('home')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-white hover:bg-[#1E293B]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Main
            </Button>
            <h1 className="text-2xl font-bold">Citizen Portal</h1>
          </div>
        </div>

        <div className="grid gap-6 max-w-2xl mx-auto">
          <div className="bg-[#1E293B] rounded-lg p-6 border border-[#475569]">
            <h2 className="text-xl font-semibold mb-4">Welcome, Citizen!</h2>
            <p className="text-gray-300 mb-6">
              Report civic issues, track your complaints, and help improve your community.
            </p>
          </div>

          <div className="grid gap-4">
            <button
              onClick={() => setCurrentPage('report')}
              className="bg-[#1E293B] hover:bg-[#334155] border border-[#475569] rounded-lg p-6 text-left transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Report New Issue</h3>
                  <p className="text-gray-300">File a complaint about civic problems in your area</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setCurrentPage('track')}
              className="bg-[#1E293B] hover:bg-[#334155] border border-[#475569] rounded-lg p-6 text-left transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Track Complaints</h3>
                  <p className="text-gray-300">Check the status of your submitted issues</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}