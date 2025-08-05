import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeedbackForm from './FeedbackForm';
import AdminFeedbackViewer from './AdminFeedbackViewer'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/admin" element={<AdminFeedbackViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
