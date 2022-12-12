// ----------------------------------------------------------------------
import { useEffect, useState } from 'react';
import {staffInfoAPI} from '../components/services/index';


// const staffId = localStorage.getItem('staffID');
// // const account = {
// //   name: 'Jaydon Frankie',
// //   email: 'demo@minimals.cc',
// //   photoURL: '/static/mock-images/avatars/avatar_default.png',
// // };

// const [account, setAccount] = useState({
//   name: '',
//   staffID: '',
//   photoURL: '/static/mock-images/avatars/avatar_default.png',
// });

// const getStaffInfo = async (body) => {
//   try {
//     const res = await staffInfoAPI(body);
//     console.log(res);
//     setAccount(res?.data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// useEffect(() => {
//   const body = {
//     staffID: staffId,
//   };
//   getStaffInfo(body);
// }, []);



// export default account;


// 
export const  Account = () => {
  const staffId = localStorage.getItem('staffID');

  const [accountData, setAccount] = useState({
    name: '',
    staffID: '',
    photoURL: '/static/mock-images/avatars/avatar_default.png',
  });
  
  const getStaffInfo = async (body) => {
    try {
      const res = await staffInfoAPI(body);
      console.log(res);
      setAccount(res?.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    const body = {
      staffID: staffId,
    };
    getStaffInfo(body);
  }, []);
  
  
  
  return accountData;
}