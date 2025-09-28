import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import tempDB from '../utils/tempDatabase'
import { Users, Wrench, FileText, CreditCard, Download, Trash2, Eye } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({})
  const [customers, setCustomers] = useState([])
  const [tradespeople, setTradespeople] = useState([])
  const [jobRequests, setJobRequests] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setStats(tempDB.getStatistics())
    setCustomers(tempDB.getAllCustomers())
    setTradespeople(tempDB.getAllTradespeople())
    setJobRequests(tempDB.getAllJobRequests())
    setSubscriptions(tempDB.getAllSubscriptions())
  }

  const exportData = () => {
    const data = tempDB.exportAllData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `htk-data-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      tempDB.clearAllData()
      loadData()
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-yellow-500 mb-2">HTK Admin Dashboard</h1>
            <p className="text-gray-400">Temporary Database - User Collection System</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={exportData} className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button onClick={clearAllData} variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Data
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalCustomers || 0}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Tradespeople</CardTitle>
            <Wrench className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalTradespeople || 0}</div>
            <p className="text-xs text-gray-400">
              {stats.activeTradespeople || 0} active, {stats.pendingTradespeople || 0} pending
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Job Requests</CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalJobRequests || 0}</div>
            <p className="text-xs text-gray-400">{stats.openJobs || 0} open jobs</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalSubscriptions || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        {['overview', 'customers', 'tradespeople', 'jobs', 'subscriptions'].map((tab) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            variant={activeTab === tab ? 'default' : 'outline'}
            className={activeTab === tab ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'customers' && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-500">Registered Customers</CardTitle>
          </CardHeader>
          <CardContent>
            {customers.length === 0 ? (
              <p className="text-gray-400">No customers registered yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-2 text-gray-400">Name</th>
                      <th className="text-left p-2 text-gray-400">Email</th>
                      <th className="text-left p-2 text-gray-400">Phone</th>
                      <th className="text-left p-2 text-gray-400">Location</th>
                      <th className="text-left p-2 text-gray-400">Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-b border-gray-800">
                        <td className="p-2 text-white">{customer.name}</td>
                        <td className="p-2 text-gray-300">{customer.email}</td>
                        <td className="p-2 text-gray-300">{customer.phone}</td>
                        <td className="p-2 text-gray-300">{customer.location}</td>
                        <td className="p-2 text-gray-400">{formatDate(customer.registeredAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'tradespeople' && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-500">Registered Tradespeople</CardTitle>
          </CardHeader>
          <CardContent>
            {tradespeople.length === 0 ? (
              <p className="text-gray-400">No tradespeople registered yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-2 text-gray-400">Name</th>
                      <th className="text-left p-2 text-gray-400">Email</th>
                      <th className="text-left p-2 text-gray-400">Trade</th>
                      <th className="text-left p-2 text-gray-400">Location</th>
                      <th className="text-left p-2 text-gray-400">Credits</th>
                      <th className="text-left p-2 text-gray-400">Status</th>
                      <th className="text-left p-2 text-gray-400">Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradespeople.map((tradesperson) => (
                      <tr key={tradesperson.id} className="border-b border-gray-800">
                        <td className="p-2 text-white">{tradesperson.name}</td>
                        <td className="p-2 text-gray-300">{tradesperson.email}</td>
                        <td className="p-2 text-yellow-500">{tradesperson.trade}</td>
                        <td className="p-2 text-gray-300">{tradesperson.location}</td>
                        <td className="p-2 text-green-400">{tradesperson.credits}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            tradesperson.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'
                          }`}>
                            {tradesperson.status}
                          </span>
                        </td>
                        <td className="p-2 text-gray-400">{formatDate(tradesperson.registeredAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Add other tab content as needed */}
      {activeTab === 'overview' && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-500">System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-800 rounded">
                <h3 className="text-lg font-semibold text-white mb-2">Temporary Database Status</h3>
                <p className="text-gray-300">
                  The temporary database is collecting user registrations using localStorage. 
                  All data is stored locally in the browser and will be available until cleared.
                </p>
              </div>
              <div className="p-4 bg-gray-800 rounded">
                <h3 className="text-lg font-semibold text-white mb-2">Data Collection</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>✅ Customer registrations with contact details</li>
                  <li>✅ Tradesperson registrations with trade specializations</li>
                  <li>✅ Job requests with automated pricing</li>
                  <li>✅ Subscription data with credit tracking</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-800 rounded">
                <h3 className="text-lg font-semibold text-white mb-2">Export & Migration</h3>
                <p className="text-gray-300">
                  Use the "Export Data" button to download all collected data as JSON for 
                  migration to your production database when ready.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

