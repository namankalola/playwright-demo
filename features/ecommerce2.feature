Feature: Ecommerce Negative Validations

    @Validation
    Scenario Outline: Enter wrong username and validate error message

        Given I am login to ecommerce2 application with username "<username>" and password "<password>"
        Then I should see the error message "Incorrect username/password."

        Examples:
            | username            | password      |
            | wronguser@gmail.com | wrongpassword |
            | wronguser@gmail.com | wrongpassword |