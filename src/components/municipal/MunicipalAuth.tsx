import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Shield, User, Lock, Building } from 'lucide-react';

interface MunicipalAuthProps {
  onSuccess: () => void;
}

export function MunicipalAuth({ onSuccess }: MunicipalAuthProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    department: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const departments = [
    'Public Works',
    'Health & Safety',
    'Transportation',
    'Environment',
    'Utilities',
    'Administration'
  ];

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password || !credentials.department) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        onSuccess();
      } else {
        setError('Invalid credentials. Try username: admin, password: admin123');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#1E293B] border-[#475569]">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-white">Municipal Staff Login</CardTitle>
          <CardDescription className="text-gray-300">
            Access the municipal dashboard to manage civic issues
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-white flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Employee ID</span>
            </label>
            <Input
              type="text"
              placeholder="Enter your employee ID"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="bg-[#334155] border-[#475569] text-white placeholder:text-gray-400 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-white flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Password</span>
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="bg-[#334155] border-[#475569] text-white placeholder:text-gray-400 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-white flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Department</span>
            </label>
            <Select value={credentials.department} onValueChange={(value) => setCredentials({ ...credentials, department: value })}>
              <SelectTrigger className="bg-[#334155] border-[#475569] text-white">
                <SelectValue placeholder="Select your department" />
              </SelectTrigger>
              <SelectContent className="bg-[#334155] border-[#475569]">
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept.toLowerCase().replace(/\s+/g, '-')}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>

          <div className="pt-4 text-center">
            <p className="text-gray-400 text-sm">
              Demo credentials: admin / admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}