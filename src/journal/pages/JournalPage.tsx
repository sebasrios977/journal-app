import { IconButton } from "@mui/material"
import JournalLayout from "../layout/JournalLayout"
import NoteView from "../views/NoteView"
import NothingSelectedView from "../views/NothingSelectedView"
import { AddOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"
import { RootState } from "../../store/store"

const JournalPage = () => {

  const dispatch = useDispatch();
  const {isSaving, active} = useSelector((state: RootState) => state.journal);

  const onClickNewNote = () => {
    dispatch<any>(startNewNote());
  }
  
  return (
    <JournalLayout>

      {!!active ? <NoteView /> : <NothingSelectedView />}
      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        size='large'
        sx={{
          color: 'white', 
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined />
      </IconButton>
      
    </JournalLayout>
  )
}

export default JournalPage
