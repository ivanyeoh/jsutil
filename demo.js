import router from "./src/router.js"

router
  .add("/a", 'aaa hellop')
  .add("/b", () => {
    console.log('b page')
  })
  .init()