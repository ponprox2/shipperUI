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
import { updateShipperWorkAPI, getTerritoryAPI, getRegionAPI,staffInfoAPI } from '../components/services/index';
import SimpleDialog from './DetailOrderView';
import DialogApp from './Dialog';
import ConfirmDlg from './ConfirmDlg';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'regionID ', label: 'Mã phường/xã', alignRight: false },
  { id: 'description ', label: 'Phường/xã vận chuyển', alignRight: false },
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

  const accountData = JSON.parse(localStorage.getItem("accountData") || "[]");
  let defaultWorkingTerritoryID = 1;
  
  if(accountData.workingTerritoryID !== undefined){
    defaultWorkingTerritoryID = accountData.workingTerritoryID;
  }

  const [statusAll, setStatusAll] = useState(defaultWorkingTerritoryID);


  const [error1, setError1] = useState('');
  const [open, setOpen] = useState(false);
  const staffID = localStorage.getItem('staffID');

  const [itemProp, setItemProp] = useState({});

  const [listUser, setListUser] = useState([]);
  const [listRegion, setListRegion] = useState([]);
  const [reCall, setReCall] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [severity, setSeverity] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOnConfirm = () => {
		handleSave();
  };

  // const [age, setAge] = useState('');
  const getTerritory = async () => {
    try {
      const res = await getTerritoryAPI();
      if (res?.data) {
        setListRegion(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRegion = async (id) => {
    try {
      const res = await getRegionAPI(id);

      const tempFilter = res?.data?.filter((e) => e?.regionID !== '0');
      setListUser(tempFilter);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTerritory();
  }, []);
  useEffect(() => {
    getRegion(statusAll);
  }, [statusAll]);

  const setLocalAccountData = async () => {
    const body = {
      staffID,
    };
    const res = await staffInfoAPI(body);
    res.data.photoURL = '/static/mock-images/avatars/avatar_default.png';
    
    localStorage.setItem("accountData", JSON.stringify(res?.data));
  }

  const handleSave = async () => {
    const body = {
      shipperID: staffID,
      workTerritoryID: statusAll,
    };
    try {
      const res = await updateShipperWorkAPI(body);
      if (res?.status === 200) {
        await setLocalAccountData();

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
    <Page title="Đăng Ký Khu Vực Vận Chuyển">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Đăng Ký Khu Vực Vận Chuyển
          </Typography>
          <Button variant="contained" 
          onClick={ () => {
            setOpenConfirm(true);
          }
            
          }
          >
            Lưu
          </Button>
        </Stack>
        {/* <Typography sx={{ color: 'red', marginBottom: '20px', fontSize: '20px' }}>{error1}</Typography> */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <Box>Khu vực vận chuyển</Box>
          <FormControl style={{ marginTop: '-5px' }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={statusAll}
              style={{ height: '30px', marginLeft: '20px' }}
              onChange={(e) => setStatusAll(e?.target?.value)}
            >
              {listRegion?.map((e) => (
                <MenuItem value={e?.territoryID}>{e?.description}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Card>
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
                    const { description, regionID } = row;

                    const isItemSelected = selected.indexOf(regionID) !== -1;

                    return (
                      <TableRow
                        hover
                        key={regionID}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        // onClick={() => {
                        //   setItemProp(row);
                        //   setOpen(true);
                        // }}
                      >
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} /> */}
                        </TableCell>

                        <TableCell align="left">{regionID === '0' ? null : description}</TableCell>
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
        Bạn có chắc sẽ đăng ký khu vực vận chuyển này?
      </ConfirmDlg>
    </Page>
  );
}
