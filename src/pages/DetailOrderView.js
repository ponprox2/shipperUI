import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';

import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open, itemProp } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const renderStatus = (status) => {
    switch (status) {
      case 0: {
        return 'Đang giao';
      }
      case 1: {
        return 'Giao thành công';
      }
      default:
        return 'Giao thất bại';
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Chi tiết đơn hàng</DialogTitle>

      <Box style={{ padding: '20px' }}>
        <Box style={{ display: 'flex', marginBottom: '10px' }}>
          <Typography>shopOrderID : </Typography>
          <Typography style={{ marginLeft: '50px' }}>{itemProp?.shopOrderID}</Typography>
        </Box>
        <Box style={{ display: 'flex', marginBottom: '10px' }}>
          <Typography>shopName : </Typography>
          <Typography style={{ marginLeft: '60px' }}>{itemProp?.shopName}</Typography>
        </Box>
        <Box style={{ display: 'flex', marginBottom: '10px' }}>
          <Typography>packageName : </Typography>
          <Typography style={{ marginLeft: '33px' }}>{itemProp?.packageName}</Typography>
        </Box>
        <Box style={{ display: 'flex', marginBottom: '10px' }}>
          <Typography>deliveryAddress : </Typography>
          <Typography style={{ marginLeft: '20px' }}>{itemProp?.deliveryAddress}</Typography>
        </Box>
        <Box style={{ display: 'flex', marginBottom: '10px' }}>
          <Typography>consigneeName : </Typography>
          <Typography style={{ marginLeft: '20px' }}>{itemProp?.consigneeName}</Typography>
        </Box>
        <Box style={{ display: 'flex', marginBottom: '10px' }}>
          <Typography>consigneePhone : </Typography>
          <Typography style={{ marginLeft: '20px' }}>{itemProp?.consigneePhone}</Typography>
        </Box>
        <Box style={{ display: 'flex', marginBottom: '10px' }}>
          <Typography>consignneNote : </Typography>
          <Typography style={{ marginLeft: '30px' }}>{itemProp?.consignneNote}</Typography>
        </Box>
        <Box style={{ display: 'flex', marginBottom: '10px' }}>
          <Typography>deliveryStatus : </Typography>
          <Typography style={{ marginLeft: '30px' }}>{renderStatus(itemProp?.deliveryStatus)}</Typography>
        </Box>
      </Box>
    </Dialog>
  );
}

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };

// export default function SimpleDialogDemo() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState(itemProp[1]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <div>
//       <br />
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
//     </div>
//   );
// }
