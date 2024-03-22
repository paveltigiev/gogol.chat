<template>
  <div class="ui">
    <div class="ui__header">
      <h1 class="ui__title">02.02.2024 10:33 (Ольга, Ярославль)</h1>
      <h3 class="ui__subtitle">Оценка звонков менджера</h3>

      <h1 class="text-bold">Формальная оценка</h1>
    </div>

    <table class="ui__table">
      <thead>
        <tr>
          <th>Параметр</th>
          <th>Результат</th>
          <th>Оценка</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Уточнили имя</td>
          <td>Ольга</td>
          <td>
            <span class="text-green text-bold">+10</span>
          </td>
        </tr>
        <tr>
          <td class="text-bold">Итог:</td>
          <td></td>
          <td>
            <span class="text-green text-bold">+10</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="ui__calls-param">
      <h1 class="ui__calls-param--title">Вербальная оценка: <span class="text-green text-bold">хорошо</span></h1>
      <ul class="ui__calls-param--list">
        <li>Уверенный разговор</li>
        <li>Все фразы завершались вопросом</li>
        <li>Позитивный настрой</li>
      </ul>
    </div>

    <div class="ui__calls-param">
      <h1 class="ui__calls-param--title">Транскрипция разговора</h1>
      <div class="ui__calls-param--talk">
        <p>Оператор: Добрый день, компания Дон-Потолок</p>
        <p>Клиент: Сколько стоит натяжной потолок зеленого цвета?</p>
        <p>Оператор: из какого города вы звоните?</p>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
  .ui {
    margin: 2.6rem 1.2rem 0;
  }
</style>