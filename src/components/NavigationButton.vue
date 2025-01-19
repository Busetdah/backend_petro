<script setup></script>

<template>
  <section class="container">
    <router-link class="custom-button" to="/historypage">HISTORY</router-link>
    <router-link class="custom-button" to="/alarmpage">ALARM</router-link>
    <div class="home-icon">
      <router-link to="/">
        <img src="../assets/home.svg" alt="Home Icon" />
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.container {
  position: absolute;
  bottom: 0.1vh;
  right: 1vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.custom-button {
  padding: 7px 10px;
  border: 2px solid black;
  background-color: #aad4c8;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #000;
}
.home-icon img {
  width: 3vw;
  height: auto;
  cursor: pointer;
}
</style>
