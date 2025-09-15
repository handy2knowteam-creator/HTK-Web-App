import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';

export default function JobDetailsScreen() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a real app, fetch job details from API using jobId
    // For now, use mock data
    const mockJobs = [
      { id: '1', title: 'Kitchen Renovation', description: 'Complete renovation of kitchen including cabinets, countertops, and appliances. Looking for experienced contractor with references.', budget: 5000, location: 'London', customer: 'John Smith', posted: '2 days ago', status: 'open' },
      { id: '2', title: 'Bathroom Repair', description: 'Leaky shower head and clogged drain needs fixing.', budget: 1200, location: 'Manchester', customer: 'Sarah Johnson', posted: '1 day ago', status: 'open' },
      { id: '3', title: 'Deck Installation', description: 'Install a new wooden deck in the backyard.', budget: 3000, location: 'Birmingham', customer: 'Mike Wilson', posted: '3 hours ago', status: 'open' }
    ];
    const foundJob = mockJobs.find(j => j.id === jobId);
    setJob(foundJob);
  }, [jobId]);

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // In a real app, send bid to API
    console.log(`Placing bid for job ${jobId}: Amount ${bidAmount}, Message: ${bidMessage}`);
    // Mock success
    alert('Bid placed successfully!');
    setLoading(false);
    navigate('/tradesperson/dashboard'); // Redirect to tradesperson dashboard after bidding
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p>Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" className="mb-6 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900" onClick={() => navigate(-1)}>
          &larr; Back
        </Button>

        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-yellow-500">{job.title}</CardTitle>
            <p className="text-gray-400 text-sm">Posted by {job.customer} {job.posted}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Description</h3>
              <p className="text-gray-300">{job.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-gray-300">Location</Label>
                <p className="text-white text-lg">{job.location}</p>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-300">Budget</Label>
                <p className="text-white text-lg">£{job.budget}</p>
              </div>
            </div>

            {user?.user_type === 'tradesperson' && job.status === 'open' && (
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-xl font-semibold text-yellow-500 mb-4">Place Your Bid</h3>
                <form onSubmit={handlePlaceBid} className="space-y-4">
                  {error && <p className="text-red-500">{error}</p>}
                  <div>
                    <Label htmlFor="bidAmount" className="text-gray-300">Your Bid Amount (£)</Label>
                    <Input
                      id="bidAmount"
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white focus:ring-yellow-500"
                      required
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bidMessage" className="text-gray-300">Message to Customer (Optional)</Label>
                    <Textarea
                      id="bidMessage"
                      value={bidMessage}
                      onChange={(e) => setBidMessage(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white focus:ring-yellow-500"
                      rows="4"
                      placeholder="Introduce yourself and explain why you're the best fit for this job."
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3"
                    disabled={loading}
                  >
                    {loading ? 'Submitting Bid...' : 'Submit Bid'}
                  </Button>
                </form>
              </div>
            )}

            {user?.user_type === 'customer' && (
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-xl font-semibold text-yellow-500 mb-4">Bids Received</h3>
                {/* Mock bids for customer view */}
                <div className="space-y-4">
                  <Card className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-white font-semibold">Tradesperson A</p>
                        <p className="text-yellow-500 text-xl font-bold">£4800</p>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">"I have extensive experience in kitchen renovations and can start next week."</p>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white mr-2">Accept Bid</Button>
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-600">Message</Button>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-white font-semibold">Tradesperson B</p>
                        <p className="text-yellow-500 text-xl font-bold">£5200</p>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">"Happy to provide a detailed quote after a site visit."</p>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white mr-2">Accept Bid</Button>
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-600">Message</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

