<script setup>
import { ref, watch, onMounted, shallowRef, nextTick } from 'vue';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import LocalData from '@/utils/LocalData';
import CustomDate from '@/utils/CustomDate';
import Weight from '@/utils/Weight';
import { NUMBER_REGEX } from '@/constants/REGEX';
import { OPTIONS_CHART } from '@/constants/CHART';
import WeightDisplay from '@/components/WeightDisplay.vue';
import InputWeight from '@/components/InputWeight.vue';
import ProgressBar from '@/components/ProgressBar.vue';

// Основные переменные
const weightsLS = ref([]);
const selectedItems = ref([]);
const lastWeight = ref('');
const maxWeight = ref('');
const inputValueGoal = ref('');
const progressBarValue = ref(null);
const weightChart = shallowRef(null);
const weightChartEl = ref(null);
const inputValueDateForSearch = ref({ start: null, end: null });
const toggleSortedWeight = ref(false);
const toggleSortedDate = ref(false);
const isShowMenu = ref(false);
const isShowDeleteCheckbox = ref(false);

// Получение данных при первом рендере страницы
onMounted(() => {
  inputValueGoal.value = LocalData.getGoal();
  weightsLS.value = LocalData.getRecords();
});

// Запись в LS, измененной цели по желаемому весу
watch(inputValueGoal, () => {
  if (inputValueGoal.value && !NUMBER_REGEX.test(inputValueGoal.value)) return;
  LocalData.setGoal(inputValueGoal.value);
});

// Расчеты при любом изменении weightsLS
watch(weightsLS, (newValue) => {
  if (!newValue || newValue.length < 2) return;
  newValue.sort((a, b) => a.date - b.date);

  // Получение последней записи веса
  lastWeight.value = Weight.lastValue(newValue);
  maxWeight.value = Weight.maxValue(newValue);
  progressBarValue.value = Weight.calculateRatio(
    lastWeight.value,
    maxWeight.value,
    inputValueGoal.value
  );

  // Получение последних 7 дат и записей веса
  const sortedWeights = [...newValue];
  const labels = sortedWeights
    .map((w) => CustomDate.conversion(w.date, '.').dayAndMonth)
    .slice(-7);
  const data = sortedWeights.map((w) => w.weight).slice(-7);

  if (weightChart.value) {
    weightChart.value.data.labels = labels;
    weightChart.value.data.datasets[0].data = data;
    weightChart.value.update();
    return;
  }

  // Рендер графика при первом изменении weightsLS
  nextTick(() => {
    weightChart.value = new Chart(weightChartEl.value, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            data,
            borderColor: '#4cc4d1'
          }
        ]
      },
      options: OPTIONS_CHART,
      plugins: [ChartDataLabels]
    });
  });
});

// Запись нового веса в LS
const createWeightLS = (data) => {
  weightsLS.value = LocalData.getRecords();
  weightsLS.value = [...weightsLS.value, data];
  weightsLS.value.sort((a, b) => a.date - b.date);
  LocalData.setRecords(weightsLS.value);
};

// Фильтрация по заданным элементам
function filtredList(param) {
  if (weightsLS.value.length < 2) return;

  if (param === 'weight') {
    toggleSortedWeight.value = !toggleSortedWeight.value;

    if (toggleSortedWeight.value) {
      weightsLS.value.sort((a, b) => b.weight - a.weight);
    } else {
      weightsLS.value.sort((a, b) => a.weight - b.weight);
    }
    return;
  }

  if (param === 'date') {
    toggleSortedDate.value = !toggleSortedDate.value;

    if (toggleSortedDate.value) {
      weightsLS.value.sort((a, b) => b.date - a.date);
    } else {
      weightsLS.value.sort((a, b) => a.date - b.date);
    }
  }
}

// Удаление всех записей веса и сброс значений
function handleDeleteAll() {
  if (!weightsLS.value.length) return;

  const ask = confirm('Вы действительно хотите удалить все записи?');
  if (!ask) return;

  weightsLS.value = [];
  LocalData.setRecords([]);
  isShowMenu.value = false;
  lastWeight.value = '';
  isShowDeleteCheckbox.value = false;
  selectedItems.value = [];
}

// Обработчик на клик выбора удаляемого элемента
function hundleAddSelectedItems(e) {
  const findItemIndex = selectedItems.value.findIndex(
    (id) => id === e.target.value
  );

  if (findItemIndex === -1) {
    selectedItems.value = [...selectedItems.value, e.target.value];
  } else {
    selectedItems.value.splice(findItemIndex, 1);
  }
}

