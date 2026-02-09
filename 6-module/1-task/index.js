/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.render(); 
  }

  render() {
    this.elem = document.createElement('table');
    
    const thead = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
    `;
    
    const tbody = `
      <tbody>
        ${this.rows.map(row => `
          <tr>
            <td>${row.name}</td>
            <td>${row.age}</td>
            <td>${row.salary}</td>
            <td>${row.city}</td>
            <td><button>X</button></td>
          </tr>
        `).join('')}
      </tbody>
    `;
    
    this.elem.innerHTML = thead + tbody;
    
    this.elem.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        event.target.closest('tr').remove();
      }
    });
  }
}