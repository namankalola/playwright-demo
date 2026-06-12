const { test, expect } = require('@playwright/test');

const url = 'https://eventhub.rahulshettyacademy.com/';
const email = 'namankalola@zohomail.in';
const password = 'Welcome@123';

async function loginToEventHub(page, email, password) {
    const emailInput = page.getByPlaceholder('you@email.com');
    const passwordInput = page.getByLabel('Password');
    const signInButton = page.getByRole('button', { name: 'Sign In' });

    await emailInput.fill(email);
    await passwordInput.fill(password);
    await signInButton.click();
}

async function createNewEvent(page, eventName, eventDescription, eventDate, eventHrs, eventMinutes, timeAMPM, category, city, venue, price, totalSeats, imageUrl) {
    const eventNameInput = page.getByPlaceholder('Event title');
    const eventDescriptionInput = page.getByPlaceholder('Describe the event…');
    const eventCategorySelect = page.locator('#category');
    const eventCity = page.locator('input[id="city"]');
    const eventVenue = page.getByLabel('Venue');
    const eventPrice = page.getByLabel('Price ($)');
    const totalSeat = page.locator('#total-seats');
    const imgUrl = page.locator('[id="image-url-(optional)"]');
    const addEventBtn = page.getByTestId('add-event-btn');
    const eventDateInput = page.getByLabel('Event Date & Time*');

    await eventNameInput.fill(eventName);
    await eventDescriptionInput.fill(eventDescription);
    await eventCategorySelect.selectOption(category);
    console.log(await eventDateInput.waitFor());
    await eventDateInput.fill(eventDate);
    await eventCity.fill(city);
    await eventVenue.fill(venue);
    await eventPrice.fill(price);
    await totalSeat.fill(totalSeats);
    await imgUrl.fill(imageUrl);


    await addEventBtn.click();


}

function getFutureDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

async function fillBookingForm(page, txtFullName, txtEmail, phone) {
    const fullName = page.getByLabel('Full Name');
    const email = page.getByLabel('Email');
    const phoneNumber = page.getByLabel('Phone Number');
    const confirmBooking = page.locator('button[id="confirm-booking"]');

    await fullName.fill(txtFullName);
    await email.fill(txtEmail);
    await phoneNumber.fill(phone);
    await confirmBooking.click();
}


test(('Create a brand new event from the admin panel, then complete a booking for that event, and finally verify the seat count drops by exactly 1'), async ({ page }) => {
    await page.goto(url);
    const browseEvent = page.locator('a span:has-text("Browse Events")');

    await loginToEventHub(page, email, password);

    // Home page displayed after login
    await expect(browseEvent).toBeVisible();

    // Click on Admin -> Manage Events

    const adminLink = page.getByRole('button', { name: 'Admin' });
    const manageEventsLink = page.locator('button+div a[href="/admin/events"]');

    await adminLink.click();
    await manageEventsLink.waitFor();
    await manageEventsLink.click();

    // New Event page is displayed
    const newEventLabel = page.locator('section h2:has-text("New Event")');
    await newEventLabel.waitFor();

    const eventName = 'Event - ' + new Date().getTime();
    const eventDescription = 'This is a description for ' + eventName;
    const eventDate = getFutureDate(3);
    const eventHrs = '10';
    const eventMinutes = '25';
    const timeAMPM = 'PM';
    const category = 'Sports';
    const city = 'Mumbai';
    const venue = 'Wankhede Stadium';
    const price = '500';
    const totalSeats = '100';
    const imageUrl = "";
    await createNewEvent(page, eventName, eventDescription, eventDate, eventHrs, eventMinutes, timeAMPM, category, city, venue, price, totalSeats, imageUrl);

    const eventCreated = page.getByText("Event created!");
    await eventCreated.waitFor();
    expect(await eventCreated.isVisible(), "Event is created! : " + eventName).toBeTruthy();


    // Step 3 — Find the event card and capture seats

    const eventLink = page.getByTestId('nav-events');
    await eventLink.click();

    const eventCards = page.getByTestId('event-card');
    await eventCards.first().waitFor();

    const seats = await eventCards.filter({ hasText: eventName }).getByText('seats available').textContent();

    const seatsBeforeBooking = parseInt(seats.match(/\d+/)[0]);

    console.log('seatsBeforeBooking : ' + seatsBeforeBooking)

    // Step 4 — Start booking

    await eventCards.filter({ hasText: eventName }).locator('a#book-now-btn').click();

    await page.locator('h1').filter({ hasText: eventName }).waitFor();

    //Step 5 — Fill booking form

    const seatToBook = '1';
    await expect(page.locator('#ticket-count').textContent()).toEqual(seatToBook);

    const txtFullName = "Namankumar Kalola";
    const txtEmail = "testing@mailinator.com";
    const phone = "+919090909090";
    await fillBookingForm(page, txtFullName, txtEmail, phone);

    await page.locator('h3').filter({ hasText: 'Booking Confirmed!' }).waitFor();
    await expect(page.locator('h3').filter({ hasText: 'Booking Confirmed!' })).toBeVisible();

    const bookingReference = await page.locator('.booking-ref').textContent();

    //Step 7 — Verify in My Bookings
    await page.locator('a button:has-text("View My Bookings")').click();
    await expect(page).toHaveURL(url + 'bookings');

    await page.locator('#booking-card span.booking-ref').first().waitFor();

    await expect(page.locator('#booking-card span.booking-ref').filter({ hasText: bookingReference })).toBeVisible();

    await expect(page.locator("#booking-card h3:has-text('" + eventName + "')")).toBeVisible();

    //Step 8 — Verify seat reduction
    await eventLink.click();
    await eventCards.first().waitFor();

    const seatLeft = await eventCards.filter({ hasText: eventName }).getByText('seats available').innerText();

    const seatsAfterBooking = parseInt(seatLeft.match(/\d+/)[0]);

    expect(Number(seatsAfterBooking)).toBe(Number(seatsBeforeBooking) - Number(seatToBook));

    // console.log('seatsAfterBooking : ' + seatsAfterBooking)

});



