import React, { useState } from 'react'
import { CheckCircle, Circle, ArrowLeft, ArrowRight } from 'lucide-react'
import ProfileSetupForm from './ProfileSetupForm'

const STEPS = [
  { id: 1, title: 'Profile Setup', description: 'Basic information and background' },
  { id: 2, title: 'Project Input', description: 'Engineering projects and experiences' },
  { id: 3, title: 'Document Generation', description: 'AI-powered draft creation' },
  { id: 4, title: 'Review & Edit', description: 'Refine and perfect your CDR' },
  { id: 5, title: 'Download', description: 'Export final documents' }
]

interface ProfileData {
  fullName: string
  engineeringDiscipline: string
  occupationCategory: string
  anzscoCcode: string
  hasProjects: string
  resume: File | null
  linkedinProfile: string
}

export default function CDRWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [profileData, setProfileData] = useState<ProfileData | null>(null)

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleProfileComplete = (data: ProfileData) => {
    setProfileData(data)
    nextStep()
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ProfileSetupForm onNext={handleProfileComplete} />
      case 2:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="min-h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <Circle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Project Input
                  </h3>
                  <p className="mt-2 text-gray-500">
                    {profileData?.hasProjects === 'yes' 
                      ? 'Upload or describe your engineering projects'
                      : 'AI will suggest project ideas based on your profile'
                    }
                  </p>
                  {profileData && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg text-left">
                      <h4 className="font-medium text-blue-900 mb-2">Profile Summary:</h4>
                      <p className="text-sm text-blue-800">
                        <strong>{profileData.fullName}</strong> - {profileData.engineeringDiscipline}
                      </p>
                      <p className="text-sm text-blue-800">
                        {profileData.occupationCategory} (ANZSCO: {profileData.anzscoCcode})
                      </p>
                      <p className="text-sm text-blue-800">
                        Has Projects: {profileData.hasProjects === 'yes' ? 'Yes' : 'No'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="min-h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <Circle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Document Generation
                  </h3>
                  <p className="mt-2 text-gray-500">
                    AI will generate your Career Episodes, CPD, Resume, and Summary Statement
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="min-h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <Circle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Review & Edit
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Review and edit your generated CDR documents with EA compliance checking
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="min-h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <Circle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Download Documents
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Download your final CDR documents in .docx and .pdf formats
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">CDR Generation Wizard</h1>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep} of {STEPS.length}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    step.id < currentStep 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : step.id === currentStep
                        ? 'border-blue-600 text-blue-600'
                        : 'border-gray-300 text-gray-400'
                  }`}>
                    {step.id < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      step.id <= currentStep ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                    <p className={`text-xs ${
                      step.id <= currentStep ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    step.id < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStepContent()}

        {/* Navigation - Only show for steps 2+ */}
        {currentStep > 1 && (
          <div className="flex justify-between mt-8 max-w-2xl mx-auto">
            <button
              onClick={prevStep}
              className="flex items-center px-6 py-3 rounded-lg font-medium transition-colors bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
            
            <button
              onClick={nextStep}
              disabled={currentStep === STEPS.length}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === STEPS.length
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}