<template>
  <div class="ui">
    <div class="ui__header">
      <h1 class="ui__title">Negotiation stage deals</h1>
      <h3 class="ui__subtitle">Statistics for deals in negotiation stage</h3>

      <div class="ui__header-settings">
        <div class="ui__header-settings--card filter">source: <span>trade show event</span></div>
        <div class="ui__header-settings--card date">01 Sep 24 - 01 Oct 24</div>
      </div>
    </div>

    <div class="ui__stats">
      <div class="ui__stats-card">
        <div class="ui__stats-card--value">$234,567</div>
        <div class="ui__stats-card--title">Total deals value</div>
      </div>
      <div class="ui__stats-card">
        <div class="ui__stats-card--value">34</div>
        <div class="ui__stats-card--title">Deals total</div>
      </div>
    </div>

    <table class="ui__table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Value</th>
          <th>Organization</th>
          <th>Contact person</th>
          <th>Owner</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="">JMVD Inc deal</a></td>
          <td>$900</td>
          <td>JMVD Inc</td>
          <td>Gloria Quinn</td>
          <td>Denis</td>
        </tr>
        <tr>
          <td><a href="">Silicon Links Inc deal</a></td>
          <td>$1,200</td>
          <td>Silicon Links Inc</td>
          <td>Phyllis Yang</td>
          <td>Anna</td>
        </tr>
        <tr>
          <td><a href="">ABC Inc deal</a></td>
          <td>$450</td>
          <td>ABV Inc</td>
          <td>Hashim Hardy</td>
          <td>Denis</td>
        </tr>
        <tr>
          <td><a href="">Moveer Limited deal</a></td>
          <td>$2,000</td>
          <td>Moveer Limited</td>
          <td>Tony Turner</td>
          <td>Denis</td>
        </tr>
        <tr>
          <td><a href="">Ownerate LLP deal</a></td>
          <td>$2,500</td>
          <td>Ownerate LLP</td>
          <td>Darcie Dixon</td>
          <td>Anna</td>
        </tr>
        <tr>
          <td><a href="">Silicon Links Inc deal</a></td>
          <td>$1,200</td>
          <td>Silicon Links Inc</td>
          <td>Phyllis Yang</td>
          <td>Anna</td>
        </tr>
        <tr>
          <td><a href="">Moveer Limited deal</a></td>
          <td>$2,000</td>
          <td>Moveer Limited</td>
          <td>Tony Turner</td>
          <td>Denis</td>
        </tr>
        <tr>
          <td><a href="">Ownerate LLP deal</a></td>
          <td>$2,500</td>
          <td>Ownerate LLP</td>
          <td>Darcie Dixon</td>
          <td>Anna</td>
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