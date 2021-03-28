const express = require('express');
const mongoose = require('mongoose');
const Teams = require('../models/teamModel');
const teamsRoutes = express.Router();




//End Points for Teams
teamsRoutes.route("/").get(function (req, res) {
  Teams.find(function (err, teams) {
    if (err) {
      console.log(err);
    } else {
      res.json(teams);
    }
  });
});

teamsRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Teams.findById(id, function (err, teams) {
    res.json(teams);
  });
});

teamsRoutes.route("/add").post(function (req, res) {
  let team = new Teams(req.body);
  team
    .save()
    .then((team) => {
      res.status(200).json({ team:  "Team added successfully" });
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send("Adding new team failed!", err);
    });
});

teamsRoutes.route("/update/:id").post(function (req, res) {
  Teams.findById(req.params.id, function (err, team) {
    if (!team) res.status(404).send("data is not found");
    else team.team_name = req.body.team_name;
    team.team_league_rank = req.body.team_league_rank;
    team.team_ep_rank = req.body.team_ep_rank;
    team.team_win_loss = req.body.team_win_loss;

    team
      .save()
      .then((team) => {
        res.json("Team updated.");
      })
      .catch((err) => {
        res.status(400).send("Update not possilbe");
      });
  });
});

teamsRoutes.route("/delete/:id").delete(function (req, res) {
  Teams.findById(req.params.id)
    .then((team) => team.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});


module.exports = teamsRoutes;