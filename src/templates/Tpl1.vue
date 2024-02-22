<template>
  <div class="ui">
    <div class="ui__header">
      <h1 class="ui__title">Negotiation stage deals</h1>
      <h3 class="ui__subtitle">Statistics for deals in negotiation stage</h3>

      <div class="ui__header-settings flex-end">
        <div class="ui__header-settings--card date">12 Oct 23 - 12 Nov 23</div>
      </div>
    </div>

    <div class="ui__stats">
      <div class="ui__stats-card">
        <div class="ui__stats-card--value">34</div>
        <div class="ui__stats-card--perc green">+7.45%</div>
        <div class="ui__stats-card--title">Leads total in period</div>
      </div>
      <div class="ui__stats-card">
        <div class="ui__stats-card--value">$234,567</div>
        <div class="ui__stats-card--perc red">-2.5%</div>
        <div class="ui__stats-card--title">Total deals value</div>
      </div>
      <div class="ui__stats-card">
        <div class="ui__stats-card--value">12/8/14</div>
        <div class="ui__stats-card--perc gray">23.52%</div>
        <div class="ui__stats-card--title">Conversion: <br> open / won / lose</div>
      </div>
    </div>

    <div class="ui__chart">
      <div class="ui__chart-title">New leads value trend</div>
      <div class="ui__chart-subtitle">List of new leads with by months breakdown</div>
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