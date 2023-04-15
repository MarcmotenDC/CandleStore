function submitPayment() {
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
    const line_items = localStorage.getItem("cartItems")
  const paymentData = {
    amount: price,
    payment: {
      gateway: "test_gateway",
      card: {
        number: cardNum,
        expiry_month: expiryMonth,
        expiry_year: expiryYear,
        cvc: cvv,
        postal_code: postalCode,
      },
    },
  };

  const shippingData = {
    name: firstName + " " + lastName,
    street: street,
    town_city: city,
    county_state: region,
    postal_zip_code: postalCode,
    country: country,
    email: email,
  };

  const orderData = {
    line_items: line_items,
    shipping: shippingData,
  };

  fetch("/processpayment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentData, orderData }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(orderData);
    })
    .catch((err) => {
      console.error(err);
    });
}
