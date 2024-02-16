// Методы для записи и получения данных из LS
class LocalData {
  getRecords() {
    const recordsJSON = localStorage.getItem('records');
    return recordsJSON ? JSON.parse(recordsJSON) : [];
  }

  setRecords(records) {
    localStorage.setItem('records', JSON.stringify(records));
  }

  getGoal() {
    const goalJSON = localStorage.getItem('goal');
    return goalJSON ? JSON.parse(goalJSON) : '';
  }

  setGoal(goal) {
    localStorage.setItem('goal', JSON.stringify(goal));
  }
}

export default new LocalData();
