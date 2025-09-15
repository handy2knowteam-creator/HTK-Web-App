import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';

export default function PostJobScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobBudget, setJobBudget] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePostJob = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // In a real app, send job data to API
    console.log('Posting job:', { jobTitle, jobDescription, jobBudget, jobLocation });

    // Mock success
    alert('Job posted successfully!');
    setLoading(false);
    navigate('/customer/dashboard'); // Redirect to customer dashboard after posting
  };

  if (!user || user.user_type !== 'customer') {
    return <p className="text-red-500">Unauthorized access.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <Button variant="outline" className="mb-6 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900" onClick={() => navigate(-1)}>
          &larr; Back to Dashboard
        </Button>

        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-yellow-500">Post a New Job</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePostJob} className="space-y-6">
              {error && <p className="text-red-500 text-center">{error}</p>}
              <div>
                <Label htmlFor="jobTitle" className="text-gray-300">Job Title</Label>
                <Input
                  id="jobTitle"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="jobDescription" className="text-gray-300">Description</Label>
                <Textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-yellow-500"
                  rows="5"
                  placeholder="Describe the job in detail, including any specific requirements or materials."
                  required
                />
              </div>
              <div>
                <Label htmlFor="jobBudget" className="text-gray-300">Budget (£)</Label>
                <Input
                  id="jobBudget"
                  type="number"
                  value={jobBudget}
                  onChange={(e) => setJobBudget(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-yellow-500"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="jobLocation" className="text-gray-300">Location</Label>
                <Input
                  id="jobLocation"
                  type="text"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-yellow-500"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3"
                disabled={loading}
              >
                {loading ? 'Posting Job...' : 'Post Job'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

