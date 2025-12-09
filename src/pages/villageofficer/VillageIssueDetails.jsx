import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VillageIssueDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { issue } = location.state || {};

  const [isResolving, setIsResolving] = useState(false);
  const [resolutionData, setResolutionData] = useState({
    resolutionDescription: '',
    actionTaken: '',
    resourcesUsed: '',
    proofType: 'photo',
    proofFile: null,
    additionalNotes: ''
  });
  const [proofPreview, setProofPreview] = useState(null);

  if (!issue) {
    return (
      <div className="min-h-screen bg-gray-200 p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-responsive-2xl font-bold text-gray-800 mb-4">Issue Not Found</h2>
          <button
            onClick={() => navigate('/Village-issue')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Issues List
          </button>
        </div>
      </div>
    );
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResolutionData({ ...resolutionData, proofFile: file });
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setProofPreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setProofPreview(null);
      }
    }
  };

  const handleSubmitResolution = (e) => {
    e.preventDefault();
    
    // Here you would typically send the resolution data to your backend
    console.log('Resolution submitted:', {
      issueId: issue.id,
      ...resolutionData
    });
    
    alert('Issue resolution submitted successfully!');
    navigate('/Village-issue');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDurationText = (duration) => {
    if (duration === 1) return '1 day ago';
    return `${duration} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/Village-issue')}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-responsive-sm mb-4"
          >
            ← Back to Issues List
          </button>
          <h1 className="text-responsive-4xl font-bold text-gray-800 mb-2">Issue Details</h1>
          <p className="text-responsive-lg text-gray-600">Review and resolve village issue</p>
        </div>

        {/* Issue Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-300">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h2 className="text-responsive-2xl font-bold text-gray-800 mb-4">{issue.title}</h2>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className={`px-4 py-2 rounded-full text-responsive-sm font-medium ${getStatusColor(issue.status)}`}>
                  {issue.status}
                </span>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-responsive-sm font-medium">
                  {issue.category}
                </span>
                <span className={`px-4 py-2 rounded-full text-responsive-sm font-medium ${getPriorityColor(issue.priority)}`}>
                  {issue.priority} Priority
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-responsive-sm text-gray-600 mb-1 font-semibold">Reported:</p>
              <p className="text-responsive-base font-medium text-gray-800">{getDurationText(issue.duration)}</p>
            </div>
          </div>

          {/* Issue Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-responsive-base font-semibold text-gray-800 mb-2">Description</h4>
                <p className="text-responsive-base text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-300">{issue.description}</p>
              </div>
              <div>
                <h4 className="text-responsive-base font-semibold text-gray-800 mb-2">Reported By</h4>
                <p className="text-responsive-base text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-300">{issue.reportedBy}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-responsive-base font-semibold text-gray-800 mb-2">Location</h4>
                <p className="text-responsive-base text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-300">{issue.location}</p>
              </div>
              <div>
                <h4 className="text-responsive-base font-semibold text-gray-800 mb-2">Date Reported</h4>
                <p className="text-responsive-base text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-300">{new Date(issue.reportedDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resolution Section */}
        {issue.status !== 'Resolved' && (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-responsive-2xl font-bold text-gray-800">Resolve Issue</h3>
              {!isResolving && (
                <button
                  onClick={() => setIsResolving(true)}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-responsive-base"
                >
                  Start Resolution
                </button>
              )}
            </div>

            {isResolving && (
              <form onSubmit={handleSubmitResolution} className="space-y-6">
                {/* Resolution Description */}
                <div>
                  <label className="block text-responsive-sm font-semibold text-gray-800 mb-2">
                    Resolution Description *
                  </label>
                  <textarea
                    value={resolutionData.resolutionDescription}
                    onChange={(e) => setResolutionData({ ...resolutionData, resolutionDescription: e.target.value })}
                    placeholder="Describe how you resolved this issue..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-responsive-base text-gray-800 bg-gray-50"
                    rows="4"
                    required
                  />
                </div>

                {/* Action Taken */}
                <div>
                  <label className="block text-responsive-sm font-semibold text-gray-800 mb-2">
                    Action Taken *
                  </label>
                  <textarea
                    value={resolutionData.actionTaken}
                    onChange={(e) => setResolutionData({ ...resolutionData, actionTaken: e.target.value })}
                    placeholder="Detail the specific actions you took..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-responsive-base text-gray-800 bg-gray-50"
                    rows="3"
                    required
                  />
                </div>

                {/* Resources Used */}
                <div>
                  <label className="block text-responsive-sm font-semibold text-gray-800 mb-2">
                    Resources Used
                  </label>
                  <input
                    type="text"
                    value={resolutionData.resourcesUsed}
                    onChange={(e) => setResolutionData({ ...resolutionData, resourcesUsed: e.target.value })}
                    placeholder="Materials, equipment, personnel used..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-responsive-base text-gray-800 bg-gray-50"
                  />
                </div>

                {/* Proof Section */}
                <div>
                  <label className="block text-responsive-sm font-semibold text-gray-800 mb-2">
                    Proof of Resolution *
                  </label>
                  
                  {/* Proof Type Selection */}
                  <div className="mb-4">
                    <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Proof Type:</label>
                    <select
                      value={resolutionData.proofType}
                      onChange={(e) => setResolutionData({ ...resolutionData, proofType: e.target.value })}
                      className="w-full md:w-auto p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-responsive-base text-gray-800 bg-gray-50"
                    >
                      <option value="photo">Photo Evidence</option>
                      <option value="video">Video Evidence</option>
                      <option value="document">Document</option>
                      <option value="report">Report</option>
                    </select>
                  </div>

                  {/* File Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept={
                        resolutionData.proofType === 'photo' ? 'image/*' :
                        resolutionData.proofType === 'video' ? 'video/*' :
                        '.pdf,.doc,.docx'
                      }
                      className="hidden"
                      id="proof-upload"
                      required
                    />
                    <label
                      htmlFor="proof-upload"
                      className="cursor-pointer inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <span>📁</span>
                      Choose {resolutionData.proofType === 'photo' ? 'Image' : 
                              resolutionData.proofType === 'video' ? 'Video' : 'Document'}
                    </label>
                    {resolutionData.proofFile && (
                      <p className="mt-2 text-responsive-sm text-gray-600">
                        Selected: {resolutionData.proofFile.name}
                      </p>
                    )}
                  </div>

                  {/* Image Preview */}
                  {proofPreview && (
                    <div className="mt-4">
                      <img
                        src={proofPreview}
                        alt="Proof preview"
                        className="max-w-full h-48 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-responsive-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={resolutionData.additionalNotes}
                    onChange={(e) => setResolutionData({ ...resolutionData, additionalNotes: e.target.value })}
                    placeholder="Any additional information or follow-up required..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-responsive-base"
                    rows="3"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-responsive-base"
                  >
                    Submit Resolution
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsResolving(false)}
                    className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium text-responsive-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Resolved Issue Display */}
        {issue.status === 'Resolved' && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-green-600 text-responsive-2xl">✅</span>
              <h3 className="text-responsive-2xl font-bold text-green-800">Issue Resolved</h3>
            </div>
            <p className="text-responsive-base text-green-700">
              This issue has been successfully resolved. All documentation and proof have been submitted.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VillageIssueDetails;
