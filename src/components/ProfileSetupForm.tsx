import React, { useState } from 'react'
import { Upload, User, GraduationCap, Briefcase, Hash, FolderOpen, Linkedin } from 'lucide-react'

interface ProfileData {
  fullName: string
  engineeringDiscipline: string
  occupationCategory: string
  anzscoCcode: string
  hasProjects: string
  resume: File | null
  linkedinProfile: string
}

interface ProfileSetupFormProps {
  onNext: (data: ProfileData) => void
}

const ENGINEERING_DISCIPLINES = [
  'Aeronautical Engineering',
  'Agricultural Engineering',
  'Biomedical Engineering',
  'Chemical Engineering',
  'Civil Engineering',
  'Computer Engineering',
  'Electrical Engineering',
  'Electronics Engineering',
  'Environmental Engineering',
  'Industrial Engineering',
  'Materials Engineering',
  'Mechanical Engineering',
  'Mining Engineering',
  'Nuclear Engineering',
  'Petroleum Engineering',
  'Software Engineering',
  'Structural Engineering',
  'Telecommunications Engineering',
  'Other'
]

const OCCUPATION_CATEGORIES = [
  'Professional Engineer',
  'Engineering Technologist',
  'Engineering Associate',
  'Engineering Manager'
]

export default function ProfileSetupForm({ onNext }: ProfileSetupFormProps) {
  const [formData, setFormData] = useState<ProfileData>({
    fullName: '',
    engineeringDiscipline: '',
    occupationCategory: '',
    anzscoCcode: '',
    hasProjects: '',
    resume: null,
    linkedinProfile: ''
  })

  const [errors, setErrors] = useState<Partial<ProfileData>>({})
  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleFileUpload = (file: File) => {
    if (file.type === 'application/pdf' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword') {
      setFormData(prev => ({ ...prev, resume: file }))
      if (errors.resume) {
        setErrors(prev => ({ ...prev, resume: undefined }))
      }
    } else {
      setErrors(prev => ({ ...prev, resume: 'Please upload a PDF or Word document' }))
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<ProfileData> = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.engineeringDiscipline) newErrors.engineeringDiscipline = 'Engineering discipline is required'
    if (!formData.occupationCategory) newErrors.occupationCategory = 'Occupation category is required'
    if (!formData.anzscoCcode.trim()) newErrors.anzscoCcode = 'ANZSCO code is required'
    if (!formData.hasProjects) newErrors.hasProjects = 'Please indicate if you have engineering projects'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onNext(formData)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Profile Setup</h2>
          <p className="text-gray-600">
            Let's start by collecting your basic information to create your personalized CDR.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.fullName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your full name as it appears on official documents"
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
          </div>

          {/* Engineering Discipline */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <GraduationCap className="w-4 h-4 mr-2" />
              Engineering Discipline or Specialization *
            </label>
            <select
              value={formData.engineeringDiscipline}
              onChange={(e) => handleInputChange('engineeringDiscipline', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.engineeringDiscipline ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select your engineering discipline</option>
              {ENGINEERING_DISCIPLINES.map(discipline => (
                <option key={discipline} value={discipline}>{discipline}</option>
              ))}
            </select>
            {errors.engineeringDiscipline && <p className="mt-1 text-sm text-red-600">{errors.engineeringDiscipline}</p>}
          </div>

          {/* Occupation Category */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="w-4 h-4 mr-2" />
              Occupation Category *
            </label>
            <select
              value={formData.occupationCategory}
              onChange={(e) => handleInputChange('occupationCategory', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.occupationCategory ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select your occupation category</option>
              {OCCUPATION_CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.occupationCategory && <p className="mt-1 text-sm text-red-600">{errors.occupationCategory}</p>}
          </div>

          {/* ANZSCO Code */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Hash className="w-4 h-4 mr-2" />
              ANZSCO Code *
            </label>
            <input
              type="text"
              value={formData.anzscoCcode}
              onChange={(e) => handleInputChange('anzscoCcode', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.anzscoCcode ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., 233211 (Civil Engineer)"
            />
            {errors.anzscoCcode && <p className="mt-1 text-sm text-red-600">{errors.anzscoCcode}</p>}
            <p className="mt-1 text-sm text-gray-500">
              Find your ANZSCO code at{' '}
              <a 
                href="https://www.abs.gov.au/ausstats/abs@.nsf/mf/1220.0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                ABS website
              </a>
            </p>
          </div>

          {/* Do you have Engineering projects */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <FolderOpen className="w-4 h-4 mr-2" />
              Do you have Engineering projects? *
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasProjects"
                  value="yes"
                  checked={formData.hasProjects === 'yes'}
                  onChange={(e) => handleInputChange('hasProjects', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">
                  Yes, I have engineering projects to describe
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasProjects"
                  value="no"
                  checked={formData.hasProjects === 'no'}
                  onChange={(e) => handleInputChange('hasProjects', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">
                  No, I need help generating project ideas
                </span>
              </label>
            </div>
            {errors.hasProjects && <p className="mt-1 text-sm text-red-600">{errors.hasProjects}</p>}
          </div>

          {/* Resume Upload */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Upload className="w-4 h-4 mr-2" />
              Upload your Resume (Optional)
            </label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50' 
                  : errors.resume 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  {formData.resume ? (
                    <div className="text-sm text-green-600">
                      ✓ {formData.resume.name} uploaded
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX up to 10MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            {errors.resume && <p className="mt-1 text-sm text-red-600">{errors.resume}</p>}
          </div>

          {/* LinkedIn Profile */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn Profile Address (Optional)
            </label>
            <input
              type="url"
              value={formData.linkedinProfile}
              onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="https://www.linkedin.com/in/your-profile"
            />
            <p className="mt-1 text-sm text-gray-500">
              This helps us better understand your background for project suggestions
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Continue to Next Step
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}