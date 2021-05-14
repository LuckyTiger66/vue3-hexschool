// 關注點分離: 資料、方法、渲染
// 選擇 DOM ，方便後續操作
const productTitle = document.getElementById('title');
const productOriginPrice = document.getElementById('originPrice');
const productPrice = document.getElementById('price');
const addBtn = document.getElementById('addProduct');
const clearAllBtn = document.getElementById('clearAll');
const productList = document.getElementById('productList');

// 監聽綁定表單跟按鈕
addBtn.addEventListener('click', validateSubmit);
clearAllBtn.addEventListener('click', deleteAllProduct);
productList.addEventListener('click', checkAction);

// init 初始化
let productData = [];
renderPage(productData);

// 通過驗證後才新增表單
// 沒通過驗證清空資料，方便使用者再次輸入
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
// 新增商品，用時間戳產生不同ID
function addProduct() {
  productData.push({
    id: Math.floor(Date.now()),
    title: productTitle.value.trim(),
    originPrice: Number(productOriginPrice.value),
    price: Number(productPrice.value),
    isEnabled: false,
  });
  renderPage(productData);
}
// 刪除單個商品
// 利用 id 找出要刪除的商品在陣列的位置，用 splice 刪除單一商品
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
// 狀態:是否啟用切換
function changeStatus(id) {
  productData.forEach((item) => {
    if (id == item.id) {
      item.isEnabled = !item.isEnabled;
    }
  })
  renderPage(productData);
}
// 刪除全部商品，清空 productData 後重新渲染畫面
function deleteAllProduct() {
  productData = [];
  renderPage(productData);
}
//  搭配產品列表的監聽事件，來判別使用者是切換啟用還是刪除
function checkAction(e) {
  if (e.target.dataset.action === 'remove') {
    removeProduct(e.target.dataset.id)
  } else if (e.target.dataset.action === 'status') {
    changeStatus(e.target.dataset.id)
  }
}
//  畫面渲染
// 產品清單跟目前有幾項產品 
function renderPage(data) {
  const countProduct = document.getElementById('productCount');
  let str = '';
  data.forEach((item) => {
    str += `
    <tr>
      <td>${item.title}</td>
      <td width="120">
        ${item.originPrice}
      </td>
      <td width="120">
        ${item.price}
      </td>
      <td width="100">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="${item.id}" ${item.isEnabled? 'checked': ''} data-action="status" data-id="${item.id}">
          <label class="form-check-label" for="${item.id}">${item.isEnabled? '啟用' : '未啟用'}</label>
        </div>
      </td>
      <td width="120">
        <button type="button" class="btn btn-sm btn-outline-danger move" data-action="remove" data-id="${item.id}"> 刪除 </button>
      </td>
    </tr>`;
  })
  // 清單需用 HTML 標籤， 所以用 innerHTML
  productList.innerHTML = str;
  // 目前有幾項產品唯一數字， 所以用textContent
  countProduct.textContent = data.length;
}
//  清空使用者輸入
function resetInput() {
  title.value = '';
  price.value = '';
  originPrice.value = '';
}
