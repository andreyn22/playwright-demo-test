## Resources

- https://playwright.dev/
- https://playwright.dev/docs/intro
- https://playwright.dev/docs/trace-viewer-intro
- https://docs.google.com/document/d/e/2PACX-1vQWL3T7iUD8DeMPM4OV2x6ZaW8aQgYw2Z7gIQTVmNYa-QhFeo5rT29BTJ5427-QqoBHKokVtLUbU1oy/pub

## Udemy

- Playwright: Web Automation Testing From Zero to Hero  
  https://www.udemy.com/course/playwright-from-zero-to-hero/

- Playwright Automation with TypeScript — Aliaksandr Khvastovich  
  https://www.udemy.com/course/playwright-automation-with-typescript/

- Learn Playwright with TypeScript (Web & API Testing) — Pavan Kumar  
  https://www.udemy.com/course/learn-playwright-web-api-testing-with-typescript/

## Videos

- https://www.youtube.com/watch?v=NATg-5C-U7k
- https://www.youtube.com/watch?v=6eAZYkuFJTI
- https://www.youtube.com/watch?v=wCUJtfHh67E
- https://www.youtube.com/watch?v=788GvvcfwTY
- https://www.youtube.com/watch?v=qnSpYiKCK4Q

## Repositories

- Playwright Examples (by Microsoft)  
  https://github.com/microsoft/playwright-examples

- Playwright Test Generator Tool  
  https://github.com/mxschmitt/playwright-test-generator

- Awesome Playwright  
  https://github.com/mxschmitt/awesome-playwright

## QA Test Sites

- https://demoqa.com/text-box
- https://the-internet.herokuapp.com/
- http://uitestingplayground.com/ajax

## Commands

```bash
npx playwright test                               # Run all E2E tests
npx playwright test file.spec.ts                  # Run specific test file
npx playwright test -g "test name"                # Run tests matching name
npx playwright test --project=chromium            # Run tests in specific browser
npx playwright test --workers=1                   # Run tests sequentially
npx playwright test --retries=2                   # Retry failed tests
npx playwright test --last-failed                 # Re-run failed tests only
npx playwright test --max-failures=1              # Stop after first failure
npx playwright test --headed                      # Run with visible browser
npx playwright test --debug                       # Run in debug mode
npx playwright test --ui                          # Open Playwright UI mode
npx playwright test --trace on                    # Enable tracing
npx playwright show-trace trace.zip               # Open trace file
npx playwright show-report                        # Open HTML report
npx playwright codegen <url>                      # Launch code generator
npx playwright install                            # Install browsers
npx playwright install chromium                   # Install Chromium only
npm init playwright@latest                        # Create new Playwright project
npm update @playwright/test                       # Update Playwright
npx playwright test --grep @tag                   # Run tests by tag
npx playwright test --grep-invert @skip           # Run tests excluding a tag
npx playwright test --reporter=line               # Use line reporter
npx playwright test --reporter=html               # Generate HTML report
npx playwright test --timeout=60000               # Set test timeout (ms)
npx playwright test --repeat-each=5               # Repeat each test multiple times
npx playwright test --shard=1/3                   # Run tests in parallel shards (CI)
npx playwright test --config=playwright.config.ts # Use specific config file
npx playwright test --headed --slow-mo=500        # Run tests in headed mode with slow motion (500ms delay between actions)
npx prettier --write "**/*.spec.ts"               # Format all .spec.ts files
