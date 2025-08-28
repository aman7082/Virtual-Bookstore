package com.bookstore.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.bookstore.demo.entity.Book;
import com.bookstore.demo.entity.User;
import com.bookstore.demo.repository.BookRepository;
import com.bookstore.demo.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Add sample users if the database is empty
        if (userRepository.count() == 0) {
            userRepository.save(new User("John Doe", "john.doe@example.com", "+1-555-0123", "123 Main St, Anytown, USA"));
            userRepository.save(new User("Jane Smith", "jane.smith@example.com", "+1-555-0456", "456 Oak Ave, Somewhere, USA"));
            userRepository.save(new User("Bob Johnson", "bob.johnson@example.com", "+1-555-0789", "789 Pine Rd, Elsewhere, USA"));
        }

        // Add sample books if the database is empty
        if (bookRepository.count() == 0) {
            bookRepository.save(new Book("The Great Gatsby", "F. Scott Fitzgerald", "Fiction", 12.99, "A classic American novel", "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop"));
            bookRepository.save(new Book("To Kill a Mockingbird", "Harper Lee", "Fiction", 14.99, "A gripping tale of racial injustice", "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop"));
            bookRepository.save(new Book("1984", "George Orwell", "Dystopian", 13.99, "A dystopian social science fiction novel", "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop"));
            bookRepository.save(new Book("Pride and Prejudice", "Jane Austen", "Romance", 11.99, "A romantic novel of manners", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"));
            bookRepository.save(new Book("The Catcher in the Rye", "J.D. Salinger", "Fiction", 12.49, "A controversial coming-of-age story", "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop"));
            bookRepository.save(new Book("Lord of the Flies", "William Golding", "Fiction", 10.99, "A novel about the dark side of human nature", "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=400&fit=crop"));
            bookRepository.save(new Book("The Hobbit", "J.R.R. Tolkien", "Fantasy", 15.99, "A fantasy adventure novel", "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop"));
            bookRepository.save(new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", "Fantasy", 16.99, "The first book in the Harry Potter series", "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=400&fit=crop"));
            bookRepository.save(new Book("The Da Vinci Code", "Dan Brown", "Thriller", 14.49, "A mystery thriller novel", "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop"));
            bookRepository.save(new Book("The Alchemist", "Paulo Coelho", "Philosophy", 13.49, "A philosophical novel about following your dreams", "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop"));
        }
    }
}
