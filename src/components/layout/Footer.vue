<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          Copyright © {{ currentYear }} Jiří Chára. All Rights Reserved.
        </p>
        <p>
          The source code of this website is
          <a href="https://github.com/JiriChara/chara.vip">
            available on GitHub
          </a>
          and is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'jch-footer',

    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    },
  };
</script>
