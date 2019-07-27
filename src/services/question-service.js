export default class QuestionService {
  constructor(questionStore) {
    this.QuestionStore = questionStore
  }

  async list() {
    const Question = new this.QuestionStore()
    const question = await Question.find({})
    return question._doc
  }

  async create(payload) {
    const Question = new this.QuestionStore(payload)
    const question = await Question.save()
    return question._doc
  }

  async update(id, payload) {
    const Question = new this.QuestionStore()
    const question = await Question.findOneAndUpdate({ _id: id }, payload)
    return question._doc
  }

  async remove(id) {
    const Question = new this.QuestionStore()
    const question = await Question.remove({ _id: id })
    return question._doc
  }
}
