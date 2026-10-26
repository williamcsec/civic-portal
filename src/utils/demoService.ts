import { isDemoMode } from '../src/env';

// Demo data for testing without backend
const demoIssues = [
  {
    id: 'DEMO-001',
    area: 'ward-1',
    description: 'Broken streetlight on Main Street',
    severity: 3,
    status: 'open',
    coordinates: { lat: 52.15, lng: -0.85 },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
  },
  {
    id: 'DEMO-002',
    area: 'ward-2',
    description: 'Pothole causing traffic issues',
    severity: 4,
    status: 'in-progress',
    coordinates: { lat: 52.25, lng: -0.95 },
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
  }
];

let demoIssueCounter = 3;

export const demoService = {
  // Simulate image upload with verification
  uploadImage: async (file: File, issueId: string) => {
    if (!isDemoMode) throw new Error('Demo service only available in demo mode');
    
    console.log('🎭 Demo: Simulating image verification for', file.name);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate verification (always pass in demo)
    const verification = {
      isAIGenerated: false,
      isFromInternet: false,
      confidence: 0.1,
      details: {
        hiveAI: { aiScore: 0.1, threshold: 0.7 },
        googleVision: { exactMatches: 0, partialMatches: 0 }
      }
    };

    // Create a fake signed URL
    const fakeSignedUrl = URL.createObjectURL(file);
    
    return {
      success: true,
      fileName: `demo_${Date.now()}_${file.name}`,
      signedUrl: fakeSignedUrl,
      verification
    };
  },

  // Simulate user signup
  signup: async (userData: any) => {
    if (!isDemoMode) throw new Error('Demo service only available in demo mode');
    
    console.log('🎭 Demo: Simulating user signup for', userData.email);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = {
      id: `demo-user-${Date.now()}`,
      email: userData.email,
      user_metadata: {
        name: userData.name,
        phone: userData.phone,
        userType: userData.userType,
        department: userData.department
      }
    };

    return { success: true, user };
  },

  // Simulate user login
  login: async (email: string, password: string) => {
    if (!isDemoMode) throw new Error('Demo service only available in demo mode');
    
    console.log('🎭 Demo: Simulating login for', email);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = {
      id: `demo-user-${Date.now()}`,
      email,
      user_metadata: {
        name: 'Demo User',
        phone: '+1234567890',
        userType: email.includes('municipal') ? 'municipal' : 'citizen',
        department: email.includes('municipal') ? 'public-works' : undefined
      }
    };

    const session = {
      access_token: `demo-token-${Date.now()}`,
      user
    };

    return { data: { user, session }, error: null };
  },

  // Simulate issue submission
  submitIssue: async (issueData: any) => {
    if (!isDemoMode) throw new Error('Demo service only available in demo mode');
    
    console.log('🎭 Demo: Simulating issue submission', issueData);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const issueId = `DEMO-${String(demoIssueCounter++).padStart(3, '0')}`;
    
    const issue = {
      id: issueId,
      ...issueData,
      status: 'open',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    demoIssues.push(issue);

    return { success: true, issueId, issue };
  },

  // Get user issues
  getUserIssues: async () => {
    if (!isDemoMode) throw new Error('Demo service only available in demo mode');
    
    console.log('🎭 Demo: Fetching user issues');
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true, issues: demoIssues };
  },

  // Get all issues (for municipal dashboard)
  getAllIssues: async () => {
    if (!isDemoMode) throw new Error('Demo service only available in demo mode');
    
    console.log('🎭 Demo: Fetching all issues for municipal dashboard');
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true, issues: demoIssues };
  },

  // Update issue status
  updateIssue: async (issueId: string, updates: any) => {
    if (!isDemoMode) throw new Error('Demo service only available in demo mode');
    
    console.log('🎭 Demo: Updating issue', issueId, updates);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const issueIndex = demoIssues.findIndex(issue => issue.id === issueId);
    if (issueIndex !== -1) {
      demoIssues[issueIndex] = {
        ...demoIssues[issueIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      return { success: true, issue: demoIssues[issueIndex] };
    }
    
    throw new Error('Issue not found');
  }
};

// Show demo mode notification
if (isDemoMode) {
  console.log('🎭 Demo Service initialized');
  console.log('📋 Available demo issues:', demoIssues.length);
}