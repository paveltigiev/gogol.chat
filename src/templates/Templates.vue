<template>
  <div class="tpl-nav">
    <router-link to="tpl1">Template n1</router-link>
    <router-link to="tpl2">Template n2</router-link>
    <router-link to="tpl3">Template n3</router-link>
    <router-link to="tpl4">Template n4</router-link>
    <router-link to="tpl5">Template n5</router-link>
    <router-link to="tpl6">Template n6</router-link>
    <router-link to="tpl7">Template n7</router-link>
  </div>
</template>

<style lang="scss" scoped>
.tpl-nav {
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  a {
    font-size: 2em;
  }
}
</style>