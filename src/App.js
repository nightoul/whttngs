import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  const API_BASE_URL = 'https://api.whitetongueshangout.me/visits';
  let visitId = null; // Track visit ID
  let visitStarted = false; // Flag to track if visit has started

  useEffect(() => {
    // Track Visit Start
    const startVisit = async () => {
      if (!visitStarted) {
        try {
          const response = await axios.post(`${API_BASE_URL}/trackVisitStart`);
          visitId = response.data.id;  // Store visit ID for tracking the end
          visitStarted = true; // Set flag to true after starting the visit
          console.log('Visit started with ID:', visitId);
        } catch (error) {
          console.error('Error starting visit:', error);
        }
      }
    };

    // End Visit when the user is leaving the page
    const endVisit = async () => {
      if (visitId) {
        try {
          const response = await axios.post(`${API_BASE_URL}/trackVisitEnd`, { id: visitId });
          console.log('Visit ended:', response.data);
        } catch (error) {
          console.error('Error tracking visit end:', error);
        }
      }
    };

    // Start visit when component mounts
    startVisit();

    // Add beforeunload event listener for leaving the page
    window.addEventListener('beforeunload', endVisit);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('beforeunload', endVisit);
    };
  }, []);

  return (
    <div>
      <h1>Welcome to Whttngs</h1>
    </div>
  );
}

export default App;
