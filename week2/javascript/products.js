const app = {
  data: {
    apiUrl: 'https://vue3-course-api.hexschool.io/api',
    apiPath: 'sean666',
    products: [],
  },
  getData() {
    this.isLoad(true);
    const url = `${this.data.apiUrl}/${this.data.apiPath}/admin/products/`;
    axios.get(url).then((response) => {
      if (response.data.success) {
        this.isLoad(false);
        this.data.products = response.data.products;
        this.render();
      } else {
        alert('您尚未登入，請重新登入。');
        window.location = 'index.html';
      }
    })
  },
  deleteData(e) {
    if (window.confirm('你確定要刪除嗎？')) {
      this.isLoad(true);
      const { id } = e.target.dataset;
      const url = `${this.data.apiUrl}/${this.data.apiPath}/admin/product/${id}`;

      axios.delete(url).then((response) => {
        if (response.data.success) {
          this.isLoad(false);
          alert(response.data.message)
          this.getData();
        }
      });
    }
  },
  render() {
    const el = document.querySelector('#productList');
    const productCount = document.querySelector('#productCount');

    let str = '';
    this.data.products.forEach((item) => {
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
            <span class="${item.is_enabled ? 'text-success' : 'text-secondary'}">${item.is_enabled ? '啟用' : '未啟用'}</span>
          </td>
          <td width="120">
            <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
          </td>
        </tr>`;
    });
    el.innerHTML = str;
    productCount.textContent = this.data.products.length;

    const deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach((item) => {
      item.addEventListener('click', this.deleteData.bind(this));
    })
  },
  isLoad(boolean){
    const loadEl = document.querySelector('.load');
    boolean ? loadEl.classList.add('loading') : loadEl.classList.remove('loading');
  },
  created() {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.getData();
  }
}

app.created();