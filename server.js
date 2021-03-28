// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const cors = require("cors");


// const mongoose = require("mongoose");

// const playersRoutes = express.Router();
// const teamsRoutes = express.Router();

// const PORT = process.env.PORT || 4000;

// let Players = require("./esportspros.players.model");
// let Teams = require("./esportspros.teams.model");


// app.use(cors());
// app.use(bodyParser.json());

// mongoose.Promise = global.Promise;

// const connectDB = async () => {
//   await mongoose.connect(
//     "mongodb://127.0.0.1:27017/esportspros",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//     (err) => {
//       console.log(err);
//     }
//   );
//   console.log("Db connected");
// };

// connectDB();

// //End Points for Players
// playersRoutes.route("/").get(function (req, res) {
//   Players.find(function (err, players) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(players);
//     }
//   });
// });

// playersRoutes.route("/:id").get(function (req, res) {
//   let id = req.params.id;
//   Players.findById(id, function (err, players) {
//     res.json(players);
//   });
// });

// playersRoutes.route("/add").post(function (req, res) {
//   let player = new Players(req.body);
//   player
//     .save()
//     .then((player) => {
//       res.status(200).json({ player: "Player added successfully" });
//     })
//     .catch((err) => {
//       console.log(err)
//       res.status(400).send("Adding new player failed!", err);
//     });
// });

// playersRoutes.route("/update/:id").post(function (req, res) {
//   Players.findById(req.params.id, function (err, player) {
//     if (!player) res.status(404).send("data is not found");
//     else player.player_name = req.body.player_name;
//     player.player_position = req.body.player_position;
//     player.player_age = req.body.player_age;
//     player.player_team = req.body.player_team;
//     player.player_ep_rank = req.body.player_ep_rank;
//     player.player_in_game_rank = req.body.player_in_game_rank;
//     player.player_consistency_rating = req.body.player_consistency_rating;
//     player.player_risk = req.body.player_risk;

//     player
//       .save()
//       .then((player) => {
//         res.json("Player updated.");
//       })
//       .catch((err) => {
//         res.status(400).send("Update not possilbe");
//       });
//   });
// });

// playersRoutes.route("/delete/:id").delete(function (req, res) {
//   Players.findById(req.params.id)
//     .then((player) => player.remove().then(() => res.json({ success: true })))
//     .catch((err) => res.status(404).json({ success: false }));
// });

// //End Points for Teams
// teamsRoutes.route("/").get(function (req, res) {
//   Teams.find(function (err, teams) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(teams);
//     }
//   });
// });

// teamsRoutes.route("/:id").get(function (req, res) {
//   let id = req.params.id;
//   Teams.findById(id, function (err, teams) {
//     res.json(teams);
//   });
// });

// teamsRoutes.route("/add").post(function (req, res) {
//   let team = new Teams(req.body);
//   team
//     .save()
//     .then((team) => {
//       res.status(200).json({ team:  "Team added successfully" });
//     })
//     .catch((err) => {
//       console.log(err)
//       res.status(400).send("Adding new team failed!", err);
//     });
// });

// teamsRoutes.route("/update/:id").post(function (req, res) {
//   Teams.findById(req.params.id, function (err, team) {
//     if (!team) res.status(404).send("data is not found");
//     else team.team_name = req.body.team_name;
//     team.team_league_rank = req.body.team_league_rank;
//     team.team_ep_rank = req.body.team_ep_rank;
//     team.team_win_loss = req.body.team_win_loss;

//     team
//       .save()
//       .then((team) => {
//         res.json("Team updated.");
//       })
//       .catch((err) => {
//         res.status(400).send("Update not possilbe");
//       });
//   });
// });

// teamsRoutes.route("/delete/:id").delete(function (req, res) {
//   Teams.findById(req.params.id)
//     .then((team) => team.remove().then(() => res.json({ success: true })))
//     .catch((err) => res.status(404).json({ success: false }));
// });


// app.use("/Players", playersRoutes);
// app.use("/Teams", teamsRoutes);


// app.listen(PORT, function () {
//   console.log("Server is runnng on Port " + PORT);
// });




const express = require('express')
const app = express()
const mongoose = require('mongoose')
const playerRoutes = require("./routes/playerRoutes")
const teamsRoutes = require("./routes/teamRoutes")

const cors = require('cors')

app.use(cors())


const connectDB = async () => {
  await mongoose.connect( 
    // process.env.MONGODB_URI , 
    "mongodb://127.0.0.1:27017/esportspros",
    {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  console.log('db connected')
}

connectDB()

app.use(express.json({ extended: false }))
app.use("/players", playerRoutes)
app.use("/teams", teamsRoutes)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server started on port', PORT))