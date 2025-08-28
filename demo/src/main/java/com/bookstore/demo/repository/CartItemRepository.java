package com.bookstore.demo.repository;

import com.bookstore.demo.entity.CartItem;
import com.bookstore.demo.entity.User;
import com.bookstore.demo.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    
    List<CartItem> findByUser(User user);
    
    List<CartItem> findByUserId(Long userId);
    
    Optional<CartItem> findByUserAndBook(User user, Book book);
    
    Optional<CartItem> findByUserIdAndBookId(Long userId, Long bookId);
    
    void deleteByUser(User user);
    
    void deleteByUserId(Long userId);
}
