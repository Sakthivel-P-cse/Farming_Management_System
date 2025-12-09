import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const DistrictIssueDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const issue = location.state?.issue;

  if (!issue) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-200">
        <div className="border-l-4 border-red-600 rounded-xl p-8 shadow-lg bg-white max-w-md w-full">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-responsive-2xl font-bold text-red-700">No Issue Data</h2>
          </div>
          <p className="text-gray-700 mb-6 text-responsive-lg">No issue details found. Please go back and select an issue.</p>
          <button
            className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center"
            onClick={() => navigate(-1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
        <div className="w-full bg-gray-200 rounded-xl shadow-md p-8">
          <h1 className="text-responsive-4xl font-bold text-green-700 mb-4">{issue.title}</h1>
          <p className="text-gray-800 text-responsive-2xl mb-8 leading-relaxed">{issue.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-8">
            <div className="flex items-center">
              <span className="font-semibold text-responsive-xl text-gray-600 min-w-24">Status:</span>
              <span className={
                'ml-2 px-3 py-1 rounded-full ' + 
                (issue.status === "Resolved" 
                  ? "bg-green-100 text-green-600 text-responsive-lg font-bold" 
                  : issue.status === "Pending" 
                    ? "bg-red-100 text-red-600 font-bold" 
                    : "bg-yellow-100 text-yellow-600 font-bold")
              }>{issue.status}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-xl text-gray-600 min-w-24">Category:</span>
              <span className="ml-2 text-responsive-lg text-gray-700">{issue.category}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-xl text-gray-600 min-w-24">Village:</span>
              <span className="ml-2 text-lg text-gray-700">{issue.village}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-xl text-gray-600 min-w-24">Reported By:</span>
              <span className="ml-2 text-lg text-gray-700">{issue.reportedBy}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-xl text-gray-600 min-w-24">Date:</span>
              <span className="ml-2 text-lg text-gray-700">{issue.date}</span>
            </div>
          </div>
          
          {/* Photo/Video Proof Section */}
          <div className="mt-8 mb-8">
            <h3 className="text-responsive-2xl font-bold text-green-700 mb-6 border-b pb-2">Evidence</h3>
            
            {/* Media Proof Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* If issue has media, display it; otherwise show placeholders */}
              {issue.media ? (
                // If media exists, map through and display them
                Array.isArray(issue.media) ? 
                  issue.media.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow">
                      {item.type === 'image' ? (
                        <img 
                          src={item.url} 
                          alt={`Evidence ${index + 1}`} 
                          className="w-full h-64 object-cover"
                          loading="lazy"
                        />
                      ) : item.type === 'video' ? (
                        <video 
                          controls 
                          className="w-full h-64 object-cover bg-black"
                        >
                          <source src={item.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : null}
                      <div className="p-4">
                        <p className="text-responsive-lg font-medium text-gray-700">{item.caption || `Evidence ${index + 1}`}</p>
                        <p className="text-responsive-sm text-gray-500 mt-1">{item.timestamp || 'No timestamp available'}</p>
                      </div>
                    </div>
                  ))
                : (
                  // Single media item
                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow">
                    {issue.media.type === 'image' ? (
                      <img 
                        src={issue.media.url} 
                        alt="Evidence" 
                        className="w-full h-64 object-cover"
                        loading="lazy"
                      />
                    ) : issue.media.type === 'video' ? (
                      <video 
                        controls 
                        className="w-full h-64 object-cover bg-black"
                      >
                        <source src={issue.media.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : null}
                    <div className="p-4">
                      <p className="text-lg font-medium text-gray-700">{issue.media.caption || 'Evidence'}</p>
                      <p className="text-sm text-gray-500 mt-1">{issue.media.timestamp || 'No timestamp available'}</p>
                    </div>
                  </div>
                )
              ) : (
                // No media available, show placeholder
                <div className="col-span-full flex flex-col items-center justify-center p-10 border border-gray-200 border-dashed rounded-xl bg-gray-50">
                  <div className="w-24 h-24 mb-4 flex items-center justify-center rounded-full bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-responsive-xl font-medium text-gray-500">No evidence provided</p>
                  <p className="text-responsive-sm text-gray-400 mt-2">Photos or videos for this issue will appear here</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Bottom back button for better UX when scrolled down */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-200 font-semibold text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Issues List
            </button>
          </div>
        </div>
  );
}

export default DistrictIssueDetail