// Удаление выбранных записей и логика кнопки удаления
function handleDeleteItem() {
  if (!weightsLS.value.length) return;

  if (isShowDeleteCheckbox.value && selectedItems.value.length) {
    weightsLS.value = weightsLS.value.filter(
      (item) => !selectedItems.value.includes(item.id)
    );
    LocalData.setRecords(weightsLS.value);
    selectedItems.value = [];
    isShowMenu.value = false;
    isShowDeleteCheckbox.value = false;
    if (!weightsLS.value.length) {
      lastWeight.value = '';
    }
    return;
  }
  isShowDeleteCheckbox.value = !isShowDeleteCheckbox.value;
}

// Поиск записей по указанным параметрам в календаре
watch(inputValueDateForSearch, (newValue) => {
  weightsLS.value = LocalData.getRecords();
  if (!weightsLS.value.length || !newValue || !newValue.start || !newValue.end)
    return;
  const { start, end } = CustomDate.preparation(newValue);
  weightsLS.value = weightsLS.value.filter(
    (w) => w.date >= start && w.date <= end
  );
});
</script>

<template>
  <div class="flex relative flex-col min-h-screen text-white p-3 gap-y-2">
    <!-- Секция ввода и отображения значений -->
    <div class="flex flex-col p-3 gap-y-5 rounded-lg bg-custom-grey">
      <div class="flex justify-center items-center gap-x-6">
        <WeightDisplay :lastWeight="lastWeight" />
        <!-- Установка цели -->
        <div class="flex flex-col items-center">
          <h3 class="text-sm">Установить цель:</h3>
          <div class="flex gap-x-2 items-center">
            <u-input
              v-model="inputValueGoal"
              placeholder=""
              customClassInput="!w-16 text-center"
            />
            <p class="text-lg">kg</p>
          </div>
        </div>
      </div>
      <!-- Ввод значений веса -->
      <InputWeight @createWeight="createWeightLS" />
    </div>

    <!-- Прогрессбар сколько осталось до цели -->
    <div v-if="weightsLS.length > 1">
      <ProgressBar
        :lastWeight="lastWeight"
        :inputValueGoal="inputValueGoal"
        :progressBarValue="progressBarValue"
      />
    </div>

    <!-- Вывод последних 7 записей на график  -->
    <div v-show="weightsLS.length > 1" class="mb-3">
      <canvas ref="weightChartEl"></canvas>
    </div>

    <!-- Вывод списка записей или ошибки об отсутствии записей -->
    <div v-if="weightsLS.length" class="rounded-lg bg-custom-grey p-3">
      <!-- Группа кнопок для фильтрации -->
      <div class="flex justify-between mb-2">
        <button
          @click="filtredList('weight')"
          class="flex gap-x-1 items-center"
        >
          <span>Вес</span>
          <sort-icon />
        </button>
        <button @click="filtredList('date')" class="flex gap-x-1 items-center">
          <span>Дата</span>
          <sort-icon />
        </button>
      </div>
      <!-- Список всех записей веса -->
      <ul class="flex flex-col gap-y-1" v-auto-animate>
        <!-- Верстка одной записи -->
        <li
          v-for="item in weightsLS"
          :key="item.id"
          class="flex justify-between border-b border-solid border-b-gray-400 border-opacity-50 last:border-none"
        >
          <div class="flex justify-between items-center gap-x-2">
            <!-- Checkbox для удаления записи -->
            <input
              v-show="isShowDeleteCheckbox"
              type="checkbox"
              :value="item.id"
              @change="hundleAddSelectedItems($event)"
            />
            <span class="text-custom-blue">{{ item.weight }} kg</span>
          </div>
          <span class="text-white text-opacity-75">{{
            CustomDate.conversion(item.date).full
          }}</span>
        </li>
      </ul>
    </div>
    <!-- Вывод ошибки, если нет записей -->
    <div
      v-else
      class="rounded-lg bg-custom-grey px-3 py-10 flex justify-center items-center"
    >
      <p>Записи не найдены!</p>
    </div>

    <!-- Меню с доп. функционалом -->
    <div
      :class="`
        fixed flex justify-center items-center bottom-3 right-3 gap-x-10
        w-10 h-10 rounded-full border-2 border-solid border-custom-blue bg-custom-grey text-white
        ${isShowMenu ? '!w-[250px] !justify-between px-3' : ''}
      `"
    >
      <div v-show="isShowMenu" class="grow flex justify-between items-center">
        <button @click="handleDeleteAll">
          <delete-all-icon />
        </button>
        <button @click="handleDeleteItem">
          <delete-icon />
        </button>
        <u-calendar-range v-model="inputValueDateForSearch" />
      </div>
      <button @click="isShowMenu = !isShowMenu">
        <menu-icon />
      </button>
    </div>
  </div>
</template>
