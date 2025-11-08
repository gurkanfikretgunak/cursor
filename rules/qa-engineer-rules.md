# Cursor Rules for QA Engineer

## General Principles

- Quality is everyone's responsibility
- Test early and test often
- Shift testing left in the development lifecycle
- Automate repetitive tests
- Think like a user
- Document test cases clearly
- Report bugs objectively
- Collaborate with development team

## Test Planning

### Test Strategy
- Define test strategy for each release
- Identify test scope and coverage goals
- Plan for different test levels (unit, integration, system, acceptance)
- Consider risk-based testing
- Allocate resources appropriately
- Document test approach

### Test Planning Documents
- Test plan with scope and objectives
- Test cases with clear steps and expected results
- Test data requirements
- Test environment setup
- Risk assessment
- Entry and exit criteria

### Test Coverage
- Aim for high code coverage (>80% for critical paths)
- Cover happy paths and edge cases
- Test error scenarios
- Test integration points
- Consider non-functional testing (performance, security, usability)
- Use coverage tools to identify gaps

## Test Case Design

### Writing Test Cases
- Write clear, concise test cases
- Include preconditions and test data
- Define expected results clearly
- Make test cases independent and repeatable
- Use test case templates for consistency
- Review test cases with team

### Test Design Techniques
- Equivalence partitioning
- Boundary value analysis
- Decision table testing
- State transition testing
- Use case testing
- Exploratory testing

### Test Case Organization
- Organize by feature or module
- Use test case management tools
- Tag test cases appropriately
- Maintain test case traceability
- Update test cases when requirements change
- Remove obsolete test cases

## Manual Testing

### Exploratory Testing
- Explore the application without scripts
- Document findings as you test
- Use heuristics and checklists
- Test different user personas
- Try unexpected inputs and workflows
- Report bugs immediately

### Regression Testing
- Maintain regression test suite
- Prioritize regression tests
- Execute regression tests before releases
- Automate high-value regression tests
- Keep regression suite updated
- Balance coverage with execution time

### User Acceptance Testing (UAT)
- Collaborate with product and users
- Prepare UAT test scenarios
- Facilitate UAT sessions
- Document UAT results
- Track UAT issues
- Sign off on UAT completion

## Test Automation

### Automation Strategy
- Automate repetitive tests
- Automate high-value tests
- Start with stable features
- Maintain automation code quality
- Review and update automation regularly
- Balance automation with manual testing

### Test Automation Frameworks
- Choose appropriate framework (Selenium, Cypress, Playwright, Appium)
- Use Page Object Model pattern
- Keep tests independent
- Implement proper test data management
- Use configuration files
- Follow coding best practices

### API Testing
- Test API endpoints thoroughly
- Validate request/response schemas
- Test error handling
- Test authentication and authorization
- Test rate limiting
- Use tools like Postman, REST Assured, Karate

### Performance Testing
- Identify performance test scenarios
- Use appropriate tools (JMeter, Gatling, k6)
- Test under realistic conditions
- Monitor system resources during tests
- Analyze performance bottlenecks
- Report performance issues

## Bug Reporting

### Bug Report Quality
- Write clear, concise bug reports
- Include steps to reproduce
- Provide expected vs. actual results
- Include screenshots or videos
- Specify environment and version
- Assign appropriate severity and priority

### Bug Severity Levels
- **Critical**: System crash, data loss, security breach
- **High**: Major functionality broken, workaround exists
- **Medium**: Minor functionality issue, easy workaround
- **Low**: Cosmetic issue, minor inconvenience

### Bug Lifecycle
- Report bugs promptly
- Verify bug fixes
- Retest after fixes
- Close bugs after verification
- Track bug metrics
- Analyze bug trends

## Test Execution

### Test Execution Process
- Execute tests systematically
- Document test results
- Report issues immediately
- Track test progress
- Update test status regularly
- Communicate blockers

### Test Environment Management
- Maintain test environments
- Document environment setup
- Keep environments updated
- Isolate test data
- Reset environments when needed
- Coordinate environment access

