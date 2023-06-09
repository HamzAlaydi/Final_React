import React, { useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/Loading'
import { useSelector } from 'react-redux';
import { useAdminTeachers } from '../../hooks/useAdminTeachers';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import {useNavigate} from 'react-router-dom'

export default function AdminTeachers() {
    const navigate = useNavigate()
    const {t} = useTranslation()
    const {token} = useSelector((state)=>state.admin)

    const columns = [
        { id: 'Name', label: t('name'), minWidth: 150 },
        { id: 'Email', label: t('email'), minWidth: 150 },
        { id: 'Gender', label: t('gender'), minWidth: 150 },
        { id: 'Phone', label: t('phone'), minWidth: 150 },
        // { id: 'View', label: t('view'), minWidth: 150 },
        { id: 'Actions', label: t('financialRecord'), minWidth: 150 }];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const {data,isLoading} = useAdminTeachers(token)

    return (
    <AdminLayout>
        <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"30px",
        marginTop:"20px"}}>
            <Typography sx={{fontSize:"20px",fontWeight:"500"}}>{t('teachers')}</Typography>
        </Box>
        {
        !isLoading?
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
                        {data?.data.length>0&&data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return <TableRow hover role="checkbox"  key={row.id+"demj"}>
                                <TableCell align='center'>
                                    {row.firstName + " " + row.lastName || ''}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.email}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.gender || ''}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.phone || ''}
                                </TableCell>
                                {/* <TableCell align='center'>
                                    <Button color="secondary">
                                        <VisibilityIcon/>
                                    </Button>
                                </TableCell> */}
                                <TableCell align='center'>
                                    <Button onClick={()=>navigate(`/admin/teacher/${row.id}/dues`)} sx={{minWidth:"10px"}}><LocalAtmIcon/></Button>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data?.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
        </Paper>
        :
        <Loading/>
        }
    </AdminLayout>
)
}