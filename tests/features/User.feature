Feature: User Resource

  Scenario: Create a new user
    Given A Fresh App
    When I setup a JSON API Request
    And "POST" to "/api"
    And have type "users"
    And have faker attribute "email" from "internet.email"
    And have faker attribute "password" from "internet.password"
    And have faker attribute "password_confirmation" from "internet.password"
    And send request
    Then I get JSON API Result
    And with attribute "email" matching request attribute "email"


  Scenario Outline: Error creating user with duplicate email
    Given A Fresh App
    And Seed Users with data
    When I setup a JSON API Request
    And "POST" to "/api"
    And have type "users"
    And have attribute "email" with value "example@example.com"
    And have faker attribute "password" from "internet.password"
    And have faker attribute "password_confirmation" from "internet.password"
    And send request
    Then I get JSON API Error
    And with error title "Invalid Attribute"
    And with error detail "That email has already been used for an account"

    Examples:
      | email                  | password |
      | example@example.com    | 123456   |