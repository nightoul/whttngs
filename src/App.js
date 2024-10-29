import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  const API_BASE_URL = 'https://api.whitetongueshangout.me';

  useEffect(() => {
    let visitId = null;

    // Track Visit Start
    async function startVisit() {
      try {
        // No need to send IP or location, backend will handle it
        const response = await axios.post(`${API_BASE_URL}/trackVisitStart`);
        visitId = response.data.id;  // Store visit ID for tracking the end
      } catch (error) {
        console.error('Error starting visit:', error);
      }
    }

    startVisit();

    // Track Visit End when the component unmounts
    return () => {
      if (visitId) {
        axios.post(`${API_BASE_URL}/trackVisitEnd`, { id: visitId })
          .then(response => console.log('Visit end tracked:', response.data))
          .catch(error => console.error('Error tracking visit end:', error));
      }
    };
  }, []);

  return (
    <div>
      <h1>Welcome to Whttngs</h1>
    </div>
  );
}

export default App;
