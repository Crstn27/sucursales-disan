// import { Paper } from '@mui/material';
// import React from 'react'

// export const DataTable = () => {
//   return ()
// }







import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { AddCircle, Edit } from '@mui/icons-material';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';
import { useBranchesStore } from '../hooks/useBranchesStore';
import { Avatar } from '@mui/material';
import { getEnvVariables } from '../helpers';
import { useDispatch } from 'react-redux';
import { onToggleForm, toggleSelectBranch } from '../store';
import Swal from 'sweetalert2';

function createData(id, name, calories, fat, carbs, protein) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData(0, 'Cupcake', 305, 3.7, 67, 4.3),
  createData(2, 'Donut', 452, 25.0, 51, 4.9),
  createData(3, 'Eclair', 262, 16.0, 24, 6.0),
  createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
  createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
  createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
  createData(9, 'KitKat', 518, 26.0, 65, 7.0),
  createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
  createData(11, 'Marshmallow', 318, 0, 81, 2.0),
  createData(12, 'Nougat', 360, 19.0, 9, 37.0),
  createData(13, 'Oreo', 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// const headCells = [
//   {
//     id: 'name',
//     numeric: false,
//     disablePadding: true,
//     label: 'Dessert (100g serving)',
//   },
//   {
//     id: 'calories',
//     numeric: true,
//     disablePadding: false,
//     label: 'Calories',
//   },
//   {
//     id: 'fat',
//     numeric: true,
//     disablePadding: false,
//     label: 'Fat (g)',
//   },
//   {
//     id: 'carbs',
//     numeric: true,
//     disablePadding: false,
//     label: 'Carbs (g)',
//   },
//   {
//     id: 'protein',
//     numeric: true,
//     disablePadding: false,
//     label: 'Protein (g)',
//   },
// ];

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, onRequestSort, dataHeadCells } =
    props;
  const createSortHandler = (property) => (event) => {
    if (numSelected > 0) return;
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell 
          align={'right'}
          padding={'normal'}
        >
          N°
        </TableCell>
        {dataHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  dataHeadCells: PropTypes.array.isRequired
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  const dispatch = useDispatch();
  const {status} = useAuthStore();
  const {selectedBranch, deleteBranch} = useBranchesStore();

  const confirmDeleteBranch = ()=>{
    Swal.fire({
      title: `¿Esta seguro de eliminar la sucursal, "${selectedBranch.nombre}"?`,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBranch(selectedBranch.id);
      }
    });
  }

  const openFormEdit = ()=>{
    dispatch(onToggleForm('edit'))
  }

  const openFormCreate = ()=>{
    dispatch(onToggleForm('create'))
  }

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          bgcolor:'primary.main',
          color: 'primary.contrastText',
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main),
        },
      ]}
      
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Sucursales
      </Typography>
      {
        status === 'authenticated' &&
        (( selectedBranch ) ? (
          <>
            <Tooltip title="Eliminar">
              <IconButton onClick={confirmDeleteBranch}>
                <DeleteIcon sx={{ color: 'primary.contrastText' }}/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar">
            <IconButton onClick={openFormEdit}>
              <Edit sx={{ color: 'primary.contrastText' }}/>
            </IconButton>
            </Tooltip>
          </>
        ) : (
          <Tooltip title="Crear nuevo">
            <IconButton onClick={openFormCreate}>
              <AddCircle sx={{ color: 'primary.contrastText' }}/>
            </IconButton>
          </Tooltip>
        ))
      }
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dataHeadCells, setDataHeadCells] = React.useState([])
  const [loadedBranches, setLoadedBranches] = React.useState([]);
  const {status} = useAuthStore();
  const { branches, getAllBranches } = useBranchesStore();
  const dispatch = useDispatch();

  const { VITE_STORAGE_URL } = getEnvVariables();

  useEffect(() => {
    getAllBranches();
  
  }, [])

  useEffect(() => {
    if (branches.length > 0) {
      const dataHead = Object.keys(branches[0]).filter((key) => {
        if (key !== 'id' && typeof branches[0][key] === 'string') {
          return true;
        }
        return false;
      }).map((key) => ({
        id: key,
        numeric: false,
        disablePadding: false,
        label: key.toUpperCase(),
      }));

      setDataHeadCells(dataHead);
      setLoadedBranches(branches);
      setSelected([]);
    }
  }, [branches]);

  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = branches.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    if(status !== 'authenticated') return;

    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    
    if (selected.length === 1) {
      if (selected[0] === id) {
        setSelected(newSelected);
        dispatch(toggleSelectBranch(null));
      }
      return;
    };

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      const dataSelectedBranch = branches.find((branch)=>branch.id === id);
      dispatch(toggleSelectBranch(dataSelectedBranch));
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - branches.length) : 0;

  const visibleRows = React.useMemo(
    () =>{
      if (loadedBranches.length === 0) return [];
      return [...loadedBranches]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    },[order, orderBy, page, rowsPerPage, loadedBranches],
  );

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Paper sx={{ width: '100%', overflow: 'hidden', maxHeight: '100%', display: 'flex', flexDirection: 'column'}}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750}}
            aria-labelledby="tableTitle"
            size={'medium'}
            stickyHeader
            aria-label="sticky table"
            
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={branches.length}
              dataHeadCells={dataHeadCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover = { selected.length === 0 && status === 'authenticated' }
                    onClick={(event) => handleClick(event, row.id)}
                    // role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={((selected.length === 0 || isItemSelected) && status === 'authenticated')  && { cursor: 'pointer' }}
                  >
                    <TableCell align="center">{++index}</TableCell>

                    {dataHeadCells.map((headcell) => {
                      return (
                        <Tooltip 
                          title={(headcell.id === 'imagen') ? row.nombre : row[headcell.id]} 
                          key={`${headcell.id}-${row.id}`}
                        >
                          <TableCell
                            key={`${headcell.id}-${row.id}`}
                            component="th"
                            id={`${headcell.id}-${row.id}`}
                            scope="row"
                            padding="none"
                            align='left'
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: '350px',
                              minWidth:'200px' 
                            }}
                          >
                            {(headcell.id === 'imagen')
                              ? <Avatar
                                  alt={`imagen de sucursal ${row.nombre}`}
                                  src={`${VITE_STORAGE_URL}/${row.imagen}`}
                                  sx={{ width: 35, height: 35 }}
                                />
                              : row[headcell.id]
                            }
                          </TableCell>

                        </Tooltip>
                      )
                    })}
                    
                    {/* <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell> */}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={branches.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{minHeight: 'fit-content'}}
        />
      </Paper>
    </Box>
  );
}
