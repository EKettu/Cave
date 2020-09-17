const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')

app.use(cors())
app.use(express.static(path.join(__dirname, 'cave-frontend/build')))

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/cave-frontend/build/index.html'))
})

app.get('/api/games', (req, res) => {
  res.json(games)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})