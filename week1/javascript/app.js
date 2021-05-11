const productTitle = document.getElementById('title');
const productOriginPrice = document.getElementById('origin_price');
const productPrice = document.getElementById('price');
const addBtn = document.getElementById('addProduct');
const clearAllBtn = document.getElementById('clearAll');
const productList = document.getElementById('productList');

addBtn.addEventListener('click', validateSubmit);
clearAllBtn.addEventListener('click', deleteAllProduct);
productList.addEventListener('click', checkAction);

// init
let productData = [];
renderPage(productData);

// 通過驗證後才新增列表
function validateSubmit() {
  if ((productTitle.value).trim() == '') {
    resetInput();
    alert('表單填寫有誤！欄位不能留空');
  } else if (productOriginPrice.value <= 0 || productPrice.value <= 0) {
    resetInput();
    alert('表單填寫有誤！數值需要大於零');
  } else {
    addProduct();
    resetInput();
  }
}

function addProduct() {
  productData.push({
    id: Math.floor(Date.now()),
    title: productTitle.value.trim(),
    origin_price: Number(productOriginPrice.value),
    price: Number(productPrice.value),
    is_enabled: false,
  });
  renderPage(productData);
}

function removeProduct(id) {
  let newIndex = 0;
  productData.forEach((item, key) => {
    if (id == item.id) {
      newIndex = key;
    }
  })
  productData.splice(newIndex, 1);
  renderPage(productData);
}

function changeStatus(id) {
  productData.forEach((item) => {
    if (id == item.id) {
      item.is_enabled = !item.is_enabled;
    }
  })
  renderPage(productData);
}

function deleteAllProduct() {
  productData = [];
  renderPage(productData);
}

function checkAction(e) {
  if (e.target.dataset.action === 'remove') {
    removeProduct(e.target.dataset.id)
  } else if (e.target.dataset.action === 'status') {
    changeStatus(e.target.dataset.id)
  }
}

function renderPage(data) {
  const countProduct = document.getElementById('productCount');
  let str = '';
  data.forEach((item) => {
    str += `
    <tr>
      <td>${item.title}</td>
      <td width="120">
        ${item.origin_price}
      </td>
      <td width="120">
        ${item.price}
      </td>
      <td width="100">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="${item.id}" ${item.is_enabled? 'checked': ''} data-action="status" data-id="${item.id}">
          <label class="form-check-label" for="${item.id}">${item.is_enabled? '啟用' : '未啟用'}</label>
        </div>
      </td>
      <td width="120">
        <button type="button" class="btn btn-sm btn-outline-danger move" data-action="remove" data-id="${item.id}"> 刪除 </button>
      </td>
    </tr>`;
  })
  productList.innerHTML = str;
  countProduct.textContent = data.length;
}

function resetInput() {
  title.value = '';
  price.value = '';
  origin_price.value = '';
}
