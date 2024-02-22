<template>
  <div class="ui">
    <div class="ui__header">
      <h1 class="ui__title">Closed deals statistics</h1>
      <h3 class="ui__subtitle">Closed deals statistics for last quarter</h3>

      <div class="ui__header-settings">
        <div class="ui__header-settings--card filter">status: <span>closed</span></div>
        <div class="ui__header-settings--card date">01 Jan 24 - 31 Mar 24</div>
      </div>
    </div>

    <div class="ui__stats">
      <div class="ui__stats-card">
        <div class="ui__stats-card--value">$234,567</div>
        <div class="ui__stats-card--title">Closed deals value</div>
      </div>
      <div class="ui__stats-card">
        <div class="ui__stats-card--value">34</div>
        <div class="ui__stats-card--title">Leads total</div>
      </div>
      <div class="ui__stats-card">
        <div class="ui__stats-card--value">14%</div>
        <div class="ui__stats-card--title">Conversion rate</div>
      </div>
    </div>

    <div class="ui__chart">
      <div class="ui__chart-title">Closed leads trend</div>
      <div class="ui__chart-subtitle">List of closed leads with by months breakdown</div>
      <div class="ui__chart-candels">
        <div class="ui__chart-candels--item">
          <div class="ui__chart-candels--item--candel"><span style="height: 25%;"></span></div>
          <div class="ui__chart-candels--item--date">May 23</div>
        </div>
        <div class="ui__chart-candels--item">
          <div class="ui__chart-candels--item--candel"><span style="height: 35%;"></span></div>
          <div class="ui__chart-candels--item--date">Jun 23</div>
        </div>
        <div class="ui__chart-candels--item">
          <div class="ui__chart-candels--item--candel"><span style="height: 45%;"></span></div>
          <div class="ui__chart-candels--item--date">Jul 23</div>
        </div>
        <div class="ui__chart-candels--item">
          <div class="ui__chart-candels--item--candel"><span style="height: 55%;"></span></div>
          <div class="ui__chart-candels--item--date">Aug 23</div>
        </div>
        <div class="ui__chart-candels--item">
          <div class="ui__chart-candels--item--candel"><span style="height: 70%;"></span></div>
          <div class="ui__chart-candels--item--date">Sep 23</div>
        </div>
        <div class="ui__chart-candels--item">
          <div class="ui__chart-candels--item--candel"><span style="height: 80%;"></span></div>
          <div class="ui__chart-candels--item--date">Oct 23</div>
        </div>
        <div class="ui__chart-candels--item">
          <div class="ui__chart-candels--item--candel"><span style="height: 100%;"></span></div>
          <div class="ui__chart-candels--item--date">Nov 23</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .ui {
    margin: 2.6rem 1.2rem 0;
  }
</style>