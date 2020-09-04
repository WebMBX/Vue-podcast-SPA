<template>
  <img class="Logo" src="@/assets/logo.png" alt="" />
</template>

<style>
.Logo {
  animation: 4.5s appear;
  margin: auto;
  width: 80px;
  display: block;
}

@keyframes appear {
  0% {
    /* opacity: 0; */
    transform: skewX(20deg);
    /* transform: scale(1.2); */
  }
  20% {
    transform: skewY(20deg);
    /* transform: scale(1); */
  }
  40% {
    transform: skewX(20deg);
    /* transform: scale(1.2); */
  }
  60% {
    transform: skewY(20deg);
    /* transform: scale(1); */
  }
  80% {
    transform: skewX(20deg);
    /* transform: scale(1.2); */
  }
}
</style>
