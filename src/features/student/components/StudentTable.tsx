import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { City, Student } from 'models';
import React from 'react';
import { capitalFirstLetter, getMarkColor } from '../../utils';

export interface StudentTableProps{
    studentList?: Student[],
    cityMap: {
      [key:string] : City
    }
    onEdit?: (student: Student) => void;
    onDelete?: (student: Student) => void;
}

const useStyles = makeStyles((theme) => ({
    table: {
        
    },
    btn: {
      margin: theme.spacing(0,1)
    },
    remove: {
      color: theme.palette.error.main,
      border: `1px solid ${theme.palette.error.light}`
    }
}));

export default function StudentTable({studentList,cityMap,onEdit,onDelete}: StudentTableProps) {
  const classes = useStyles();  
  const [open, setOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState<Student>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = (student: Student) => {
    // set selected student
    setSelectedStudent(student); 
    // show confirm dialog
    setOpen(true);
  }

  const handleDeleteConfirm = (student: Student) => {
    // call onDelete
    onDelete?.(student);
    // hide confirm dialog
    setOpen(false);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size='small' aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >#</TableCell>
              <TableCell >Name</TableCell>
              <TableCell >Gender</TableCell>
              <TableCell >Mark</TableCell>
              <TableCell >City</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList?.map((student, idx) => (
              <TableRow key={student.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{capitalFirstLetter(student.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(student.mark)} fontWeight='bold'>
                    {student.mark}
                  </Box>
                  {/* {student.mark} */}
                </TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="center">
                  <Box >
                    <Button variant='outlined' color='primary' className={classes.btn}
                      onClick={() => onEdit?.(student)}
                    >
                        Edit
                    </Button>
                    <Button variant='outlined' className={`${classes.btn} ${classes.remove}`}
                      onClick={() => handleDeleteClick(student)}
                    >
                        Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Confirm Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>Delete a student?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure delete student named "{selectedStudent?.name}". <br/>
            This action can not be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant='outlined'>
            Cancel
          </Button>
          <Button onClick={() => handleDeleteConfirm(selectedStudent as Student)} className={`${classes.remove}`} variant='outlined' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
