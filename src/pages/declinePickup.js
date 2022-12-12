import { filter } from 'lodash';
import { useState, useEffect } from 'react';
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
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import SimpleDialog from './DetailOrderView';
// mock
import { updatePickupConfirmationAPI, pickupConfirmationAPI } from '../components/services/index';
import DialogApp from './Dialog';
import ConfirmDlg from './ConfirmDlg';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'shopOrderID', label: 'Mã đơn hàng', alignRight: false },
  { id: 'packageName', label: 'Tên món hàng', alignRight: false },
  { id: 'shopAddress', label: 'Địa chỉ cửa hàng', alignRight: false },
  { id: 'mass', label: 'Khối lượng (Kg)', alignRight: false },
  { id: 'totalPrice ', label: 'Tổng giá trị đơn hàng (VND)', alignRight: false },
  { id: 'statusDescription ', label: 'Trạng thái đơn hàng', alignRight: false },
  { id: 'confirmation ', label: 'Xác nhận', alignRight: false },
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  const [error1, setError1] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [massInput, setMassInput] = useState(0);
  const [priceInput, setPriceInput] = useState(0);
  const staffId = localStorage.getItem('staffID');
  const [reCall, setReCall] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [severity, setSeverity] = useState('');
  const [itemProp, setItemProp] = useState({});
  const [open, setOpen] = useState(false);

  const [listUser, setListUser] = useState([
    {
      shopOrderID: '',
      shopName: '',
      shopKeeperName: '',
      shopAddress: '',
      shopPhone: '',
      packageName: '',
      mass: '',
      quantity: '',
      unitPrice: '',
      totalPrice: '',
      deliveryAddress: '',
      confirmation: '',
  },
  ]);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [inputValues, setInputVals] = useState({});

  const handleOnConfirm = () => {
    // handleClickStatus(inputValues.confirmation, inputValues.shopOrderID);
    handleSave();
  }

  const getShippingOrderConfirm = async (body) => {
    try {
      const res = await pickupConfirmationAPI(body);
      console.log(res);
      setListUser(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmShippingOrder = async (body) => {
    try {
      const res = await updatePickupConfirmationAPI(body);
      if (res?.status === 200) {
        setOpenToast(true);
        setSeverity('success');
        setError1(res.data);
        setReCall(!reCall);
      }
    } catch (error) {
      setOpenToast(true);
      setSeverity('error');
      setError1(error?.response?.data);
    }
  };
  const handleSave = () => {
    // const body = listUser?.map((e) => ({
    //   shopOrderID: e?.shopOrderID,
    //   confirmation: e?.confirmation,
    //   shipperID: staffId,
    // }));

    const body = [{
      shopOrderID: inputValues.shopOrderID,
      confirmation: inputValues.inputConfirmation,
      shipperID: staffId,
    }]

    confirmShippingOrder(body);
  };

  useEffect(() => {
    const body = {
      shipperID: staffId,
      mass: massInput,
      totalPrice: priceInput,
    };
    getShippingOrderConfirm(body);
  }, [massInput, priceInput, reCall]);

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
  const handleClickStatus = (confirmation, id) => {
    const temp = listUser.filter((e) => e.shopOrderID === id);
    const tempArr = listUser.filter((e) => e.shopOrderID !== id);
    let temp1 = [];

    if (confirmation === '0') {
      temp[0].confirmation = '1';
    }
    if (confirmation === '1') {
      temp[0].confirmation = '0';
    }
    temp1 = temp;
    console.log(temp1[0]?.confirmation);
    const temp2 = [...temp1, ...tempArr];
    // temp2.sort((a, b) => a.shopOrderID - b.shopOrderID);
    setListUser(temp2);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listUser?.length) : 0;

  const filteredUsers = applySortFilter(listUser, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers?.length === 0;

  return (
    <Page title="Xác Nhận Đơn Lấy Hàng">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Xác Nhận Đơn Lấy Hàng
          </Typography>
          {/* <Button variant="contained" onClick={handleSave}>
            Lưu
          </Button> */}
        </Stack>
        {/* <Typography sx={{ color: 'red', marginBottom: '20px', fontSize: '20px' }}>{error1}</Typography> */}
        <Box>
            <Box sx={{ display: 'flex', marginBottom: '15px', alignItems: 'center', height: '56px' }}>
              <Typography textAlign="center">Khối lượng (kg)</Typography>
              <input
                style={{
                  width: '120px',
                  height: '25px',
                  marginLeft: '32px',
                  borderRadius: '25px',
                  padding: '5px',
                }}
                value={massInput}
                onChange={(e) => setMassInput(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', marginBottom: '25px' }}>
              <Typography>Tổng tiền (vnđ)</Typography>
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
        
        
        <Card>
          

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listUser?.length}
                  numSelected={selected?.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      shopOrderID,
                      shopName,
                      shopKeeperName,
                      shopAddress,
                      shopPhone,
                      packageName,
                      mass,
                      quantity,
                      unitPrice,
                      totalPrice,
                      deliveryAddress,
                      confirmation,
                      statusDescription,
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
                          {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} /> */}
                        </TableCell>
                        <TableCell align="left" onClick={() => {
                          setItemProp(row);
                          setOpen(true);
                        }}
                        >{shopOrderID}</TableCell>
                        <TableCell align="left" onClick={() => {
                          setItemProp(row);
                          setOpen(true);
                        }}
                        >{packageName}</TableCell>
                        <TableCell align="left" onClick={() => {
                          setItemProp(row);
                          setOpen(true);
                        }}
                        >{shopAddress}</TableCell>
                        <TableCell align="left" onClick={() => {
                          setItemProp(row);
                          setOpen(true);
                        }}
                        >{mass}</TableCell>
                        <TableCell align="left" onClick={() => {
                          setItemProp(row);
                          setOpen(true);
                        }}
                        >{totalPrice}</TableCell>
                        <TableCell align="left" onClick={() => {
                          setItemProp(row);
                          setOpen(true);
                        }}
                        >{statusDescription}</TableCell>
                        <TableCell>
                          {/* <Button
                            sx={{ marginTop: '20px' }}
                            variant={confirmation === '0' ? 'outlined' : 'contained'}
                            onClick={() => {
                              // handleClickStatus(confirmation, shopOrderID);
                              setInputVals({ shopOrderID, confirmation });
                              setOpenConfirm(true);
                            }
                            }
                          >
                            Hủy
                          </Button> */}
                            <FormControl style={{ marginTop: '10px' }}>
                              <Select
                                style={{ height: '30px' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={confirmation}
                                onChange={(e) => {
                                  const inputConfirmation = e.target?.value;
                                  setInputVals({ shopOrderID, inputConfirmation });
                                  setOpenConfirm(true);
                                }}
                              >
                                <MenuItem value={0}>Chưa</MenuItem>
                                <MenuItem value={1}>Nhận Đơn</MenuItem>
                                <MenuItem value={2}>Hủy Đơn</MenuItem>
                              </Select>
                            </FormControl>
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
            count={listUser?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <SimpleDialog open={open} itemProp={itemProp} onClose={() => setOpen(false)} />
      <DialogApp
        content={error1}
        type={0}
        isOpen={openToast}
        severity={severity}
        callback={() => {
          setOpenToast(false);
        }}
      />
      <ConfirmDlg
        title="Thông Báo"
        open={openConfirm}
        setOpen={setOpenConfirm}
        onConfirm={handleOnConfirm}
      >
        Bạn có chắc sẽ xác nhận đơn hàng này?
      </ConfirmDlg>
    </Page>
  );
}
