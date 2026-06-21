Feature: Playwright Website
  
  Scenario: Has title
    Given I navigate to the Playwright website
    Then the page title should contain "Playwright"

  Scenario: Get started link
    Given I navigate to the Playwright website
    When I click the "Get started" link
    Then the heading "Installation" should be visible
