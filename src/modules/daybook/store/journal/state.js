// const myState = () => ({
// })

export default () => ({
  isLoading: true,
  entries: [
    {
      id: new Date().getTime(),
      date: new Date().toDateString(),
      text:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non cumque aliquid facilis aut dolore id distinctio dolores laborum sequi, nesciunt quaerat expedita inventore et quo. Aperiam quia laborum repellendus ipsum?',
      picture: null,
    },
    {
      id: new Date().getTime() + 1000,
      date: new Date().toDateString(),
      text:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, animi? Voluptatibus magni laudantium fuga officia et architecto excepturi iure. Enim quisquam deleniti unde nesciunt dolore maxime vel optio, amet doloremque?',
      picture: null,
    },
    {
      id: new Date().getTime() + 2000,
      date: new Date().toDateString(),
      text:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. At labore tempore, minima voluptas, natus nam debitis dolore incidunt qui ab, animi sint nesciunt odio quibusdam rerum quaerat quam facere iusto',
      picture: null,
    },
  ],
});
