package com.bookstore.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.demo.dto.ReviewRequest;
import com.bookstore.demo.entity.Book;
import com.bookstore.demo.entity.Review;
import com.bookstore.demo.entity.User;
import com.bookstore.demo.repository.BookRepository;
import com.bookstore.demo.repository.ReviewRepository;
import com.bookstore.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BookRepository bookRepository;
    
    @GetMapping("/book/{bookId}")
    public ResponseEntity<List<Review>> getReviewsByBook(@PathVariable Long bookId) {
        List<Review> reviews = reviewRepository.findByBookId(bookId);
        return ResponseEntity.ok(reviews);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Review>> getReviewsByUser(@PathVariable Long userId) {
        List<Review> reviews = reviewRepository.findByUserId(userId);
        return ResponseEntity.ok(reviews);
    }
    
    @PostMapping
    public ResponseEntity<String> addReview(@RequestBody ReviewRequest request) {
        Optional<User> userOpt = userRepository.findById(request.getUserId());
        Optional<Book> bookOpt = bookRepository.findById(request.getBookId());

        if (userOpt.isEmpty() || bookOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User or book not found");
        }

        User user = userOpt.get();
        Book book = bookOpt.get();

        // Check if user has already reviewed this book
        Optional<Review> existingReview = reviewRepository.findByUserAndBook(user, book);
        if (existingReview.isPresent()) {
            return ResponseEntity.badRequest().body("User has already reviewed this book");
        }

        Review review = new Review(user, book, request.getRating(), request.getComment());
        reviewRepository.save(review);

        return ResponseEntity.ok("Review submitted successfully");
    }
    
    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable Long reviewId,
                                             @RequestBody ReviewRequest request) {
        Optional<Review> reviewOpt = reviewRepository.findById(reviewId);
        
        if (reviewOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Review review = reviewOpt.get();
        
        // Verify the review belongs to the user
        if (!review.getUser().getId().equals(request.getUserId())) {
            return ResponseEntity.status(403).build();
        }
        
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        
        return ResponseEntity.ok(reviewRepository.save(review));
    }
    
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId,
                                           @RequestParam Long userId) {
        Optional<Review> reviewOpt = reviewRepository.findById(reviewId);
        
        if (reviewOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Review review = reviewOpt.get();
        
        // Verify the review belongs to the user
        if (!review.getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).build();
        }
        
        reviewRepository.delete(review);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/book/{bookId}/stats")
    public ResponseEntity<ReviewStats> getReviewStats(@PathVariable Long bookId) {
        Double averageRating = reviewRepository.findAverageRatingByBookId(bookId);
        Long reviewCount = reviewRepository.countReviewsByBookId(bookId);
        
        ReviewStats stats = new ReviewStats(
            averageRating != null ? averageRating : 0.0,
            reviewCount != null ? reviewCount : 0L
        );
        
        return ResponseEntity.ok(stats);
    }
    
    // Inner class for review statistics
    public static class ReviewStats {
        private Double averageRating;
        private Long reviewCount;
        
        public ReviewStats(Double averageRating, Long reviewCount) {
            this.averageRating = averageRating;
            this.reviewCount = reviewCount;
        }
        
        public Double getAverageRating() {
            return averageRating;
        }
        
        public void setAverageRating(Double averageRating) {
            this.averageRating = averageRating;
        }
        
        public Long getReviewCount() {
            return reviewCount;
        }
        
        public void setReviewCount(Long reviewCount) {
            this.reviewCount = reviewCount;
        }
    }
}
