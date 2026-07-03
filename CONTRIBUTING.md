# Contributing to BuildBot AI

Thank you for your interest in contributing to BuildBot AI! We welcome contributions from everyone. This document provides guidelines and instructions for contributing.

---

## 📋 Code of Conduct

Please read our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing. We are committed to providing a welcoming and inclusive environment for all contributors.

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button on GitHub to create your own copy of the repository.

```bash
git clone https://github.com/YOUR_USERNAME/buildbot-ai.git
cd buildbot-ai
```

### 2. Create a Branch

Create a new branch for your feature or bugfix:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

**Branch Naming Convention:**
- Features: `feature/descriptive-name`
- Bugfixes: `fix/descriptive-name`
- Documentation: `docs/descriptive-name`
- Hotfixes: `hotfix/descriptive-name`

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Environment

Copy `.env.example` to `.env` and update with your local configuration:

```bash
cp .env.example .env
```

### 5. Start Development Server

```bash
npm run dev
```

The application will run on `http://localhost:3000`.

---

## 💻 Development Workflow

### Code Style

We follow the Airbnb JavaScript Style Guide. Make sure your code adheres to these standards:

```bash
# Run linter
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format
```

### Writing Code

1. **Use ES6+ syntax** — Modern JavaScript features are encouraged
2. **Write meaningful variable names** — `userEmail` instead of `ue`
3. **Add comments for complex logic** — Explain the "why", not the "what"
4. **Keep functions small** — Each function should do one thing well
5. **Use async/await** — Prefer over `.then()` chains

### Example:

```javascript
/**
 * Generate construction plan from user input
 * @param {string} description - Project description
 * @param {object} specifications - Project specifications
 * @returns {Promise<object>} Generated plan object
 */
async function generateConstructionPlan(description, specifications) {
  try {
    // Call AI service to generate plan
    const plan = await aiService.generatePlan(description, specifications);
    
    // Validate generated plan
    if (!validatePlan(plan)) {
      throw new Error('Invalid plan generated');
    }
    
    return plan;
  } catch (error) {
    logger.error('Plan generation failed:', error);
    throw error;
  }
}
```

### Testing

Write tests for your changes:

```bash
npm run test
npm run test:watch
```

**Test Structure:**
- Unit tests for utility functions
- Integration tests for API endpoints
- End-to-end tests for critical workflows

### Commit Messages

Use clear, descriptive commit messages:

```
✨ Add voice input feature for construction planning
🐛 Fix database connection timeout issue
📖 Update README with API documentation
♻️ Refactor payment processing module
```

**Prefix Examples:**
- `✨` — New feature
- `🐛` — Bug fix
- `📖` — Documentation
- `♻️` — Refactoring
- `⚡` — Performance improvement
- `🔒` — Security fix
- `🚀` — Release

---

## 🔧 Pull Request Process

### 1. Push to Your Branch

```bash
git push origin feature/your-feature-name
```

### 2. Create a Pull Request

Go to GitHub and click "Compare & Pull Request"

### 3. PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Security fix

## Related Issues
Fixes #123
Related to #456

## Testing
- [ ] Unit tests added
- [ ] Integration tests added
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Linter passes (npm run lint)
- [ ] Tests pass (npm run test)
- [ ] Documentation updated
- [ ] No console errors/warnings
- [ ] Tested in production-like environment

## Screenshots/Demos (if applicable)
[Add screenshots or GIFs here]

