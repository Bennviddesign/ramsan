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
    <div class="form-wrapper">
      <form action="/send-email.php" method="POST" enctype="multipart/form-data" @submit="handleSubmit">
        <div class="form-header">
          <h2>Tipsa gärna oss!</h2>
        </div>
        <div>
          <label for="name">Namn:</label>
          <input v-model="form.name" id="name" name="name" type="text" placeholder="Ditt namn.." required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="form.email" id="email" name="email" type="email" placeholder="Din email.." required />
        </div>
        <div>
          <label for="amne">Ämne:</label>
          <input v-model="form.amne" id="amne" name="amne" type="text" placeholder="Ämne" required />
        </div>
        <div>
          <label for="file">Fil (MP3):</label>
          <input id="file" type="file" name="file" accept="audio/mpeg" @change="handleFileUpload" class="file-input" />
        </div>
        <div class="full-width">
          <label for="message">Meddelande:</label>
          <textarea v-model="form.message" id="message" name="message" placeholder="Ditt meddelande.."
            required></textarea>
        </div>
        <div class="full-width submit-container">
          <button type="submit" id="submit">Skicka</button>
          <p v-if="successMessage" class="status-message success">{{ successMessage }}</p>
          <p v-if="errorMessage" class="status-message error">{{ errorMessage }}</p>
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
  min-height: 70vh;
  padding: 1rem;
}

.form-wrapper {
  width: 100%;
  max-width: 800px;
}

form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  background-color: var(--color-background-soft, rgba(255, 255, 255, 0.05));
  color: var(--color-text, inherit);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 2rem;
}

.form-header,
.full-width {
  grid-column: 1 / -1;
}

h2 {
  text-align: center;
  margin-bottom: 0.5rem;
  color: var(--color-heading, inherit);
  font-size: 1.75rem;
}

label {
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-text, inherit);
}

input[type="text"],
input[type="email"],
textarea {
  display: block;
  width: 100%;
  background-color: var(--color-background-mute, rgba(0, 0, 0, 0.05));
  color: var(--color-text, inherit);
  border: 1px solid var(--color-border, #ccc);
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 0.95rem;
  font-family: inherit;
  box-sizing: border-box;
  transition: border-color 0.2s, background-color 0.2s;
}

input[type="text"]:focus,
input[type="email"]:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-accent, #007bff);
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.file-input {
  width: 100%;
  padding: 0.5rem 0;
  color: var(--color-text, inherit);
}

/* Anpassning av placeholders för tema */
::placeholder {
  color: var(--color-text, #888);
  opacity: 0.6;
}

.submit-container {
  margin-top: 0.5rem;
}

button[type="submit"] {
  width: 100%;
  background-color: var(--color-accent, #007bff);
  color: #ffffff;
  padding: 0.85rem 0;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.2s;
}

button[type="submit"]:hover {
  opacity: 0.9;
}

.status-message {
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
}

.status-message.success {
  color: #28a745;
}

.status-message.error {
  color: #dc3545;
}

@media (min-width: 768px) {
  form {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>