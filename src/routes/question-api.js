import { createController } from 'awilix-koa'
const api = questionService => ({
  listQuestions: async ctx => ctx.ok(await questionService.list()),
  createQuestion: async ctx =>
    ctx.created(await questionService.create(ctx.request.body))
})

export default createController(api)
  .prefix('/questions')
  .get('', 'listQuestions')
  .post('', 'createQuestion')
