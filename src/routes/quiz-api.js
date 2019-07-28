import { createController } from 'awilix-koa'
const api = quizService => ({
  getQuiz: async ctx => ctx.ok(await quizService.get(ctx.params.id)),
  getResult: async ctx => ctx.ok(await quizService.getResult(ctx.params.id)),
  createQuiz: async ctx =>
    ctx.created(await quizService.create(ctx.request.body))
})

export default createController(api)
  .prefix('/quiz')
  .get('/:id', 'getQuiz')
  .get('/:id/result', 'getResult')
  .post('', 'createQuiz')
