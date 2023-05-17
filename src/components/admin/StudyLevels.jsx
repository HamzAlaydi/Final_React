import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Dialog } from '@mui/material';
import {useLevels} from '../../hooks/useLevels'
import Loading from '../../components/Loading'
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import UpdateStudyLevel from './UpdateStudyLevel';

export default function StudyLevels() {
    const {t} = useTranslation()
    const columns = [
    { id: 'name_course', label:t('titleAr'), minWidth: 150 },
    { id: 'name_subject', label:t('titleEn'), minWidth: 150 },
    { id: 'update', label:t('update'), minWidth: 150 }];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const {data,isLoading} = useLevels()
    const [levels,setLevels] = useState([])
    
    useEffect(()=>
    {
        if(data)
        {
            setLevels(data?.data)
        }
    },[data])

    /** handle open dialog */
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
    <Box>
        {!isLoading?
        <Paper sx={{ width: '100%',padding:"20px"}}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={"center"}
                            style={{ top: 57, minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    <TableBody>
                        {levels?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return <TableRow hover role="checkbox"  key={row.id+"demj"}>
                                <TableCell align='center'>
                                    {row.titleAR}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.titleEN}
                                </TableCell>
                                <TableCell align='center'>
                                    <Button onClick={()=>setOpen(row.id)}>
                                        <EditIcon/>
                                    </Button>
                                    <Dialog open={open===row.id} onClose={handleClose}>
                                        <UpdateStudyLevel setLevels={setLevels} level={row} handleClose={handleClose}/>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={levels.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
        </Paper>
        :
        <Loading/>
        }
    </Box>
)
}