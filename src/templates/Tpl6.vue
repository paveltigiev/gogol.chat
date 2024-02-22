<template>
  <div class="ui">
    <div class="ui__header">
      <h1 class="ui__title">Main reasons of loosing leads to competitors</h1>
      <h3 class="ui__subtitle">How many leads did we lose to competitors in the last quarter, and what was the main reason noted?</h3>

      <div class="ui__header-settings">
        <div class="ui__header-settings--card filter">source: <span>‘trade show event’</span>, owner: <span>‘Denis’</span> or <span>‘Anna’</span>, status: <span>‘Open’</span>, stage: NOT <span>’Proposal made’</span></div>
        <div class="ui__header-settings--card date">01 Sep 24 - 01 Oct 24</div>
      </div>
    </div>

    <div class="ui__stats">
      <div class="ui__stats-card">
        <div class="ui__stats-card--value">$23,456</div>
        <div class="ui__stats-card--title">All deals value</div>
      </div>
      <div class="ui__stats-card">
        <div class="ui__stats-card--value">34</div>
        <div class="ui__stats-card--title">Deals total</div>
      </div>
    </div>

    <table class="ui__table">
      <thead>
        <tr>
          <th>Deal title</th>
          <th>Quantity</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Not a good fit</td>
          <td>13</td>
          <td>$ 12,235</td>
        </tr>
        <tr>
          <td>Lack of customization</td>
          <td>7</td>
          <td>$  9,235</td>
        </tr>
        <tr>
          <td>Budget constraints</td>
          <td>6</td>
          <td>$  7,235</td>
        </tr>
        <tr>
          <td>Competitor offer</td>
          <td>4</td>
          <td>$  4,235</td>
        </tr>
        <tr>
          <td>No response</td>
          <td>2</td>
          <td>$  2,235</td>
        </tr>
        <tr>
          <td>Client's budget cut</td>
          <td>2</td>
          <td>$  1,235</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .ui {
    margin: 2.6rem 1.2rem 0;
  }

</style>