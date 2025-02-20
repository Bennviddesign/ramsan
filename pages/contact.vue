<template>
  <div class="container">
    <div class="form">
      <form @submit.prevent="sendMessage">
        <div>
          <h2>Tipsa gärna oss!</h2>
          <h5>Fungerar inte för tillfälligt</h5>
        </div>
        <div>
          <label for="name">Namn:</label>
          <input v-model="formData.name" type="text" placeholder="Ditt namn.." required />
        </div>

        <div>
          <label for="email">Email:</label>
          <input v-model="formData.email" type="email" placeholder="Din email.." required />
        </div>
        <div>
          <label for="amne">Ämne:</label>
          <input v-model="formData.amne" type="text" placeholder="Ämne" required />
        </div>
        <div>
          <label for="file">Fil:</label>
          <input v-on="formData.file" type="file" accept="audio/mpeg" />
        </div>

        <div>
          <label for="message">Meddelande:</label>
          <textarea v-model="formData.message" placeholder="Ditt meddelande.." required></textarea>
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

<script>

export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
        file: "",
        amne: "",
      },
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async sendMessage() {
      try {
        const response = await axios.post("https://ramsan.se/contact.php", this.formData);
        this.successMessage = response.data.message;
        this.errorMessage = "";
      } catch (error) {
        this.errorMessage = "Error sending message. Please try again.";
        this.successMessage = "";
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
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
}
</style>