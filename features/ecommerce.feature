Feature: Ecommerce Validations

    @Regression
    Scenario: Placing order

        Given I am login to ecommerce application with username "namankalola@gmail.com" and password "Welcome@123"
        When I add "IPHONE 13 PRO" to cart by clicking on Add To Cart button
        Then I navigated to cart page and verify "IPHONE 13 PRO" is added to cart
        And I validated the total price and proceed to checkout by clicking on Checkout Button
        When I filled all details in checkout page and click on Place Order button
        Then I should see the order confirmation message
        And I captured the order ID for future reference
        When I navigate to order history page and verify the order ID is present in order history
        Then I clicked on View Order Details link
        And I should see the order details in Order Details page
        And I logout from the application

    @Validation
    Scenario Outline: 1Enter wrong username and validate error message

        Given I am login to ecommerce2 application with username "<username>" and password "<password>"
        Then I should see the error message "Incorrect username/password."

        Examples:
            | username            | password      |
            | wronguser@gmail.com | wrongpassword |
            | wronguser@gmail.com | wrongpassword |

    @Validation
    Scenario Outline: 2Enter wrong username and validate error message

        Given I am login to ecommerce2 application with username "<username>" and password "<password>"
        Then I should see the error message "Incorrect username/password."

        Examples:
            | username            | password      |
            | wronguser@gmail.com | wrongpassword |
            | wronguser@gmail.com | wrongpassword |
    @Validation
    Scenario Outline: 3Enter wrong username and validate error message

        Given I am login to ecommerce2 application with username "<username>" and password "<password>"
        Then I should see the error message "Incorrect username/password."

        Examples:
            | username            | password      |
            | 1wronguser@gmail.com | wrongpassword |
            | 2wronguser@gmail.com | wrongpassword |