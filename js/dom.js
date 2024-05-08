document.addEventListener("DOMContentLoaded", function () {
  let cartPage = null;
  let cartCount = 0; // Variable to keep track of the number of items in the cart

  const updateCartCount = () => {
    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.innerText = cartCount;
  };

  const updateCartCountFromStorage = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartCount = cartItems.length;
    updateCartCount();
  };

  const addToCart = (product) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert("Product added to cart!");

    updateCartCountFromStorage();
  };

  const clearTable = (table) => {
    table.innerHTML = "";
  };

  const createTableRow = (table, val) => {
    const createTr = document.createElement("tr");

    const createTdId = document.createElement("td");
    createTdId.innerText = val.id;

    const createTdTitle = document.createElement("td");
    createTdTitle.innerText = val.title;

    const createTdPrice = document.createElement("td");
    createTdPrice.innerText = `$${val.price}`;

    const createTdDescription = document.createElement("td");
    createTdDescription.innerText = val.description;

    const createTdImage = document.createElement("td");
    const productImage = document.createElement("img");
    productImage.src = val.image;
    productImage.style.width = "200px";
    productImage.style.height = "200px";
    createTdImage.appendChild(productImage);

    const createTdButton = document.createElement("td");
    const addToCartButton = document.createElement("button");
    addToCartButton.innerText = "Add To Cart";
    addToCartButton.addEventListener("click", () => {
      addToCart(val);
    });

    const cartSymbol = document.createElement("span");
    cartSymbol.innerHTML = `<i class="fas fa-shopping-cart"></i>`;

    addToCartButton.appendChild(cartSymbol);
    createTdButton.appendChild(addToCartButton);

    createTr.appendChild(createTdId);
    createTr.appendChild(createTdTitle);
    createTr.appendChild(createTdPrice);
    createTr.appendChild(createTdDescription);
    createTr.appendChild(createTdImage);
    createTr.appendChild(createTdButton);

    table.appendChild(createTr);
  };

  const showProducts = (data) => {
    const tablee = document.getElementById("tablee");
    clearTable(tablee);
    data.forEach((val) => {
      createTableRow(tablee, val);
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching data:", error);
      return [];
    }
  };

  const showAll = async () => {
    const data = await fetchData();
    showProducts(data);
  };

  const filterProductsByCategory = async (category) => {
    const data = await fetchData();
    const filteredProducts = data.filter(
      (val) => val.category.toLowerCase() === category.toLowerCase()
    );
    showProducts(filteredProducts);
  };

  window.showall = showAll;
  window.showmen = () => filterProductsByCategory("men's clothing");
  window.showwomen = () => filterProductsByCategory("women's clothing");
  window.showjewellery = () => filterProductsByCategory("jewelery");
  window.showelectronics = () => filterProductsByCategory("electronics");

  const cartIcon = document.createElement("div");
  cartIcon.id = "cart-icon";
  cartIcon.innerHTML = `<i class="fas fa-shopping-cart"></i><span id="cart-count">${cartCount}</span>`;
  document.body.appendChild(cartIcon);

  // Logout functionality
  window.logout = () => {
    localStorage.removeItem("userLoggedIn");
    window.location.href = "signin.html"; // Redirect to signin page after logout
  };

  const updateCartIconCount = () => {
    updateCartCountFromStorage();
    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.innerText = cartCount;
  };

  window.clearCart = () => {
    localStorage.removeItem("cartItems");
    updateCartIconCount();
  };

  cartIcon.addEventListener("click", () => {
    if (!cartPage || cartPage.closed) {
      cartPage = window.open("cart.html", "_blank");
    } else {
      cartPage.location.href = "cart.html";
      cartPage.focus();
    }
  });

  setInterval(updateCartIconCount, 1000); // Periodically updates cart count
});
