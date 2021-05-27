import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io',
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const api = `${this.apiUrl}/admin/signin`;
  
      axios.post(api, this.user).then((response) => {
        if(response.data.success) {
          const { token, expired } = response.data;
          // 寫入 cookie token
          // expires 設置有效時間
          document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
          // window.location = './manage.html';
          window.location = 'manage.html';
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
  },
}).mount('#app');
