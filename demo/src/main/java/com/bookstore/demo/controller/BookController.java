package com.bookstore.demo.controller;

import com.bookstore.demo.entity.Book;
import com.bookstore.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class BookController {
    
    @Autowired
    private BookRepository bookRepository;
    
    @GetMapping("/books")
    public List<Book> searchBooks(@RequestParam(value = "q", defaultValue = "") String query) {
        if (query.isEmpty()) {
            return bookRepository.findAll();
        } else {
            return bookRepository.searchBooks(query);
        }
    }
    
    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        Optional<Book> book = bookRepository.findById(id);
        if (book.isPresent()) {
            return ResponseEntity.ok(book.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/recommendations/{userId}")
    public List<Book> getRecommendations(@PathVariable Long userId, 
                                       @RequestParam(value = "limit", defaultValue = "8") int limit) {
        // For demo purposes, just return the first few books as recommendations
        List<Book> allBooks = bookRepository.findAll();
        return allBooks.stream().limit(limit).toList();
    }
}
