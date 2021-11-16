<template>
  <div class="backlog">
    <button class="backlog__title">
      <span> Бэклог </span>
    </button>
    <div class="backlog__content">
      <div class="backlog__scroll">
        <div class="backlog__collapse">
          <div class="backlog__user">
            <div class="backlog__account">
              <img
                src="/public/user6.jpg"
                alt="Ваш аватар"
                width="32"
                height="32"
              />
              Игорь Пятин
            </div>

            <div class="backlog__counter">
              {{ sidebarTasks.length }}
            </div>
          </div>

          <div class="backlog__target-area">
            <div
              v-for="task in sidebarTasks"
              :key="task.id"
              class="backlog__task"
            >
              <div class="task">
                <div v-if="task.user" class="task__user">
                  <div class="task__avatar">
                    <img
                      :src="task.user.avatar"
                      :alt="task.user.name"
                      width="20"
                      height="20"
                    />
                  </div>
                  {{ task.user.name }}
                </div>

                <div class="task__statuses">
                  <span
                    v-if="task.status"
                    class="task__status"
                    :class="`task__status--${task.status}`"
                  />
                  <span
                    v-if="task.timeStatus"
                    class="task__status"
                    :class="`task__status--${task.timeStatus}`"
                  />
                </div>

                <h5
                  class="task__title"
                  :class="{ 'task__title--first': !task.user }"
                >
                  {{ task.title }}
                </h5>

                <ul v-if="task.tags && task.tags.length" class="task__tags">
                  <li v-for="(tag, index) in task.tags" :key="index">
                    <span class="task__tag">
                      {{ tag }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// Список задач, из которого достанем задачи для сайдбара.
import tasks from "@/static/tasks.json";
// Вспомогательные функции для нормализации задач и тегов задач.
import { normalizeTask, getTagsArrayFromString } from "@/common/helpers";

export default {
  name: "AppLayoutMainSidebar",
  data() {
    return {
      // получаем нормализованные задачи
      tasks: tasks.map((task) => normalizeTask(task)),
      backlogIsHidden: false,
    };
  },
  computed: {
    // Выбираем только задачи без id колонки (у нас это именно задачи сайдбара).
    // Нормализуем список тегов.
    // Сортируем задачи по их порядку внутри колонки.
    sidebarTasks() {
      return this.tasks
        .filter((task) => !task.columnId)
        .map((task) => ({
          ...task,
          tags: getTagsArrayFromString(task.tags),
        }));
    },
  },
};
</script>

<style lang="scss" scoped>
//@import "~@/assets/scss/blocks/task.scss";
</style>
