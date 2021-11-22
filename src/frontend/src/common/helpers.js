export const getView = (view) => () =>
  import(`@/views/${view}.vue`).then((m) => m.default || m);
