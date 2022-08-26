import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Box,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import { getShippingOrderDeliveryAPI, shippingOrderDeliveryAPI } from '../components/services/index';
import SimpleDialog from './DetailOrderView';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'shopOrderID', label: 'shopOrderID', alignRight: false },
  { id: 'shopName', label: 'shopName', alignRight: false },
  { id: 'packageName', label: 'packageName', alignRight: false },
  { id: 'deliveryAddress', label: 'deliveryAddress', alignRight: false },
  { id: 'consigneeName', label: 'consigneeName', alignRight: false },
  { id: 'consigneePhone ', label: 'consigneePhone ', alignRight: false },
  { id: 'consigneeNote ', label: 'consigneeNote ', alignRight: false },
  { id: 'deliveryStatus ', label: 'deliveryStatus ', alignRight: false },
];
// shopOrderID: '11',
// shopName: 'MITOMO ELECTRONIC',
// packageName: 'Máy chơi game xịn',
// quantity: '4',
// mass: '0.6',
// unitPrice: '50000',
// shippingFee: '16200',
// totalPrice: '216200',
// deliveryAddress: '103 Man Thiện, Phường Hiệp Phú, Thành Phố Thủ Đức',
// shippingFeePayment: '0',
// fullPayment: '0',

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
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [statusAll, setStatusAll] = useState(0);
  const [open, setOpen] = useState(false);
  const [itemProp, setItemProp] = useState({});
  const staffId = localStorage.getItem('staffID');

  const [listUser, setListUser] = useState([]);
  // const [age, setAge] = useState('');
  const getShippingOrderDelivery = async (body) => {
    try {
      const res = await getShippingOrderDeliveryAPI(body);
      if (res?.data) {
        setListUser(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const shippingOrderDelivery = async (body) => {
    try {
      const res = await shippingOrderDeliveryAPI(body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const body = {
      shipperID: staffId,
      status: statusAll,
    };
    getShippingOrderDelivery(body);
  }, [statusAll]);

  const handleSave = () => {
    const body = listUser?.map((e) => ({
      shopOrderID: e?.shopOrderID,
      deliveryStatus: e?.deliveryStatus,
      shipperID: staffId,
    }));
    shippingOrderDelivery(body);
  };

  const handleChange = (event, id) => {
    const temp = listUser.filter((e) => e.id === id);
    const tempArr = listUser.filter((e) => e.id !== id);
    let temp1 = [];
    temp[0].paymentStatus = event.target.value;
    temp1 = temp;
    const temp2 = [...temp1, ...tempArr];
    temp2.sort((a, b) => a.id - b.id);
    setListUser(temp2);
  };

  const handleChangeDeliveryStatus = (event, id) => {
    const temp = listUser.filter((e) => e.shopOrderID === id);
    const tempArr = listUser.filter((e) => e.shopOrderID !== id);
    let temp1 = [];
    temp[0].deliveryStatus = event.target.value;
    temp1 = temp;
    const temp2 = [...temp1, ...tempArr];
    temp2.sort((a, b) => a.shopOrderID - b.shopOrderID);
    setListUser(temp2);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listUser.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const handleChangeStatus = (id) => {
    const temp = listUser.filter((e) => e.shopOrderID === id);
    const tempArr = listUser.filter((e) => e.shopOrderID !== id);
    let temp1 = [];
    if (temp[0].paymentStatus === true) {
      temp[0].paymentStatus = false;
      temp1 = temp;
    } else {
      temp[0].paymentStatus = true;
      temp1 = temp;
    }
    const temp2 = [...temp1, ...tempArr];
    temp2.sort((a, b) => a.shopOrderID - b.shopOrderID);
    setListUser(temp2);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listUser.length) : 0;

  const filteredUsers = applySortFilter(listUser, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Xác Nhận Trạng Thái Giao Hàng
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleSave}
          >
            Lưu
          </Button>
        </Stack>

        <Card>
          <TableCell>
            <FormControl style={{ marginTop: '10px' }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={statusAll}
                onChange={(e) => setStatusAll(e?.target?.value)}
              >
                <MenuItem value={0}>Tất cả</MenuItem>
                <MenuItem value={1}>Đang giao</MenuItem>
                <MenuItem value={2}>Thành công</MenuItem>
                <MenuItem value={3}>Thất bại</MenuItem>
              </Select>
            </FormControl>
          </TableCell>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listUser.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      shopOrderID,
                      shopName,
                      packageName,
                      deliveryAddress,
                      consigneeName,
                      consigneePhone,
                      consignneNote,
                      deliveryStatus,
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
                        onClick={() => {
                          setItemProp(row);
                          setOpen(true);
                        }}
                      >
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} /> */}
                        </TableCell>

                        <TableCell align="left">{shopOrderID}</TableCell>
                        <TableCell align="left">{shopName}</TableCell>
                        <TableCell align="left">{packageName}</TableCell>
                        <TableCell align="left">{deliveryAddress}</TableCell>
                        <TableCell align="left">{consigneeName}</TableCell>
                        <TableCell align="left">{consigneePhone}</TableCell>
                        <Typography
                          align="left"
                          sx={{ maxHeight: '100px', overflow: 'hidden', margin: '16px', textOverflow: 'ellipsis' }}
                        >
                          {consignneNote}
                        </Typography>

                        <TableCell>
                          <FormControl style={{ marginTop: '10px' }}>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={deliveryStatus}
                              onChange={(e) => handleChangeDeliveryStatus(e, shopOrderID)}
                            >
                              <MenuItem value={0}>Chưa giao</MenuItem>
                              <MenuItem value={1}>Giao thành công</MenuItem>
                              <MenuItem value={2}>Giao thất bại</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>

                        <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell>
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
            count={listUser.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <SimpleDialog open={open} itemProp={itemProp} onClose={() => setOpen(false)} />
    </Page>
  );
}
