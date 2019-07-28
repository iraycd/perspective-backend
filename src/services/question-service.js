export default class QuestionService {
  constructor(questionStore) {
    this.QuestionStore = questionStore
  }

  async list() {
    const question = await this.QuestionStore.find({})
    return question
  }

  async create(payload) {
    const Question = new this.QuestionStore(payload)
    const question = await Question.save()
    return question._doc
  }

  async update(id, payload) {
    const question = await this.QuestionStore.findOneAndUpdate(
      { _id: id },
      payload
    )
    return question._doc
  }

  async remove(id) {
    const question = await this.QuestionStore.remove({ _id: id })
    return question._doc
  }
}
