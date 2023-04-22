document.getElementById('payBtn').addEventListener('click', async function submitPayment() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const street = document.getElementById("street").value;
  const city = document.getElementById("city").value;
  const region = document.getElementById("region").value;
  const postalCode = document.getElementById("postalCode").value;
  const country = document.getElementById("country").value;
  const cardNum = document.getElementById("cardNum").value;
  const expiryMonth = document.getElementById("expiryMonth").value;
  const expiryYear = document.getElementById("expiryYear").value;
  const cvv = document.getElementById("cvv").value;
  // grabs total price from storage
  const price = localStorage.getItem("totalPrice");

  const paymentData = {
      gateway: "test_gateway",
      card: {
        number: 4242424242424242,
        expiry_month: expiryMonth,
        expiry_year: expiryYear,
        cvc: cvv,
        postal_zip_code: postalCode,
      },
  };
const customerData = {
    firstname: firstName,
    lastname: lastName,
    email: email,
}
  const shippingData = {
    name: firstName + " " + lastName,
    street: street,
    town_city: city,
    county_state: region,
    postal_zip_code: postalCode,
    country: "US",
  };
  const orderData = {
    customer: customerData,
      shipping: shippingData,
      payment: paymentData,
  };
  console.log(orderData)
  fetch("/processpayment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderData }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