## Notes
Any additional notes for reviewers
```

### 4. Review Process

- At least one maintainer must review your PR
- Address feedback and make requested changes
- All tests must pass before merging
- Code review is focused on code quality, not personal criticism

### 5. Merge

Once approved, a maintainer will merge your PR into `main` branch.

---

## 📁 Project Structure

```
buildbot-ai/
├── public/                 # Frontend files
│   ├── index.html
│   ├── app.js
│   └── styles.css
├── src/                    # Backend code
│   ├── server.js
│   ├── config/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── utils/
├── docs/                   # Documentation
├── tests/                  # Test files
├── .env.example            # Environment template
├── package.json
└── README.md
```

---

## 🧪 Testing Guidelines

### Unit Tests

```javascript
describe('generateConstructionPlan', () => {
  it('should generate a valid plan from description', async () => {
    const description = '3-bedroom apartment in Lagos';
    const result = await generateConstructionPlan(description);
    
    expect(result).toBeDefined();
    expect(result.rooms).toBe(3);
    expect(result.location).toBe('Lagos');
  });

  it('should throw error on invalid input', async () => {
    await expect(generateConstructionPlan('')).rejects.toThrow();
  });
});
```

### Coverage

Aim for at least 80% code coverage:

```bash
npm run test -- --coverage
```

---

## 🔍 Code Review Checklist

Before submitting a PR, ensure:

- [ ] Code is clean and readable
- [ ] No console.log() statements left
- [ ] No commented-out code
- [ ] Functions have JSDoc comments
- [ ] Error handling is implemented
- [ ] SQL injection prevention (Mongoose ODM)
- [ ] XSS protection implemented
- [ ] Environment variables used (no hardcoded values)
- [ ] Tests pass locally
- [ ] No security vulnerabilities

---

## 🚨 Reporting Bugs

Found a bug? Please report it by creating a GitHub issue:

**Bug Report Template:**

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [Windows/macOS/Linux]
- Node Version: [v18.x.x]
- Browser: [Chrome/Firefox/Safari]

## Screenshots
[If applicable]

## Additional Context
[Any other relevant information]
```

---

## 💡 Feature Requests

Have a great idea? Open a GitHub issue with your suggestion:

**Feature Request Template:**

```markdown
## Description
Clear description of the feature

## Use Case
Why would this feature be useful?

## Proposed Solution
How could this be implemented?

## Alternatives Considered
Other approaches to solve this

## Additional Context
Any other relevant information
```

---

## 📚 Documentation

Good documentation is crucial! When adding features:

1. Update README.md with new features/usage
2. Add API documentation in docs/API.md
3. Include code comments for complex logic
4. Add JSDoc comments to functions

### Example JSDoc:

```javascript
/**
 * Generate construction plan from AI
 * @param {string} projectType - Type of project (residential, commercial, etc)
 * @param {object} specs - Project specifications
 * @param {number} specs.rooms - Number of rooms
 * @param {number} specs.length - Length in meters
 * @param {string} specs.location - Project location in Nigeria
 * @returns {Promise<object>} Generated plan with specifications
 * @throws {Error} If plan generation fails
 * @example
 * const plan = await generatePlan('residential', {
 *   rooms: 3,
 *   length: 50,
 *   location: 'Lagos'
 * });
 */
async function generateConstructionPlan(projectType, specs) {
  // Implementation
}
```

---

## 🔐 Security

### Reporting Security Issues

**DO NOT** open public issues for security vulnerabilities.

Email security concerns to: **harzco.business@gmail.com**

Include:
- Description of vulnerability
- Steps to reproduce (if applicable)
- Potential impact
- Suggested fix (if any)

### Security Best Practices

- Never commit `.env` files or secrets
- Use environment variables for sensitive data
- Validate all user inputs
- Use parameterized queries (Mongoose)
- Keep dependencies updated: `npm audit`
- Use HTTPS in production
- Implement rate limiting on APIs
- Hash passwords with bcrypt

---

## 📦 Dependency Management

### Adding Dependencies

Before adding a new package:

1. Check if it's necessary
2. Ensure it's actively maintained
3. Check for security vulnerabilities
4. Discuss in an issue if it's significant

```bash
npm install package-name --save
# or for dev dependencies
npm install package-name --save-dev
```

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Run security audit
npm audit
npm audit fix
```

---

## 🎯 Contributing Ideas

Areas where contributions are welcome:

- **Features:** New construction planning features
- **Bug Fixes:** Report and fix issues
- **Documentation:** Improve README, API docs, etc
- **Tests:** Increase test coverage
- **Performance:** Optimize slow operations
- **UI/UX:** Improve user interface
- **Translations:** Add language support
- **Examples:** Add usage examples

---

## 📞 Questions?

- Open a GitHub Discussion
- Email: harzco.business@gmail.com
- Check existing issues/PRs first

---

## 🙏 Thank You

Thank you for contributing to BuildBot AI! Your efforts help make construction planning more accessible and intelligent for everyone in Africa.

**Happy Coding! 🚀**

---

**Last Updated:** June 27, 2026  
**Maintained By:** HARZ Construction Team
