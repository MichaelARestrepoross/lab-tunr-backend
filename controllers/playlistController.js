const express = require("express");

const playlists = express.Router();

const { 
  getAllPlaylists, 
  getPlaylist, 
  getSongsForPlaylist,
  createPlaylist,
  deletePlaylist,
  updatePlaylist,
} = require('../queries/playlists');

const {
  checkName
} = require("../validations/checkSongs");

const { getAllSongs } = require("../queries/songs");


// Get all playlists
playlists.get("/", async (req, res) => {
  try {
    const allPlaylists = await getAllPlaylists();
    res.status(200).json(allPlaylists);
  } catch (error) {
    console.error("Error fetching all playlists:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific playlist by ID
// playlists.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const playlist = await getPlaylist(id);
//     if (playlist) {
//       res.json(playlist);
//     } else {
//       res.status(404).json({ error: `Playlist with ID ${id} not found` });
//     }
//   } catch (error) {
//     console.error("Error fetching playlist:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// INDEX for a specific playlist
playlists.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const playlist = await getPlaylist(id);
    const songs = await getSongsForPlaylist(id);

    if (playlist && songs.length > 0) {
      res.status(200).json({ ...playlist, songs });
    } else {
      res.status(404).json({ error: "Playlist not found or no songs found for this playlist" });
    }
  } catch (error) {
    console.error("Error fetching playlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new playlist
playlists.post("/", checkName, async (req, res) => {
  try {
    const playlist = await createPlaylist(req.body);
    res.status(201).json(playlist);
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(400).json({ error: "Bad Request" });
  }
});


// Delete a playlist by ID
playlists.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPlaylist = await deletePlaylist(id);
    res.status(200).json(deletedPlaylist);
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(404).json({ error: `Playlist with ID ${id} not found` });
  }
});

module.exports = playlists;
