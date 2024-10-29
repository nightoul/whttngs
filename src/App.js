import React from 'react';

function App() {
  const API_BASE_URL = 'https://api.whitetongueshangout.me/visits';
  let visitId = null; // Variable to store the visit ID
  let visitStarted = false; // Flag to track if visit has started

  // Function to start tracking the visit
  function startVisit() {
    if (!visitStarted) {
      fetch(`${API_BASE_URL}/trackVisitStart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        visitId = data.id; // Store the visit ID
        visitStarted = true; // Set the flag to true
        console.log('Visit started with ID:', visitId);
      })
      .catch(error => {
        console.error('Error starting visit:', error);
      });
    }
  }

  // Function to end tracking the visit
  function endVisit() {
    if (visitId) {
      fetch(`${API_BASE_URL}/trackVisitEnd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: visitId }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Visit ended:', data);
      })
      .catch(error => {
        console.error('Error ending visit:', error);
      });
    }
  }

  // Start tracking the visit when the page loads
  window.onload = startVisit;

  // End tracking the visit when the window is unloaded
  window.onbeforeunload = endVisit;

  return (
    <div>
      <h1>Welcome to Whttngs</h1>
    </div>
  );
}

export default App;
