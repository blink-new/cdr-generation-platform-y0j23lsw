import { Button } from './ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { CheckCircle, FileText, Brain, Users, Download, Shield, Clock, Star } from 'lucide-react'
import { blink } from '../blink/client'

interface LandingPageProps {
  onGetStarted: () => void
  isAuthenticated?: boolean
  user?: any
}

export default function LandingPage({ onGetStarted, isAuthenticated, user }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">CDR Generator</h1>
                <p className="text-xs text-muted-foreground">Engineering Australia</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">Welcome, {user.email}</span>
                  <Button variant="outline" size="sm" onClick={() => blink.auth.logout()}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={onGetStarted}>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            <Brain className="w-4 h-4 mr-2" />
            AI-Powered CDR Generation
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Create Your{' '}
            <span className="text-primary">Engineering Australia</span>{' '}
            CDR with AI
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Generate comprehensive, compliant Competency Demonstration Reports in minutes. 
            Our AI guides you through every step, from project ideas to final documents.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" onClick={onGetStarted} className="text-lg px-8 py-6">
              {isAuthenticated ? 'Start New CDR' : 'Get Started Free'}
              <FileText className="ml-2 w-5 h-5" />
            </Button>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              No credit card required
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-accent" />
              EA Guidelines Compliant
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-accent" />
              Secure & Private
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-accent" />
              Save 40+ Hours
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Your CDR
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From initial data collection to final document export, we've got every step covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>AI Project Suggestions</CardTitle>
                <CardDescription>
                  Don't have project ideas? Our AI analyzes your background and suggests 10 relevant engineering projects.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Complete CDR Suite</CardTitle>
                <CardDescription>
                  Generate Career Episodes, CPD logs, Resume, and Summary Statement - all in one platform.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Competency Mapping</CardTitle>
                <CardDescription>
                  Automatically map your content to EA competency elements and identify gaps for improvement.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Migration Agent Support</CardTitle>
                <CardDescription>
                  Perfect for migration agents helping multiple clients with their CDR applications.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Professional Export</CardTitle>
                <CardDescription>
                  Download your completed CDR in both .docx and .pdf formats, ready for EA submission.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>EA Compliance</CardTitle>
                <CardDescription>
                  Built with the latest Engineering Australia guidelines to ensure your CDR meets all requirements.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple 4-step process to create your complete CDR
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Profile Setup',
                description: 'Enter your basic information: name, field of study, ANZSCO code, and LinkedIn profile.'
              },
              {
                step: '02',
                title: 'Project Input',
                description: 'Upload existing projects or let our AI suggest relevant engineering projects for your background.'
              },
              {
                step: '03',
                title: 'AI Generation',
                description: 'Our AI creates drafts of all CDR components and maps them to EA competency elements.'
              },
              {
                step: '04',
                title: 'Review & Export',
                description: 'Edit your documents in our platform and download the final CDR in professional formats.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Create Your CDR?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of engineers who have successfully created their CDRs with our AI platform.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={onGetStarted}
            className="text-lg px-8 py-6"
          >
            {isAuthenticated ? 'Start New CDR' : 'Get Started Now'}
            <FileText className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">CDR Generator</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 CDR Generator. Built for Engineering Australia compliance.
          </p>
        </div>
      </footer>
    </div>
  )
}