import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
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
  Divider,
} from '@mui/material';
// components
import axios from 'axios';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import TableProduct from './tableDetailProduct';
import DialogApp from './Dialog';
import ConfirmDlg from './ConfirmDlg';

const TABLE_HEAD = [
  { id: 'STT', label: 'STT', alignRight: false },
  { id: 'time', label: 'Mã shipper', alignRight: false },
  { id: 'staffName', label: 'Tên shipper', alignRight: false },
  { id: 'status', label: 'Xác nhận giao đơn', alignRight: false },
];

function StaffInfo() {
  // const { search } = useLocation();
  // const id = search.split('=')[1];
  // const navigate = useNavigate();

  // const [orderDetail, setOrderDetail] = useState({});

  // const [shipperName, setShipperName] = useState('');
  const account = JSON.parse(localStorage.getItem("accountData") || "[]");

  return (
    <>
      <Box>
        <Box style={{ margin: '20px 0px 50px 30px' }}> </Box>
        <Box style={{ width: '90%', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <Box width="90%">
            <h2 style={{ lineHeight: '30px' }}>Thông Tin Cá Nhân</h2>
            <Divider />
            <Box style={{ display: 'flex', marginBottom: '30px' }}> </Box>
            {
              account?.staffID !== undefined &&
              <Typography style={{ lineHeight: '30px' }}>Mã nhân viên : {account?.staffID}</Typography>
            }
            {
              account?.citizenID !== undefined &&
              <Typography style={{ lineHeight: '30px' }}>CMND/CCCD : {account?.citizenID}</Typography>
            }
            {
              account?.name !== undefined &&
              <Typography style={{ lineHeight: '30px' }}>Họ và tên : {account?.name}</Typography>
            }
            {
              account?.gender !== undefined &&
              <Typography style={{ lineHeight: '30px' }}>Giới tính : {account?.gender}</Typography>
            }
            {
              account?.phone !== undefined &&
              <Typography style={{ lineHeight: '30px' }}>SĐT : {account?.phone}</Typography>
            }
            {
              account?.email !== undefined &&
              <Typography style={{ lineHeight: '30px' }}>Email : {account?.email}</Typography>
            }
            {
              account?.address !== undefined &&
              <Typography style={{ lineHeight: '30px' }}>Địa chỉ cư trú : {account?.address}</Typography>
            }
            {
              account?.workingTerritory !== undefined &&
              <Typography style={{ lineHeight: '30px' }}>Khu vực vận chuyển: {account?.workingTerritory}</Typography>
            }
          </Box>
        </Box>
        {/* <Box sx={{ display: 'flex', margin: '80px 0 0 100px' }}>
          <Typography>Tên shipper : </Typography>
          <input
            style={{
              width: '120px',
              height: '25px',
              marginLeft: '65px',
              borderRadius: '25px',
              padding: '5px',
            }}
            value={shipperName}
            onChange={(e) => setShipperName(e.target.value)}
          />
        </Box>
        <Box
          style={{
            width: '80%',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-evenly',
            marginTop: '50px',
          }}
        >
        </Box> */}
      </Box>
    </>
  );
}

export default StaffInfo;
