package com.bookstore.demo.repository;

import com.bookstore.demo.entity.Review;
import com.bookstore.demo.entity.Book;
import com.bookstore.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    List<Review> findByBook(Book book);
    
    List<Review> findByBookId(Long bookId);
    
    List<Review> findByUser(User user);
    
    List<Review> findByUserId(Long userId);
    
    Optional<Review> findByUserAndBook(User user, Book book);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.book.id = :bookId")
    Double findAverageRatingByBookId(@Param("bookId") Long bookId);
    
    @Query("SELECT COUNT(r) FROM Review r WHERE r.book.id = :bookId")
    Long countReviewsByBookId(@Param("bookId") Long bookId);
}
