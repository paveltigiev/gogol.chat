<template>
  <div class="chat-interface">

    <div v-for="message in messages" :key="message.id">
      <p v-if="message.isAI">AI: {{ message.content }}</p>
      <p v-else>User: {{ message.content }}</p>
    </div>

    <textarea v-model="userMessage" style="width: 100%"></textarea>
    <button @click="sendMessage">Send</button>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [],
      userMessage: "",
      apiKey: "sk-xxx",
      endpoint: "https://api.openai.com/v1/completions",
    };
  },
  methods: {
    async sendMessage() {

      this.messages.push({ id: Date.now(), content: this.userMessage, isAI: false });

      // Call the API to get AI response
      const response = await axios.post(this.endpoint, {
        model: "gpt-3.5-turbo-instruct",
        prompt: this.userMessage,
        max_tokens: 2024,
        temperature: 0,
      }, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      this.userMessage = "";

      this.messages.push({ id: Date.now(), content: response.data.choices[0].text.trim(), isAI: true });

    },
  },
};
</script>