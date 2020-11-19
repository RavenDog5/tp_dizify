import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Fab, IconButton, Snackbar } from '@material-ui/core'
import { Card, CardContent, CardMedia, Typography, Grid, makeStyles, Avatar} from '@material-ui/core'
import { Add, Delete, Edit } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert'
import { useParams } from "react-router-dom";

import Title from '../components/Title'
import DialogAddArtist from '../Artists/DialogAddArtist'
import DialogDeleteAlbum from './DialogDeleteAlbum'
import DialogUpdateAlbum from './DialogUpdateAlbum'
import albumService from '../lib/albumService'
import artistService from '../lib/artistService'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    padding: theme.spacing(2)
  },
  card: {
    height: 200,
    width: 150
  },
  avatar: {
    'margin-left': 'auto',
    'margin-right': 'auto',
    'margin-top': '5px',
    color: theme.palette.getContrastText('#42ab9e'),
    backgroundColor: '#42ab9e',
    width: 80,
    height: 80
  }
}));

export default function Artist_Albums() {
  const [loading, setLoading] = useState(true)
  const [albums, setAlbums] = useState([])
  const [artist, setArtist] = useState({})
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [albumDeleted, setAlbumDeleted] = useState({})
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [albumUpdate, setAlbumUpdate] = useState({})
  const [openAlert, setOpenAlert] = useState(false)
  const classes = useStyles();
  const isAdmin = false;
  let { id } = useParams();

  useEffect(() => { 
    init()
  }, [])

  const init = async () => {
    try {
      let albums = [];
      let artist = []
      albums = await albumService.getAll();
      console.log(id)
      artist = await artistService.getOne(id);
      console.log(albums)
      setAlbums(albums)
      setArtist(artist)
      setTimeout(function () {
        setLoading(false)
      }, 1500)
    } catch (error) {
      setLoading(false)
      setOpenAlert(true)
    }
  }
  
  return (-
    <>
      <Title>{artist.alias}</Title>
      {artist.image_alias != null &&
        <CardMedia
          image={artist.image_alias}
          title={artist.alias}
        />
      }
      {artist.image_alias == null &&
        <Avatar className={classes.avatar}>{artist.alias.substring(0,1)}</Avatar>
      }
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          className={classes.root}
        >
          {albums.map((album) => (
            <Grid item xs={12} sm={6} md={3} key={albums.indexOf(album)}>
              <Card className={classes.card} key={album.name}>
                {album.image_album != null &&
                  <CardMedia
                    image={album.image_album}
                    title={album.name}
                  />
                }
                {album.image_album == null &&
                  <Avatar className={classes.avatar}>{album.name.substring(0,1)}</Avatar>
                }
                <div>
                  <CardContent>
                    <Typography>
                      {album.name}
                    </Typography>
                  </CardContent>
                  {isAdmin != false && 
                    <div>
                      <IconButton aria-label="Modifier un artiste" onClick={() => {
                        setAlbumUpdate(album)
                        setOpenUpdateDialog(true)
                        }}>
                        <Edit />
                      </IconButton>
                      <IconButton aria-label="Supprimer un artiste" onClick={() => {
                        setAlbumDeleted(album)
                        setOpenDeleteDialog(true)
                        }}>
                        <Delete />
                      </IconButton>
                    </div>
                  }
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Box display="flex" alignItems="center" justifyContent="center" style={{ height: '100%' }}>
        <Fab color="primary" aria-label="add" onClick={() => setOpenAddDialog(true)}>
          <Add />
        </Fab>
      </Box>
      {/* Add */}
      {openAddDialog && (
        <DialogAddArtist
          open={openAddDialog}
          handleClose={() => setOpenAddDialog(false)}
          reload={() => {
            setOpenAddDialog(false)
            init()
          }}
        />
      )}
      {/* Update */}
      {openUpdateDialog && (
        <DialogUpdateAlbum
          open={openUpdateDialog}
          album={albumUpdate}
          handleClose={() => setOpenUpdateDialog(false)}
          reload={() => {
            setOpenUpdateDialog(false)
            init()
          }}
        />
      )}
      {/* Delete */}
      {openDeleteDialog && (
        <DialogDeleteAlbum
          open={openDeleteDialog}
          album={albumDeleted}
          handleClose={() => setOpenDeleteDialog(false)}
          reload={() => {
            setOpenDeleteDialog(false)
            init()
          }}
        />
      )}
      <Snackbar open={openAlert} autoHideDuration={5000} onClose={() => setOpenAlert(false)}>
        <Alert onClose={() => setOpenAlert(false)} severity="error">
          Une erreur réseau est survenue
        </Alert>
      </Snackbar>
    </>
  )
}