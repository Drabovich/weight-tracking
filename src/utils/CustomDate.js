class CustomDate {
  // Преобразование timestamp в формат даты "22/06/1999 и 22/06" или метод toLocaleDateString()
  conversion(timestamp, element = '/') {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return {
      full: `${day < 10 ? '0' : ''}${day}${element}${month < 10 ? '0' : ''}${month}${element}${year}`,
      dayAndMonth: `${day < 10 ? '0' : ''}${day}${element}${month < 10 ? '0' : ''}${month}`
    };
  }

  // Подготовка введенной даты, для корректного поиска
  preparation(obj) {
    const { start, end } = obj;

    const startDate = new Date(start);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);

    return {
      start: startDate.getTime(),
      end: endDate.getTime()
    };
  }
}

export default new CustomDate();
