class Weight {
  // Получение последнего веса
  lastValue(data) {
    if (!data.length) return;

    return [...data].sort((a, b) => b.date - a.date)[0].weight;
  }

  // Получение максимального веса среди всех записей
  maxValue(data) {
    if (!data.length) return;

    return data.reduce((max, obj) => {
      return obj.weight > max ? obj.weight : max;
    }, 0);
  }

  // Расчет прогресбара
  calculateRatio(currentWeight, maxWeight, goalWeight) {
    if (!currentWeight || !maxWeight || !goalWeight) return 0;

    const weightDifference = maxWeight - currentWeight;
    const goalDifference = maxWeight - goalWeight;

    const result = Math.round((weightDifference / goalDifference) * 100);
    return !result || result < 0 || !isFinite(result) ? 0 : result;
  }
}

export default new Weight();
