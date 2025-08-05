package com.Feedback.StoreCloth.Form.Entiy;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Feedback {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // Customer Info
    private String fullName;
    private String email;
    private String phone;

    // Purchase Details
    private LocalDate dateOfPurchase;
    private List<String> productsPurchased;
    private String feedbackText;

    // Ratings
    private int ratingQuality;
    private int ratingStaff;
    private int ratingOverall;

    // Signature (as base64 string)
    @Lob
    private String signature;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public LocalDate getDateOfPurchase() {
		return dateOfPurchase;
	}

	public void setDateOfPurchase(LocalDate dateOfPurchase) {
		this.dateOfPurchase = dateOfPurchase;
	}

	public List<String> getProductsPurchased() {
		return productsPurchased;
	}

	public void setProductsPurchased(List<String> productsPurchased) {
		this.productsPurchased = productsPurchased;
	}

	public String getFeedbackText() {
		return feedbackText;
	}

	public void setFeedbackText(String feedbackText) {
		this.feedbackText = feedbackText;
	}

	public int getRatingQuality() {
		return ratingQuality;
	}

	public void setRatingQuality(int ratingQuality) {
		this.ratingQuality = ratingQuality;
	}

	public int getRatingStaff() {
		return ratingStaff;
	}

	public void setRatingStaff(int ratingStaff) {
		this.ratingStaff = ratingStaff;
	}

	public int getRatingOverall() {
		return ratingOverall;
	}

	public void setRatingOverall(int ratingOverall) {
		this.ratingOverall = ratingOverall;
	}

	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}
    
}

