package com.Feedback.StoreCloth.Form.Service.ServiceImpl;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Feedback.StoreCloth.Form.Entiy.Feedback;
import com.Feedback.StoreCloth.Form.Repository.FeedbackRepository;
import com.Feedback.StoreCloth.Form.Service.FeedbackService;

@Service
public class FeedbackServiceImpl implements FeedbackService{
	
	@Autowired
    private FeedbackRepository feedbackRepository;

    @Override
    public Feedback saveFeedback(Feedback feedback) {
    	try {
			feedback.setDateOfPurchase(LocalDate.now());
	        return feedbackRepository.save(feedback);
    	}catch (Exception e) {
            System.err.println("Error saving feedback: " + e.getMessage());
            return null; // Or throw custom exception
        }
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
    	try {
    		return feedbackRepository.findAll();
    	}catch (Exception e) {
            System.err.println("Error retrieving feedback: " + e.getMessage());
            return Collections.emptyList();
        }
       
    }
}
