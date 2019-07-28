export default function createQuizStore(mongoose) {
  const { Schema } = mongoose
  const Quiz = new Schema({
    email: {
      type: String
    },
    answers: [
      {
        answer: {
          type: Number,
          required: true,
          validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
          }
        },
        question: {
          type: Schema.Types.ObjectId,
          ref: 'Question'
        }
      }
    ]
  })
  return mongoose.model('Quiz', Quiz)
}
