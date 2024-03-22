<template>
  <div class="ui">
    <div class="ui__header">
      <h1 class="ui__title">Оценка новых звонков</h1>
      <h3 class="ui__subtitle">Статистика обработки новых входящих звонков</h3>

      <div class="ui__header-settings">
        <div class="ui__header-settings--card date">01 янв 24 - 31 Mar 24</div>
      </div>
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
          <th>Менеджер</th>
          <th>Звонков</th>
          <th>Средний бал</th>
          <th>Невербалка</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="">Лариса Гузеева</a></td>
          <td>128</td>
          <td class="text-bold">78.2</td>
          <td>
            <span class="text-green text-bold">75</span> /
            <span class="text-bold">75</span> /
            <span class="text-red text-bold">75</span>
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