### Test Data Management
- Create realistic test data
- Use data generation tools
- Mask sensitive data
- Maintain test data sets
- Reset test data when needed
- Document test data requirements

## Quality Metrics

### Key Metrics
- Test coverage percentage
- Defect density
- Defect leakage (bugs found in production)
- Test execution rate
- Automation coverage
- Bug find rate

### Reporting
- Create test summary reports
- Track metrics over time
- Identify trends and patterns
- Report to stakeholders regularly
- Use metrics to improve process
- Visualize metrics with dashboards

## Collaboration

### Working with Developers
- Participate in requirements review
- Provide early feedback
- Clarify requirements and acceptance criteria
- Collaborate on test scenarios
- Participate in code reviews
- Share testing insights

### Working with Product Managers
- Understand product vision
- Clarify requirements
- Provide quality perspective
- Report user experience issues
- Participate in release planning
- Validate user stories

### Cross-Functional Collaboration
- Attend daily standups
- Participate in sprint planning
- Join retrospectives
- Share knowledge with team
- Help improve development process
- Build quality culture

## Continuous Improvement

### Process Improvement
- Identify testing bottlenecks
- Suggest process improvements
- Implement best practices
- Learn from bugs in production
- Stay updated with testing trends
- Share learnings with team

### Skill Development
- Learn new testing tools
- Improve automation skills
- Understand development process
- Learn about system architecture
- Improve domain knowledge
- Attend testing conferences and meetups

## Test Types

### Functional Testing
- Unit testing (collaborate with developers)
- Integration testing
- System testing
- Acceptance testing
- Smoke testing
- Sanity testing

### Non-Functional Testing
- Performance testing
- Load testing
- Stress testing
- Security testing
- Usability testing
- Accessibility testing
- Compatibility testing

### Specialized Testing
- Mobile app testing
- API testing
- Database testing
- Cross-browser testing
- Localization testing
- Accessibility testing

## Tools and Technologies

### Test Management Tools
- Jira, TestRail, Zephyr
- qTest, TestLink
- Use tools that integrate with development workflow
- Maintain test cases in tool
- Generate reports from tools

### Automation Tools
- Selenium for web automation
- Appium for mobile automation
- Cypress, Playwright for modern web apps
- REST Assured, Karate for API testing
- JMeter, Gatling for performance testing
- Choose tools that fit team needs

### Bug Tracking
- Jira, Bugzilla, GitHub Issues
- Integrate with development workflow
- Use consistent bug fields
- Track bug metrics
- Generate bug reports

## Best Practices

### Daily Practices
- Execute test cases
- Report bugs promptly
- Update test status
- Communicate with team
- Review test results
- Plan next day's testing

### Weekly Practices
- Review test coverage
- Analyze bug trends
- Update test cases
- Review automation results
- Participate in team meetings
- Plan test activities

### Monthly Practices
- Review test metrics
- Analyze quality trends
- Update test strategy
- Improve test processes
- Share knowledge
- Plan skill development

## Common Pitfalls to Avoid

- Testing only happy paths
- Not automating repetitive tests
- Poor bug reports
- Not collaborating with team
- Ignoring non-functional testing
- Not updating test cases
- Testing in isolation
- Not learning new tools
- Ignoring test metrics
- Not thinking like a user

## When Testing Software

1. **Think like a user**: Test from user perspective
2. **Test early**: Find bugs as early as possible
3. **Automate wisely**: Automate high-value, repetitive tests
4. **Document clearly**: Write clear test cases and bug reports
5. **Collaborate**: Work with development team
6. **Cover comprehensively**: Test happy paths, edge cases, and errors
7. **Report objectively**: Focus on facts, not blame
8. **Learn continuously**: Stay updated with testing trends
9. **Measure**: Use metrics to improve
10. **Advocate for quality**: Make quality everyone's responsibility

---

**Remember**: Quality is not just finding bugs, it's preventing them. Work with the team to build quality in from the start.

