export default class QuizService {
  constructor(quizStore, constants) {
    this.QuizStore = quizStore
    this.PERSONALITIES = constants.PERSONALITIES
  }

  myersBriggsScore(score, quizAnswer) {
    const { question, answer } = quizAnswer
    const { meaning } = question
    const centeredAnswer = answer - 4
    score[meaning] += centeredAnswer
  }
  personalityScore(score) {
    const PERSONALITY_DIMENSIONS = ['EI', 'SN', 'TF', 'JP']
    const personality = {
      shortCode: [],
      longCode: []
    }
    PERSONALITY_DIMENSIONS.map(dimension => {
      const firstChar = dimension[0]
      const lastChar = dimension[1]
      const firstCharScore = score[firstChar]
      const lastCharScore = score[lastChar]
      const shortCode = firstCharScore >= lastCharScore ? firstChar : lastChar
      const longCode = this.PERSONALITIES[shortCode]
      personality.shortCode.push(shortCode)
      personality.longCode.push(longCode)
    })
    return personality
  }

  async list() {
    const quiz = await this.QuizStore.find({})
    return quiz
  }

  async create(payload) {
    const Quiz = new this.QuizStore(payload)
    const quiz = await Quiz.save()
    return quiz._doc
  }

  async get(id) {
    const quiz = await this.QuizStore.findOne({ _id: id }).populate(
      'answers.question'
    )
    return quiz
  }

  async getResult(id) {
    const quiz = await this.QuizStore.findOne({ _id: id }).populate(
      'answers.question'
    )
    const answerList = quiz.answers
    const SCORE = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
    answerList.map(answer => {
      this.myersBriggsScore(SCORE, answer)
    })
    const personality = this.personalityScore(SCORE)
    return {
      shortCode: personality.shortCode.join(''),
      longCode: personality.longCode.join(' ')
    }
  }

  async update(id, payload) {
    const quiz = await this.QuizStore.findOneAndUpdate({ _id: id }, payload)
    return quiz._doc
  }

  async remove(id) {
    const quiz = await this.QuizStore.remove({ _id: id })
    return quiz._doc
  }
}
