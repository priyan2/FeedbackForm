package com.Feedback.StoreCloth.Form.Service;
import java.util.List;

import com.Feedback.StoreCloth.Form.Entiy.Feedback;


public interface FeedbackService {
	 Feedback saveFeedback(Feedback feedback);
	 List<Feedback> getAllFeedbacks();
}
