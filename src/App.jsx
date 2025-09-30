import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Components
import LandingPage from './components/LandingPageResponsive'
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen'
import CustomerDashboard from './components/CustomerDashboard'
import TradespersonDashboard from './components/TradespersonDashboard'
import CustomerJobPosting from './components/CustomerJobPosting'
import TradespersonJobBrowsing from './components/TradespersonJobBrowsing'
import JobRequestForm from './components/JobRequestForm'
import SubscriptionManager from './components/SubscriptionManager'
import StripeIntegration from './components/StripeIntegration'
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLoginSecure'
import AdminDashboardComplete from './components/AdminDashboardComplete'
import ComingSoon from './components/ComingSoon'
import TermsOfService from './components/TermsOfService'
import PrivacyPolicy from './components/PrivacyPolicy'
import CommunityGuidelines from './components/CommunityGuidelines'
import CommunityHub from './components/CommunityHub'
import JobManagementSystem from './components/JobManagementSystem'
import SupportPage from './components/SupportPage'
import HowItWorks from './components/HowItWorks'
import AboutHTK from './components/AboutHTK'
import PricingCredits from './components/PricingCredits'
import ThankYouSimple from './components/ThankYouSimple'
import CommunityProjects from './components/CommunityProjects'
import TradeCollaboration from './components/TradeCollaboration'
import TradespersonOfTheMonth from './components/TradespersonOfTheMonth'
import ProductShowcase from './components/ProductShowcase'
import InvestmentPartnership from './components/InvestmentPartnership'
import FAQ from './components/FAQ'

// Context
import { AuthProvider, useAuth } from './contexts/AuthContext'

function AppContent() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="htk-logo-container justify-center mb-6">
            <img 
              src="/htk-logo-large.png" 
              alt="HTK Logo" 
              className="htk-logo-luxury htk-logo-large animate-pulse"
              style={{ height: '80px', width: 'auto' }}
            />
          </div>
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="htk-text-luxury text-lg">Loading HTK Platform...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Routes>
          {!user ? (
            // Unauthenticated routes
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login/:userType" element={<LoginScreen />} />
              <Route path="/register/:userType" element={<RegisterScreen />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboardComplete />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/community-guidelines" element={<CommunityGuidelines />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<AboutHTK />} />
              <Route path="/pricing" element={<PricingCredits />} />
              <Route path="/thank-you" element={<ThankYouSimple />} />
              <Route path="/community-projects" element={<CommunityProjects />} />
              <Route path="/trade-collaboration" element={<TradeCollaboration />} />
              <Route path="/tradesperson-of-the-month" element={<TradespersonOfTheMonth />} />
              <Route path="/products" element={<ProductShowcase />} />
              <Route path="/investment-partnership" element={<InvestmentPartnership />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/community-hub" element={<CommunityHub />} />
              <Route path="/job-management" element={<JobManagementSystem />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            // Authenticated routes
            <>
              {user.userType === 'customer' ? (
                <>
                  <Route path="/dashboard" element={<CustomerDashboard />} />
                  <Route path="/post-job" element={<CustomerJobPosting />} />
                  <Route path="/job-request" element={<JobRequestForm />} />
                  <Route path="/credits" element={<StripeIntegration />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<TradespersonDashboard />} />
                  <Route path="/browse-jobs" element={<TradespersonJobBrowsing />} />
                  <Route path="/subscription" element={<SubscriptionManager />} />
                  <Route path="/credits" element={<StripeIntegration />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </>
              )}
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/community-guidelines" element={<CommunityGuidelines />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<AboutHTK />} />
              <Route path="/pricing" element={<PricingCredits />} />
              <Route path="/thank-you" element={<ThankYouSimple />} />
              <Route path="/community-projects" element={<CommunityProjects />} />
              <Route path="/trade-collaboration" element={<TradeCollaboration />} />
              <Route path="/tradesperson-of-the-month" element={<TradespersonOfTheMonth />} />
              <Route path="/products" element={<ProductShowcase />} />
              <Route path="/investment-partnership" element={<InvestmentPartnership />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

