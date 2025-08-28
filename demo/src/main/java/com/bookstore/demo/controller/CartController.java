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
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.demo.dto.CartItemRequest;
import com.bookstore.demo.entity.Book;
import com.bookstore.demo.entity.CartItem;
import com.bookstore.demo.entity.User;
import com.bookstore.demo.repository.BookRepository;
import com.bookstore.demo.repository.CartItemRepository;
import com.bookstore.demo.repository.UserRepository;



@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BookRepository bookRepository;
    
    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItem>> getCartItems(@PathVariable Long userId) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        return ResponseEntity.ok(cartItems);
    }
    
    @PostMapping("/{userId}")
    public ResponseEntity<CartItem> addToCart(@PathVariable Long userId,
                                            @RequestBody CartItemRequest request) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Book> bookOpt = bookRepository.findById(request.getBookId());
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        if (bookOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        User user = userOpt.get();
        Book book = bookOpt.get();
        
        // Check if item already exists in cart
        Optional<CartItem> existingItem = cartItemRepository.findByUserAndBook(user, book);
        
        if (existingItem.isPresent()) {
            // Update quantity
            CartItem cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
            return ResponseEntity.ok(cartItemRepository.save(cartItem));
        } else {
            // Create new cart item
            CartItem cartItem = new CartItem(user, book, request.getQuantity());
            return ResponseEntity.ok(cartItemRepository.save(cartItem));
        }
    }
    
    @PutMapping("/{userId}/{itemId}")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Long userId,
                                                 @PathVariable Long itemId,
                                                 @RequestBody CartItemRequest request) {
        Optional<CartItem> cartItemOpt = cartItemRepository.findById(itemId);
        
        if (cartItemOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        CartItem cartItem = cartItemOpt.get();
        
        // Verify the cart item belongs to the user
        if (!cartItem.getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).build();
        }
        
        cartItem.setQuantity(request.getQuantity());
        return ResponseEntity.ok(cartItemRepository.save(cartItem));
    }
    
    @DeleteMapping("/{userId}/{itemId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long userId, @PathVariable Long itemId) {
        Optional<CartItem> cartItemOpt = cartItemRepository.findById(itemId);
        
        if (cartItemOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        CartItem cartItem = cartItemOpt.get();
        
        // Verify the cart item belongs to the user
        if (!cartItem.getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).build();
        }
        
        cartItemRepository.delete(cartItem);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartItemRepository.deleteByUserId(userId);
        return ResponseEntity.ok().build();
    }
}
