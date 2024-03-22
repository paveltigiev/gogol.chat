<template>
  <div class="ui">
    <div class="ui__header">
      <h1 class="ui__title">Екатерина Андреева</h1>
      <h3 class="ui__subtitle">Оценка звонков менджера</h3>
    </div>

    <div class="ui__stats">
      <div class="ui__stats-card">
        <div class="ui__stats-card--value">393</div>
        <div class="ui__stats-card--title">всего звонков</div>
      </div>
      <div class="ui__stats-card">
        <div class="ui__stats-card--value">73.25</div>
        <div class="ui__stats-card--title">средний бал</div>
      </div>
    </div>

    <table class="ui__table">
      <thead>
        <tr>
          <th>Звонок</th>
          <th>Оценка</th>
          <th>Невербалка</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="">02.02.2024 10:33 (Ольга, Донецк)</a></td>
          <td class="text-bold">78.2</td>
          <td>
            <span class="text-green text-bold">хорошо</span>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<style lang="scss" scoped>
  .ui {
    margin: 2.6rem 1.2rem 0;
  }
</style>