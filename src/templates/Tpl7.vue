<template>
  <div class="ui">
    <div class="ui__header">
      <h1 class="ui__title">Negotiation stage deals</h1>
      <h3 class="ui__subtitle">Statistics for deals in negotiation stage</h3>
    </div>

    <div class="ui__deal">
      <h1 class="ui__deal-title">ABC Inc deal</h1>
      <h2 class="ui__deal-price">$1,700</h2>
      <div class="ui__deal-contact">
        <div class="ui__deal-iconed_title name">Zach Sharma</div>
        <div class="ui__deal-info">
          <span>Phone</span>
          305-544-6683
        </div>
        <div class="ui__deal-info">
          <span>Email</span>
          zach.sharma@gmial.com
        </div>
      </div>
      <div class="ui__deal-address">
        <div class="ui__deal-iconed_title address">Blue Marble LLP</div>
        <div class="ui__deal-info">
          <span>Address</span>
          23A, 4113 Coulter Lane, New York 10035, US
        </div>
      </div>
      <div class="ui__deal-tags">
        <div class="tag t-lgreen">Prospect Qualified</div>
      </div>
    </div>

    <div class="ui__activity">
      <h3 class="ui__activity-title">Activity history</h3>
      <div class="ui__activity-history">
        <div class="ui__activity-history--item">
          <div class="ui__activity-history--item--icon file"></div>
          <div class="ui__activity-history--item--info">
            <span>February 7, 1:00 PM, Denis</span>
            Good lead. Loves our product, but needs some customization.
          </div>
        </div>
        <div class="ui__activity-history--item">
          <div class="ui__activity-history--item--icon phone"></div>
          <div class="ui__activity-history--item--info">
            <span>February 4, 1:00 PM, Denis</span>
            Mia exploring options; pote
          </div>
        </div>
        <div class="ui__activity-history--item">
          <div class="ui__activity-history--item--icon users"></div>
          <div class="ui__activity-history--item--info">
            <span>February 10:00 AM, Denis</span>
            Competitor offered an exclusive deal. Nathan chose to go with them.
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
  .ui {
    margin: 2.6rem 1.2rem 0;
  }
</style>