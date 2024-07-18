<template>
  <div id="popup">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/skull.png" width="125" height="125" />
      <div class="wrapper">
        <nav>
          <RouterLink to="/todo"><button>Todo</button></RouterLink>
          <RouterLink to="/"><button>Home</button></RouterLink>
          <RouterLink to="/prompt" ><button>PromptGPT</button></RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style>
#popup {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
.user {
  margin-top: 20px;
}
button {
  padding: 10px 20px;
  border: 2px solid #f0f0f0;
  border-radius: 5px;
  background-color: #070606;
  color: #ffffff;
  font-size: 0.9em;
  cursor: pointer;
  text-shadow: 1px 1px 0 #000000;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e1dc90;
}
</style>
