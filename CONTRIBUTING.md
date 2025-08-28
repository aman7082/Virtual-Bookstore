# Contributing to Virtual Bookstore

Thank you for your interest in contributing to the Virtual Bookstore project! We welcome contributions from the community and are pleased to have you join us.

## 🤝 How to Contribute

### 1. Fork the Repository
- Click the "Fork" button at the top right of the repository page
- Clone your forked repository to your local machine:
```bash
git clone https://github.com/yourusername/virtual-bookstore.git
cd virtual-bookstore
```

### 2. Set Up Development Environment
- Follow the setup instructions in the [README.md](README.md)
- Ensure both backend and frontend are running properly
- Run tests to make sure everything works

### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes
- Write clean, well-documented code
- Follow the existing code style and conventions
- Add tests for new functionality
- Update documentation as needed

### 5. Test Your Changes
```bash
# Backend tests
cd demo
./mvnw test

# Frontend tests (if available)
cd frontend/my-react-app
npm test
```

### 6. Commit Your Changes
```bash
git add .
git commit -m "Add: Brief description of your changes"
```

### 7. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```
- Go to GitHub and create a Pull Request
- Provide a clear description of your changes
- Reference any related issues

## 📋 Contribution Guidelines

### Code Style
- **Java**: Follow standard Java conventions and Spring Boot best practices
- **JavaScript/React**: Use modern ES6+ syntax and React hooks
- **Comments**: Write clear, concise comments for complex logic
- **Naming**: Use descriptive variable and function names

### Commit Messages
Use clear and descriptive commit messages:
- `Add: New feature or functionality`
- `Fix: Bug fixes`
- `Update: Changes to existing features`
- `Docs: Documentation updates`
- `Style: Code formatting changes`
- `Refactor: Code restructuring without functionality changes`

### Pull Request Guidelines
- **Title**: Clear and descriptive title
- **Description**: Explain what changes you made and why
- **Testing**: Describe how you tested your changes
- **Screenshots**: Include screenshots for UI changes
- **Breaking Changes**: Clearly mark any breaking changes

## 🐛 Reporting Issues

### Bug Reports
When reporting bugs, please include:
- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to reproduce the bug
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: OS, Java version, Node.js version, browser
- **Screenshots**: If applicable

### Feature Requests
When requesting features, please include:
- **Description**: Clear description of the feature
- **Use Case**: Why this feature would be useful
- **Implementation Ideas**: Any ideas on how it could be implemented
- **Examples**: Examples from other applications if applicable

## 🔧 Development Setup

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.6+
- Git

### Backend Development
```bash
cd demo
./mvnw spring-boot:run
```

### Frontend Development
```bash
cd frontend/my-react-app
npm install
npm run dev
```

### Database Access
- H2 Console: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: `password`

## 🧪 Testing

### Backend Testing
```bash
cd demo
./mvnw test
```

### Frontend Testing
```bash
cd frontend/my-react-app
npm test
```

## 📚 Areas for Contribution

### High Priority
- **Authentication System**: JWT-based user authentication
- **Admin Dashboard**: Book inventory management
- **Payment Gateway**: Additional payment methods
- **Testing**: Unit and integration tests
- **Documentation**: API documentation improvements

### Medium Priority
- **Search Enhancement**: Advanced search filters
- **Recommendation Engine**: Improved book recommendations
- **Performance**: Frontend and backend optimizations
- **Mobile App**: React Native mobile application
- **Internationalization**: Multi-language support

### Low Priority
- **UI/UX Improvements**: Design enhancements
- **Analytics**: User behavior tracking
- **Social Features**: User profiles and social sharing
- **Notifications**: Real-time notifications
- **Accessibility**: WCAG compliance improvements

## 📖 Resources

### Documentation
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://reactjs.org/docs)
- [Maven Documentation](https://maven.apache.org/guides/)
- [Vite Documentation](https://vitejs.dev/guide/)

### Code Style Guides
- [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [React Best Practices](https://reactjs.org/docs/thinking-in-react.html)

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special thanks in documentation

## 📞 Getting Help

If you need help or have questions:
- **Issues**: Create a GitHub issue with the "question" label
- **Discussions**: Use GitHub Discussions for general questions
- **Email**: Contact the maintainer directly

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Virtual Bookstore! 🚀📚
