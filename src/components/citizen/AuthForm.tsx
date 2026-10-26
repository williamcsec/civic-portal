import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { User, Phone, Mail, Lock, UserPlus, LogIn, Shield } from 'lucide-react';
import { supabase } from '../../utils/supabase/client';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { isDemoMode } from '../../src/env';
import { demoService } from '../../utils/demoService';

interface AuthFormProps {
  onAuthSuccess: (user: any) => void;
  userType: 'citizen' | 'municipal';
}

export function AuthForm({ onAuthSuccess, userType }: AuthFormProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    department: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let result;

      if (isDemoMode) {
        // Use demo service
        result = await demoService.login(formData.email, formData.password);
      } else {
        // Use real Supabase auth
        result = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
      }

      const { data, error } = result;
      if (error) throw error;

      if (data.user) {
        // Check if user type matches
        const expectedUserType = userType;
        const actualUserType = data.user.user_metadata?.userType;

        if (actualUserType !== expectedUserType) {
          throw new Error(`This account is not registered as ${expectedUserType} user`);
        }

        // Store auth token
        localStorage.setItem('authToken', data.session.access_token);
        localStorage.setItem('userType', actualUserType);
        localStorage.setItem('userData', JSON.stringify(data.user));

        onAuthSuccess(data.user);
      }

    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      if (!formData.name || !formData.phone) {
        throw new Error('Please fill in all required fields');
      }

      if (userType === 'municipal' && !formData.department) {
        throw new Error('Please select your department');
      }

      if (isDemoMode) {
        // Use demo service
        const result = await demoService.signup({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
          userType,
          department: userType === 'municipal' ? formData.department : undefined
        });

        if (!result.success) {
          throw new Error('Signup failed');
        }

        // Auto-login after signup in demo mode
        const loginResult = await demoService.login(formData.email, formData.password);
        const { data } = loginResult;

        if (data.user) {
          localStorage.setItem('authToken', data.session.access_token);
          localStorage.setItem('userType', userType);
          localStorage.setItem('userData', JSON.stringify(data.user));
          onAuthSuccess(data.user);
        }
      } else {
        // Call our custom signup endpoint
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-9c2b6e13/signup`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
              name: formData.name,
              phone: formData.phone,
              userType,
              department: userType === 'municipal' ? formData.department : undefined
            }),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Signup failed');
        }

        // Auto-login after signup
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        if (data.user) {
          localStorage.setItem('authToken', data.session.access_token);
          localStorage.setItem('userType', userType);
          localStorage.setItem('userData', JSON.stringify(data.user));
          onAuthSuccess(data.user);
        }
      }

    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-[#1E293B] border-[#475569]">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            {userType === 'citizen' ? (
              <User className="h-8 w-8 text-white" />
            ) : (
              <Shield className="h-8 w-8 text-white" />
            )}
          </div>
          <CardTitle className="text-white text-xl">
            {userType === 'citizen' ? 'Citizen Portal' : 'Municipal Dashboard'}
          </CardTitle>
          <p className="text-gray-400 text-sm">
            {userType === 'citizen' 
              ? 'Access your civic issue reporting portal'
              : 'Access municipal issue management system'
            }
          </p>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2 bg-[#334155]">
              <TabsTrigger value="login" className="text-white data-[state=active]:bg-blue-500">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-white data-[state=active]:bg-blue-500">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-white text-sm mb-2 block">Email</label>
                  <div className="relative">
                    <Mail className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-[#334155] border-[#475569] text-white pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">Password</label>
                  <div className="relative">
                    <Lock className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="bg-[#334155] border-[#475569] text-white pl-10"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="text-white text-sm mb-2 block">Full Name</label>
                  <div className="relative">
                    <User className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-[#334155] border-[#475569] text-white pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-[#334155] border-[#475569] text-white pl-10"
                      required
                    />
                  </div>
                </div>

                {userType === 'municipal' && (
                  <div>
                    <label className="text-white text-sm mb-2 block">Department</label>
                    <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                      <SelectTrigger className="bg-[#334155] border-[#475569] text-white">
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#334155] border-[#475569]">
                        <SelectItem value="public-works">Public Works</SelectItem>
                        <SelectItem value="sanitation">Sanitation</SelectItem>
                        <SelectItem value="transportation">Transportation</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="parks-recreation">Parks & Recreation</SelectItem>
                        <SelectItem value="admin">Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <label className="text-white text-sm mb-2 block">Email</label>
                  <div className="relative">
                    <Mail className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-[#334155] border-[#475569] text-white pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">Password</label>
                  <div className="relative">
                    <Lock className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="bg-[#334155] border-[#475569] text-white pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">Confirm Password</label>
                  <div className="relative">
                    <Lock className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="bg-[#334155] border-[#475569] text-white pl-10"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {error && (
            <Alert className="mt-4 border-red-500 bg-red-500/10">
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {userType === 'citizen' 
                ? 'Need municipal access? Contact your local government.'
                : 'This portal is for authorized municipal staff only.'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}