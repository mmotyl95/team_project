<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 text-center">
        <h3 class="animate-charcter">Favourite a bustop to see it here! ❤️</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-charcter {
  text-transform: uppercase;
  background-image: linear-gradient(
    -225deg,
    #231557 0%,
    #44107a 29%,
    #ff1361 67%,
    #fff800 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 3s linear infinite;
  display: inline-block;
  font-size: 50px;
  text-align: center;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}
</style>
