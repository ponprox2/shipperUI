import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
  TextField,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import { getShippingOrderAPI } from '../components/services/index';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'stt', label: 'STT', alignRight: false },
  { id: 'shopOrderID', label: 'shopOrderID', alignRight: false },
  { id: 'shopName ', label: 'shopName ', alignRight: false },
  { id: 'packageName', label: 'packageName', alignRight: false },
  { id: 'quantity', label: 'quantity', alignRight: false },
  { id: 'mass', label: 'mass (Kg)', alignRight: false },
  { id: 'unitPrice', label: 'unitPrice ', alignRight: false },
  { id: 'shippingFee ', label: 'shippingFee', alignRight: false },
  { id: 'totalPrice ', label: 'totalPrice  ', alignRight: false },
  { id: 'shippingFeePayment ', label: 'shippingFeePayment  ', alignRight: false },
  { id: 'deliveryAddress', label: 'deliveryAddress', alignRight: false },
];

// ----------------------------------------------------------------------

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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name?.toLowerCase()?.indexOf(query?.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function User() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [massInput, setMassInput] = useState(0);
  const [priceInput, setPriceInput] = useState(0);

  const [listProduct, setListProduct] = useState([]);

  const getShippingOrder = async (body) => {
    try {
      const res = await getShippingOrderAPI(body);
      if (res?.data) {
        setListProduct(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const body = {
      territoryID: '1',
      mass: massInput,
      totalPrice: priceInput,
    };
    getShippingOrder(body);
  }, [massInput, priceInput]);
  const handleChangeStatus = (id) => {
    const temp = listProduct.filter((e) => e.id === id);
    const tempArr = listProduct.filter((e) => e.id !== id);
    let temp1 = [];
    if (temp[0].status === true) {
      temp[0].status = false;
      temp1 = temp;
    } else {
      temp[0].status = true;
      temp1 = temp;
    }
    const temp2 = [...temp1, ...tempArr];
    temp2?.sort((a, b) => a.id - b.id);
    setListProduct(temp2);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listProduct?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
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

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listProduct?.length) : 0;

  const filteredUsers = applySortFilter(listProduct, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers?.length === 0;

  return (
    <Page title="Product">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Danh Sách Đơn Hàng Vận Chuyển
          </Typography>
        </Stack>

        <Card>
          <Box sx={{ marginLeft: '30px' }}>
            <Box sx={{ display: 'flex', marginBottom: '15px', alignItems: 'center', height: '56px' }}>
              <Typography textAlign="center">mass (Khối lượng(Kg)) : </Typography>
              <input
                style={{
                  width: '120px',
                  height: '25px',
                  marginLeft: '70px',
                  borderRadius: '25px',
                  padding: '5px',
                }}
                value={massInput}
                onChange={(e) => setMassInput(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography>totalPrice(Tổng tiền (VNĐ)) : </Typography>
              <input
                style={{
                  width: '120px',
                  height: '25px',
                  marginLeft: '35px',
                  borderRadius: '25px',
                  padding: '5px',
                }}
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
              />
            </Box>
          </Box>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listProduct?.length}
                  numSelected={selected?.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => {
                    const {
                      shopOrderID,
                      shopName,
                      packageName,
                      quantity,
                      mass,
                      unitPrice,
                      shippingFee,
                      totalPrice,
                      deliveryAddress,
                      shippingFeePayment,
                    } = row;

                    const isItemSelected = selected.indexOf(shopOrderID) !== -1;

                    return (
                      <TableRow
                        hover
                        key={shopOrderID}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, shopOrderID)} /> */}
                        </TableCell>

                        <TableCell align="left" onClick={() => navigate(`/dashboard/updateProduct?id=${shopOrderID}`)}>
                          {shopOrderID}
                        </TableCell>
                        <TableCell align="left">{shopName}</TableCell>
                        <TableCell align="left">{packageName}</TableCell>
                        <TableCell align="left">{quantity}</TableCell>
                        <TableCell align="left">{mass}</TableCell>
                        {/* <TableCell align="left" onClick={() => handleChangeStatus(id)}>
                          {status ? 'xuat' : 'nhap'}
                        </TableCell> */}
                        <TableCell align="left">{unitPrice}</TableCell>
                        <TableCell align="left">{shippingFee}</TableCell>
                        <TableCell align="left">{totalPrice}</TableCell>
                        <TableCell align="left">{shippingFeePayment}</TableCell>
                        <TableCell align="left">{deliveryAddress}</TableCell>
                        {/* <Button>123</Button> */}

                        {/* <TableCell align="right">
                          <UserMoreMenu id={id} />
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={listProduct?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
