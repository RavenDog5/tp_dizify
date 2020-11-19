import React, { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import AlbumService from '../lib/albumService'

export default function DialogUpdateAlbum({ open, handleClose, reload, album }) {
  const [name, setName] = useState('')
  const [image_album, setImage_Album] = useState('')
  const [year, setYear] = useState('') 
  const [artistId, setArtistId] = useState('')


  const updateAlbum = async () => {
    if (name === '' || year === '' || artistId === '') {
      return
    } else if (image_album === ''){
      setImage_Album(null)
    }
    
    await AlbumService.update({id: album.id, name: name, image_album: image_album, release_year: year})
    reload()
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Modifier un nouveau album</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" id="name" label="Nom" defaultValue={album.name} fullWidth onChange={(e) => setName(e.target.value)} required />
        <TextField margin="dense" id="image_album" label="Couverture" fullWidth defaultValue={album.image_album} onChange={(e) => setImage_Album(e.target.value)}/>
        <TextField
          margin="dense"
          id="year"
          label="Année de sortie"
          type="number"
          fullWidth
          defaultValue={album.release_year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          id="artistId"
          label="Artist ID"
          type="number"
          fullWidth
          defaultValue={album.artist_id}
          onChange={(e) => setArtistId(e.target.value)}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button variant="outlined" onClick={updateAlbum} color="primary">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  )
}