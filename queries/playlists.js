const db = require('../db/dbConfig.js')

const getAllPlaylists = async () => {
    try {
      const allPlaylists = await db.any('SELECT * FROM playlists');
      return allPlaylists;
    }catch(error) {
      return error;
    }
  }
  const getPlaylist = async (id) => {
    try {
      const playlist = await db.one('SELECT * FROM playlists WHERE id=$1', id);
      return playlist;
    } catch (error) {
      console.error(`Error getting playlist with ID ${id}:`, error);
      throw error;
    }
  };

  const getSongsForPlaylist = async (playlistId) => {
    try {
      const songs = await db.any('SELECT * FROM songs WHERE playlist_id = $1', playlistId);
      return songs;
    } catch (error) {
      console.error(`Error getting songs for playlist with ID ${playlistId}:`, error);
      throw error;
    }
  };
  
  const createPlaylist = async (playlistData) => {
    const { name } = playlistData;
    try {
      const newPlaylist = await db.one('INSERT INTO playlists (name) VALUES ($1) RETURNING *', name);
      return newPlaylist;
    } catch (error) {
      console.error("Error creating playlist:", error);
      throw error;
    }
  };
  
  const updatePlaylist = async (id, playlistData) => {
    const { name } = playlistData;
    try {
      const updatedPlaylist = await db.one('UPDATE playlists SET name=$1 WHERE id=$2 RETURNING *', [name, id]);
      return updatedPlaylist;
    } catch (error) {
      console.error(`Error updating playlist with ID ${id}:`, error);
      throw error;
    }
  };
  
  const deletePlaylist = async (id) => {
    try {
      const deletedPlaylist = await db.one('DELETE FROM playlists WHERE id=$1 RETURNING *', id);
      return deletedPlaylist;
    } catch (error) {
      console.error(`Error deleting playlist with ID ${id}:`, error);
      throw error;
    }
  };
  
  module.exports = {
    getAllPlaylists,
    getPlaylist,
    getSongsForPlaylist,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
  };