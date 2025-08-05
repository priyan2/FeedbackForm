package com.Feedback.StoreCloth.Form.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Feedback.StoreCloth.Form.Entiy.Feedback;

import com.Feedback.StoreCloth.Form.Service.FeedbackService;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Adjust for your frontend port
public class FeedbackController {
	
	@Autowired
    private FeedbackService feedbackService;

    @PostMapping("/feedback")
    public ResponseEntity<String> submitFeedback(@RequestBody Feedback feedback) {
    	try {
    		feedbackService.saveFeedback(feedback);
            return ResponseEntity.ok("Feedback submitted successfully.");
    	}catch (Exception e) {
            System.err.println("Error while submitting feedback: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Something went wrong. Could not submit feedback.");
        }
    }

    @GetMapping("feedback/all")
    public List<Feedback> getAllFeedbacks() {
    	try {
    		return feedbackService.getAllFeedbacks();
    	}catch (Exception e) {
            System.err.println("Error while fetching feedbacks: " + e.getMessage());
            return new ArrayList<>();
    	}
        
    }
       	
}
