package com.Feedback.StoreCloth.Form.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Feedback.StoreCloth.Form.Entiy.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

}

