
const express = require('express');
const mongoose = require('mongoose');
const Players = require('../models/playerModel');
const playersRoutes = express.Router();



//End Points for Players
playersRoutes.route("/").get(function (req, res) {
  Players.find(function (err, players) {
    if (err) {
      console.log(err);
    } else {
      res.json(players);
    }
  });
});

playersRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Players.findById(id, function (err, players) {
    res.json(players);
  });
});

playersRoutes.route("/add").post(function (req, res) {
  let player = new Players(req.body);
  player
    .save()
    .then((player) => {
      res.status(200).json({ "Player added successfully": player });
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send("Adding new player failed!", err);
    });
});

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

playersRoutes.route("/delete/:id").delete(function (req, res) {
  Players.findById(req.params.id)
    .then((player) => player.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});


module.exports = playersRoutes;