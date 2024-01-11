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

<template>
  <div class="chat-box">

    <div class="chat-box__messages">
      <div v-for="message in messages" :key="message.id" class="chat-box__messages-message">
        <div v-if="message.isAI" class="ai-message">
          <div class="avatar"></div>
          <div class="text">{{ message.content }}</div>
        </div>
        <div v-else class="user-message">
          <div class="avatar"></div>
          <div class="text">{{ message.content }}</div>
        </div>
      </div>
    </div>

    <div class="chat-box__form">
      <input class="chat-box__form-input" @keyup.enter="sendMessage" v-model="userMessage"/>
      <button class="chat-box__form-btn btn" @click="sendMessage" >Submit</button>
    </div>

  </div>
</template>

<style lang="scss" scoped>
  .chat-box {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: flex-end;

    &__messages {
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-height: 600px;
      max-height: 900px;
      overflow-y: scroll;
      justify-content: flex-end;

      &-message {

        .avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          margin-top: 10px;
        }
        .text {
          border-radius: 8px;
          padding: 14px;
          flex: 1;
        }

        .user-message {
          display: flex;
          gap: 8px;
          .avatar {
            border: 1px solid var(--color-border);
          }
          .text {
            border: 1px solid var(--color-border);
          }
        }
        .ai-message {
          display: flex;
          gap: 8px;
          .avatar {
            background: #4A25E1;
          }
          .text {
            background: #fff;
          }
        }
      }
    }
    &__form {
      display: flex;
      gap: 8px;

      &-input {
        border: 1px solid var(--color-border);
        border-radius: 16px;
        padding: 12px;
        flex: 1;
      }
      &-btn {
        border: 0;
        color: #fff;
        background: #4A25E1;
        border-radius: 16px;
        padding: 12px 48px;
        font-weight: bold;
      }
    }
  }
</style>