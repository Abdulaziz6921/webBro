let container = document.querySelector(".featured_products"),
  items = document.querySelector(".items"),
  Parent = document.querySelector(".products"),
  Total = document.querySelector("#total"),
  count = document.querySelector("#count"),
  filter = document.querySelector(".filter"),
  prevBtn = document.querySelector("#prevBtn"),
  nextBtn = document.querySelector("#nextBtn");

let products = [];
(emptyBox = []), (itemsPerPage = 20), (currentPage = 1);

// Fetching Data
const fetchData = async () => {
  const req = await fetch("https://dummyjson.com/products");
  const data = await req.json();
  products = data.products;
};
fetchData();

// Showing products
const dataShowing = async () => {
  await fetchData();

  // pagination
  let pages = [];
  for (let i = 0; i < Math.ceil(products.length / itemsPerPage); i++) {
    pages.push(i);
  }

  let indexOfLastPage = currentPage * itemsPerPage,
    indexOfFirstPage = indexOfLastPage - itemsPerPage,
    currentItems = products.slice(indexOfFirstPage, indexOfLastPage);

  currentItems.map((product) => {
    let box = document.createElement("div");
    container.appendChild(box);
    box.className = "featured_product";

    box.innerHTML = `
   <img src="${product.images[0]}" alt="" />

   <div class="rate_and_price">
     <div class="rate">
     <p>Rating: ${product.rating}</p>
     <p>Category: ${product.category}</p>
     </div>

     <div>
       <p class="price_of__featured_product">${product.price} $</p>
       <p class="discount">${product.discountPercentage}% off</p>
     </div>
   </div>

   <div class="description_of_featured_product">
     <p class="name">${product.title}</p>
     <p>An apple mobile which is nothing like apple</p>
   </div>`;

    let addToCart = document.createElement("button");
    box.appendChild(addToCart);
    addToCart.className = "btn2";
    addToCart.innerHTML = "Add to Cart";

    addToCart.addEventListener("click", () => {
      let check = false;
      emptyBox.filter((item) =>
        item.id === product.id ? (check = true) : check
      );

      if (check === true) {
        alert("This product has already been added");
      } else {
        emptyBox.push(product);
      }

      emptyBox.map((item) => {
        if (items.innerHTML.includes(item.title)) {
          ("");
        } else {
          let innerBox = document.createElement("div");
          items.appendChild(innerBox);
          innerBox.className = "in_box";
          innerBox.innerHTML += `<h4>${item.title}</h4>`;

          let Img = document.createElement("img");
          innerBox.appendChild(Img);
          Img.src = item.images[0];

          let price_adding = document.createElement("div");
          innerBox.appendChild(price_adding);
          price_adding.className = "price_adding";
          price_adding.innerHTML += `<h4>${"$ " + item.price}</h4>`;

          // Delete Button _______________________
          let deleteBtn = document.createElement("button");
          price_adding.appendChild(deleteBtn);
          deleteBtn.innerHTML = "Delete";

          deleteBtn.addEventListener("click", (e) => {
            console.log(e);
            let filtered = emptyBox.filter((ar) => ar.id !== item.id);
            emptyBox = [];
            filtered.map((filteredItem) => emptyBox.push(filteredItem));
            e.target.parentNode.parentNode.remove();
            count(filtered);
          });
        }
      });

      function count() {
        let count = document.querySelector("#count");
        count.innerHTML = emptyBox.length;

        let totalPrice = [];

        emptyBox.map((ar) => {
          totalPrice.push(Number(ar.price));
        });
        let totalSum = totalPrice.reduce((a, b) => a + b, 0);
        totalSum = totalSum.toFixed(2);
        Total.innerHTML = "Total: " + "$ " + totalSum;
      }
      count();
    });
  });
};
dataShowing();

// Pagination buttons
prevBtn.addEventListener("click", () => {
  if ((currentPage - 1) * itemsPerPage) {
    currentPage--;
    dataShowing();
  }
});

nextBtn.addEventListener("click", () => {
  if ((currentPage * itemsPerPage) / products.length) {
    currentPage++;
    dataShowing();
  }
});

// Filter
let filterShow = () => {
  filter.classList.toggle("showFilter");
};
filter.addEventListener("change", (e) => {
  let products = document.querySelectorAll(".featured_product");
  products.forEach((product) => {
    if (!product.innerHTML.includes(e.target.value)) {
      product.style = "display:none";
      console.log(e.target.value);
    } else {
      product.style = "display:block";
    }
  });
});

// Opening and Closing Slider Functions____________
let opens = false;
const Open = () => {
  if (opens === false) {
    const cart = document.querySelector(".cart");
    cart.style.transform = "translateY(0)";
    opens = true;
  } else {
    const cart = document.querySelector(".cart");
    cart.style.transform = "translateY(-1000px)";
    opens = false;
  }
};

const Close = () => {
  const cart = document.querySelector(".cart");
  cart.style.transform = "translateY(-1000px)";
  opens = false;
};
