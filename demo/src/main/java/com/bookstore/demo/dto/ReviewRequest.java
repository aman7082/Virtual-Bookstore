package com.bookstore.demo.dto;

public class ReviewRequest {
    
    private Long bookId;
    private Long userId;
    private Integer rating;
    
    private String comment;
    
    // Default constructor
    public ReviewRequest() {}
    
    // Constructor
    public ReviewRequest(Long bookId, Long userId, Integer rating, String comment) {
        this.bookId = bookId;
        this.userId = userId;
        this.rating = rating;
        this.comment = comment;
    }
    
    // Getters and Setters
    public Long getBookId() {
        return bookId;
    }
    
    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public Integer getRating() {
        return rating;
    }
    
    public void setRating(Integer rating) {
        this.rating = rating;
    }
    
    public String getComment() {
        return comment;
    }
    
    public void setComment(String comment) {
        this.comment = comment;
    }
}
