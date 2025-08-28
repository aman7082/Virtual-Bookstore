package com.bookstore.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.demo.entity.CartItem;
import com.bookstore.demo.entity.Order;
import com.bookstore.demo.entity.OrderItem;
import com.bookstore.demo.entity.User;
import com.bookstore.demo.repository.CartItemRepository;
import com.bookstore.demo.repository.OrderRepository;
import com.bookstore.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @PostMapping("/{userId}/checkout")
    public ResponseEntity<?> checkout(@PathVariable Long userId, @RequestBody CheckoutRequest request) {
        Optional<User> userOpt = userRepository.findById(userId);
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }
        
        User user = userOpt.get();
        
        // Get cart items
        List<CartItem> cartItems = cartItemRepository.findByUser(user);
        
        if (cartItems.isEmpty()) {
            return ResponseEntity.badRequest().body("Cart is empty");
        }
        
        // Calculate total
        double totalAmount = cartItems.stream()
            .mapToDouble(item -> item.getBook().getPrice() * item.getQuantity())
            .sum();
        
        // Create order
        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(totalAmount);
        order.setStatus(Order.OrderStatus.CONFIRMED);
        order.setShippingAddress(request.getShippingAddress());
        
        Order savedOrder = orderRepository.save(order);
        
        // Create order items from cart items
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setBook(cartItem.getBook());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(cartItem.getBook().getPrice());
            orderItem.setTotalPrice(cartItem.getBook().getPrice() * cartItem.getQuantity());
        }
        
        // Clear cart
        cartItemRepository.deleteAll(cartItems);
        
        // Mock payment response based on payment method
        CheckoutResponse response = new CheckoutResponse();
        response.setStatus("CONFIRMED");

        String paymentMethod = (String) ((java.util.Map<?, ?>) request.getMetadata()).get("paymentMethod");
        if ("upi".equals(paymentMethod)) {
            response.setPaymentProvider("UPI Payment");
            response.setPaymentReference("UPI-" + System.currentTimeMillis());
        } else if ("cod".equals(paymentMethod)) {
            response.setPaymentProvider("Cash on Delivery");
            response.setPaymentReference("COD-" + System.currentTimeMillis());
        } else {
            response.setPaymentProvider("MockPay");
            response.setPaymentReference("MP-" + System.currentTimeMillis());
        }

        response.setOrderId(savedOrder.getId());
        response.setTotalAmount(totalAmount);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<List<Order>> getUserOrders(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        List<Order> orders = orderRepository.findByUser(userOpt.get());
        return ResponseEntity.ok(orders);
    }
    
    // Inner classes for request/response
    public static class CheckoutRequest {
        private String currency;
        private String shippingAddress;
        private Object metadata;
        
        // Getters and setters
        public String getCurrency() { return currency; }
        public void setCurrency(String currency) { this.currency = currency; }
        
        public String getShippingAddress() { return shippingAddress; }
        public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }
        
        public Object getMetadata() { return metadata; }
        public void setMetadata(Object metadata) { this.metadata = metadata; }
    }
    
    public static class CheckoutResponse {
        private String status;
        private String paymentProvider;
        private String paymentReference;
        private Long orderId;
        private Double totalAmount;
        
        // Getters and setters
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        
        public String getPaymentProvider() { return paymentProvider; }
        public void setPaymentProvider(String paymentProvider) { this.paymentProvider = paymentProvider; }
        
        public String getPaymentReference() { return paymentReference; }
        public void setPaymentReference(String paymentReference) { this.paymentReference = paymentReference; }
        
        public Long getOrderId() { return orderId; }
        public void setOrderId(Long orderId) { this.orderId = orderId; }
        
        public Double getTotalAmount() { return totalAmount; }
        public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
    }
}
