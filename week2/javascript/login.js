const username = document.querySelector('#username');
const password = document.querySelector('#password');
const form = document.querySelector('#form');
const url = 'https://vue3-course-api.hexschool.io/';

function login(event) {
  event.preventDefault();
  isLoad(true);
  const user = {
    username: username.value,
    password: password.value,
  }
  axios.post(`${url}admin/signin`, user).then((res) => {
    if(res.data.success){
      isLoad(false);
      const token = res.data.token;
      const expired = new Date(res.data.expired);
      document.cookie = `hexToken=${token}; expires=${expired}`;
      // console.log(res.data);
      // console.log(token);
      // console.log(expired);
      window.location = './products.html';
    } else {
      isLoad(false);
      alert(res.data.message);
    }
  }).catch((error) => {
    console.log(error);
  });
}

function isLoad(boolean) {
  const loadEl = document.querySelector('.load');
  boolean ? loadEl.classList.add('loading') : loadEl.classList.remove('loading');
}

form.addEventListener('submit', login)
