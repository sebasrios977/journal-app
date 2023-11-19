import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"

const SidebarItem = ({note}: any) => {
    const dispatch = useDispatch();
    const newTitle = useMemo(() => {
        return note.title.length > 17 ? note.title.substring(0,17) + '...' : note.title;
    }, [note.title]);


    const activeNote = () => {
        dispatch<any>(setActiveNote(note))
    }

  return (
    <ListItem onClick={activeNote} disablePadding>
        <ListItemButton>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>

            <Grid container>
                <ListItemText primary={newTitle} />
                <ListItemText secondary={note.body} />
            </Grid>
        </ListItemButton>
        </ListItem>
  )
}

export default SidebarItem
