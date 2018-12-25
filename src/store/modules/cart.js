export default {
  namespaced: false,
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
    ],
  },
  getters: {
    doneTodos: state => state.todos.filter(todo => todo.done),
  },
}
