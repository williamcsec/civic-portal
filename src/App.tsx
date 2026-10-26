import { useState } from 'react';
import { CitizenPortal } from './components/CitizenPortal';
import { MunicipalDashboard } from './components/MunicipalDashboard';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Users, Shield } from 'lucide-react';

type AppMode = 'landing' | 'citizen' | 'municipal';

export default function App() {
  const [mode, setMode] = useState<AppMode>('landing');

  if (mode === 'citizen') {
    return <CitizenPortal onBack={() => setMode('landing')} />;
  }

  if (mode === 'municipal') {
    return <MunicipalDashboard onBack={() => setMode('landing')} />;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Civic Issue Reporting & Resolution Platform
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Complete municipal complaint management system connecting citizens with government services
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-[#1E293B] border-[#475569] hover:bg-[#334155] transition-colors cursor-pointer"
                onClick={() => setMode('citizen')}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white">Citizen Portal</CardTitle>
              <CardDescription className="text-gray-300">
                Report issues, track complaints, and get updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setMode('citizen');
                }}
              >
                Access Citizen Portal
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#1E293B] border-[#475569] hover:bg-[#334155] transition-colors cursor-pointer"
                onClick={() => setMode('municipal')}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white">Municipal Dashboard</CardTitle>
              <CardDescription className="text-gray-300">
                Manage issues, coordinate departments, and respond to citizens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setMode('municipal');
                }}
              >
                Access Municipal Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}