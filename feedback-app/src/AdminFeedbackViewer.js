import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminFeedbackViewer() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/feedback/all')
      .then((res) => {
        setFeedbacks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching feedback:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5">Loading feedbacks...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Feedback Viewer</h2>
      {feedbacks.length === 0 ? (
        <div className="alert alert-info">No feedback submitted yet.</div>
      ) : (
        feedbacks.map((fb, index) => (
          <div key={index} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title"><strong>Name:</strong>{fb.fullName}</h5>
              <p className="card-text">
                <strong>Email:</strong> {fb.email}<br />
                <strong>Phone:</strong> {fb.phone}<br />
                <strong>Date:</strong> {fb.dateOfPurchase}<br />

                <strong>Products Purchased:</strong> {fb.productsPurchased.join(', ')}<br />
                <strong>Feedback:</strong> {fb.feedbackText}<br />
                <strong>Ratings:</strong><br />
                ➤ Quality: {fb.ratingQuality} ★<br />
                ➤ Staff: {fb.ratingStaff} ★<br />
                ➤ Overall: {fb.ratingOverall} ★
              </p>
              <div>
                <strong>Signature:</strong><br />
                {fb.signature ? (
                  <img
                    src={fb.signature}
                    alt="Signature"
                    style={{ width: '300px', height: '100px', border: '1px solid #ccc' }}
                  />
                ) : (
                  <span className="text-muted">No signature</span>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminFeedbackViewer;
