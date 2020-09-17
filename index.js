const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

let games = [
  {
    id: 1,
    player_won: true,
    monsters_won: false
  },
  {
    id: 2,
    player_won: false,
    monsters_won: true
  }
]

app.get('/', (request, response) => {
  response.send('Server running')
})

app.get('/api/games', (req, res) => {
  res.json(games)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})