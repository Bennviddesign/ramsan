<!--
/**
 * @created 2025
 * @author Bennviddesign (https://bennviddesign.com)
 * @license MIT
 * @website https://ramsan.se
 * @github-repo https://github.com/Bennviddesign/ramsan
 * @github-profile https://github.com/Bennviddesign
 */
-->

<template>
  <div class="container">
    <div class="form">
      <form action="/send-email.php" method="POST" enctype="multipart/form-data" @submit="handleSubmit">
        <div>
          <h2>Tipsa gärna oss!</h2>
        </div>
        <div>
          <label for="name">Namn:</label>
          <input v-model="form.name" name="name" type="text" placeholder="Ditt namn.." required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="form.email" name="email" type="email" placeholder="Din email.." required />
        </div>
        <div>
          <label for="amne">Ämne:</label>
          <input v-model="form.amne" name="amne" type="text" placeholder="Ämne" required />
        </div>
        <div>
          <label for="file">Fil:</label>
          <input type="file" name="file" accept="audio/mpeg" @change="handleFileUpload" />
        </div>
        <div>
          <label for="message">Meddelande:</label>
          <textarea v-model="form.message" name="message" placeholder="Ditt meddelande.." required></textarea>
        </div>
        <div style="align-content: end;">
          <div>
            <button type="submit" id="submit">Skicka</button>
            <p v-if="successMessage">{{ successMessage }}</p>
            <p v-if="errorMessage">{{ errorMessage }}</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const form = ref({
  name: '',
  email: '',
  message: '',
  amne: '',
});
const selectedFile = ref(null);
const successMessage = ref('');
const errorMessage = ref('');

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
  console.log('File selected:', selectedFile.value ? selectedFile.value.name : 'No file');
};

const handleSubmit = () => {
  successMessage.value = 'Skickar...';
  errorMessage.value = '';
};

onMounted(() => {
  if (route.query.success) {
    successMessage.value = 'Meddelande skickat!';
    errorMessage.value = '';
  } else if (route.query.error) {
    successMessage.value = '';
    errorMessage.value = 'Misslyckades att skicka meddelande. Försök igen.';
  }
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

form {
  gap: 20px;
  height: auto;
  background-color: rgba(255, 255, 255, 0.13);
  margin: auto;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 20px 20px;

  h2 {
    text-align: center;
  }
}

form div:first-child {
  grid-column: 1 / -1;

}

form * {
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}

form h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}

label {
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}

input,
textarea {
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  align-content: center;
}

::placeholder {
  color: #e5e5e5;
}

button {
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}

#submit {
  background-color: rgba(255, 255, 255, 0.07);
  color: white;
  margin-top: 20px;
}

.container {
  margin-top: 20px;
}

@media (min-width: 768px) {
  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .container {
    height: 70vh;
  }
}
</style>