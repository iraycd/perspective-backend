import questionList from './Question.json'

export default async (questionStore, mongoose) => {
  const questionCount = await questionStore.estimatedDocumentCount()
  if (!questionCount) {
    questionStore.insertMany(questionList).then(function(docs) {
      console.log('Questions are created')
    })
  }
}
