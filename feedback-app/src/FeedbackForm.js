import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';

const productOptions = ['Shirt', 'Jeans', 'Jacket', 'Shoes'];

const StarRating = ({ label, name, value, onChange }) => (
  <div className="mb-3">
    <label className="form-label d-block">{label}</label>
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        type="button"
        key={star}
        className={`btn btn-sm ${value >= star ? 'btn-warning' : 'btn-outline-secondary'} me-1`}
        onClick={() => onChange(name, star)}
      >
        ★
      </button>
    ))}
  </div>
);

function FeedbackForm() {
  const sigCanvas = useRef();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    productsPurchased: [],
    feedbackText: '',
    ratingQuality: 0,
    ratingStaff: 0,
    ratingOverall: 0,
    signature: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'fullName') {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        setErrors((prev) => ({ ...prev, fullName: 'Only alphabets and spaces allowed' }));
      } else {
        setErrors((prev) => ({ ...prev, fullName: '' }));
      }
    }

    if (name === 'phone') {
      if (!/^[6-9]\d{0,9}$/.test(value)) {
        setErrors((prev) => ({ ...prev, phone: 'Must start with 6-9 and be 10 digits' }));
      } else if (value.length !== 10) {
        setErrors((prev) => ({ ...prev, phone: 'Must be exactly 10 digits' }));
      } else {
        setErrors((prev) => ({ ...prev, phone: '' }));
      }
    }

    if (name === 'email') {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
      } else {
        setErrors((prev) => ({ ...prev, email: '' }));
      }
    }
  };

  const handleProductChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setForm((prev) => ({ ...prev, productsPurchased: selected }));
  };

  const handleRatingChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      fullName: '',
      email: '',
      phone: '',
      productsPurchased: [],
      feedbackText: '',
      ratingQuality: 0,
      ratingStaff: 0,
      ratingOverall: 0,
      signature: ''
    });
    setErrors({});
    setStep(1);
    if (sigCanvas.current) sigCanvas.current.clear();
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!form.fullName.trim() || !/^[A-Za-z\s]+$/.test(form.fullName)) {
        newErrors.fullName = 'Only alphabets and spaces allowed';
      }
      if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone)) {
        newErrors.phone = 'Must start with 6-9 and be 10 digits';
      }
      if (
        !form.email.trim() ||
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)
      ) {
        newErrors.email = 'Invalid email format';
      }
    }

    if (step === 2) {
      if (form.productsPurchased.length === 0) {
        newErrors.productsPurchased = 'Select at least one product';
      }
      if (!form.feedbackText.trim()) {
        newErrors.feedbackText = 'Feedback is required';
      }
    }

    if (step === 3) {
      if (
        form.ratingQuality === 0 ||
        form.ratingStaff === 0 ||
        form.ratingOverall === 0
      ) {
        newErrors.ratings = 'Please provide all ratings';
      }

      if (sigCanvas.current && sigCanvas.current.isEmpty()) {
        newErrors.signature = 'Signature is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateStep()) return; // ⛔ Prevent submission if validation fails

    const signatureData = sigCanvas.current.getCanvas().toDataURL('image/png');
    const dataToSend = { ...form, signature: signatureData };

    axios
      .post('http://localhost:8080/feedback', dataToSend)
      .then(() => {
        alert('Feedback submitted successfully!');
        resetForm();
      })
      .catch((err) => {
        console.error('Submission error:', err);
        alert('Something went wrong. Try again.');
      });
  };

  return (
    <div className="container mt-5">
      <div className="border rounded p-4 shadow-sm bg-light">
        <h2 className="mb-4">Customer Feedback Form Shrinky Shop</h2>
        <form onSubmit={handleSubmit}>
          {/* Step 1 */}
          {step === 1 && (
            <>
              <div className="mb-3">
                <label>Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                  value={form.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label>Phone</label>
                <input
                  name="phone"
                  type="text"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <div className="mb-3">
                <label>Products Purchased</label>
                <select
                  multiple
                  className={`form-control ${errors.productsPurchased ? 'is-invalid' : ''}`}
                  onChange={handleProductChange}
                  value={form.productsPurchased}
                >
                  {productOptions.map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
                {errors.productsPurchased && (
                  <div className="invalid-feedback">{errors.productsPurchased}</div>
                )}
              </div>

              <div className="mb-3">
                <label>Feedback</label>
                <textarea
                  name="feedbackText"
                  className={`form-control ${errors.feedbackText ? 'is-invalid' : ''}`}
                  value={form.feedbackText}
                  onChange={handleChange}
                  rows={4}
                />
                {errors.feedbackText && (
                  <div className="invalid-feedback">{errors.feedbackText}</div>
                )}
              </div>
            </>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <>
              <StarRating
                label="Rate Product Quality"
                name="ratingQuality"
                value={form.ratingQuality}
                onChange={handleRatingChange}
              />
              <StarRating
                label="Rate Staff Friendliness"
                name="ratingStaff"
                value={form.ratingStaff}
                onChange={handleRatingChange}
              />
              <StarRating
                label="Rate Overall Experience"
                name="ratingOverall"
                value={form.ratingOverall}
                onChange={handleRatingChange}
              />
              {errors.ratings && <div className="text-danger mb-2">{errors.ratings}</div>}

              <div className="mb-3">
                <label className="form-label d-block">Signature</label>
                <SignatureCanvas
                  penColor="black"
                  canvasProps={{
                    width: 500,
                    height: 150,
                    className: 'sigCanvas border',
                  }}
                  ref={sigCanvas}
                />
                {errors.signature && <div className="text-danger mt-1">{errors.signature}</div>}
                <div className="mt-2">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm me-2"
                    onClick={() => sigCanvas.current.clear()}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between">
            {step > 1 && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleBack}
              >
                Back
              </button>
            )}

            {step < 3 && (
              <button type="button" className="btn btn-primary ms-auto" onClick={handleNext}>
                Next
              </button>
            )}

            {step === 3 && (
              <button type="submit" className="btn btn-success ms-auto">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
