export default function createQuestionStore(mongoose) {
  const { Schema } = mongoose
  const Question = new Schema({
    question: {
      type: String,
      required: 'Question is required'
    },
    dimension: {
      type: String,
      required: 'Dimension is required',
      enum: ['EI', 'SN', 'TF', 'JP']
    },
    direction: {
      type: Boolean,
      required: 'Direction is required'
    }
  })
  return mongoose.model('Question', Question)
}
