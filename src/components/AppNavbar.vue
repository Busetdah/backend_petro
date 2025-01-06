<script setup>
import { ref, onMounted } from 'vue'

const date = ref('')
const time = ref('')

const updateDateTime = () => {
  const now = new Date()
  date.value = now.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
  time.value = now.toLocaleTimeString('id-ID')
}

onMounted(() => {
  updateDateTime()
  setInterval(updateDateTime, 1000)
})
</script>

<template>
  <section>
    <div class="navbar">
      <img class="petro" src="../assets/petro_logo.png" alt="Petrokimia" />
      <div class="title">SCADA SMART NEW FUJI ROBO</div>
      <img class="dept" src="../assets/dept_pergudangan.png" alt="Departemen Pergudangan" />
      <section class="clock">
        <div>
          <p class="date">{{ date }}</p>
        </div>
        <div>
          <p class="time">{{ time }}</p>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
.navbar {
  border-bottom: 4px solid #000;
  display: flex;
}
.navbar img.petro {
  width: 12vw;
  height: 6vw;
}
.navbar img.dept {
  width: 12vw;
  height: 6vw;
}
.navbar .title {
  background-color: #c0c0c0;
  border: 3px solid #000;
  margin: 1vw 10vw 1vw 20vw;
  padding: 1vw 2vw;
  height: 1.8vw;
  width: 30vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.5vw;
  font-style: normal;
}
.clock {
  margin: 0 0 0 3vw;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1vw;
}
.clock .date,
.time {
  background-color: #c0c0c0;
  border: 2px solid #000;
  padding: 0.7vw;
  margin: 0;
  width: 10vw;
}
.clock .date {
  margin-bottom: 1px;
}
</style>
