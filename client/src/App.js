
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Product from './componnet/product';
import Layout from './componnet/Loyout';
import Home from './componnet/Home';
import About from './componnet/About';
import Contect from './componnet/contect';
import AddProduct from './componnet/AddProduct';
import UpdateProduct from './componnet/Updateproduct';
import Login from './componnet/Login';
import PasswordRecovery from './componnet/PasswordRecovory';
import Registration from './componnet/resgistationModel';
import AdminPage from './componnet/AdminPage';
import Location from './componnet/Location';
import Bonus from './componnet/Bonus';
import Kyc from './componnet/Kyc';
import Referrals from './componnet/Refferal';
import MyProfile from './componnet/MyProfile';
import Myorder from './componnet/MyOrder';
import YouType from './componnet/YouTypeChennal';
import Logout from './componnet/Logout';
import AddShop from './componnet/AddShop';
import ShopList from './componnet/ShopList';
import CustomerList from './componnet/CustomerList';
import AdminLogout from './componnet/AdminLogout';
import ShopOwnerPage from './componnet/shopOwnerpage';
import RegisterPage from './componnet/Registerpageotp';
import ShopOwnerAddProduct from './componnet/shopOwnerAddproduct';
import UpdateShopOwner from './componnet/updateShopOwner';
import OtpComponent from './firebox/setup';
import ShopOwnerLogoutPage from './componnet/shopOwnerLogoutPage';
import ShopOwnerUpdateProduct from './componnet/shopOwnerUpdateProduct';
import ShopOwnerprofile from './componnet/shopOwnerprofile';
import AdminProfile from './componnet/AdminProfilePage';
import PhoneNumberPage from './componnet/PhoneNumberPage';
import OtpVerification from './componnet/OtpVerification';
import OtpList from './componnet/AdminOtpDetails';
import PrivatePolicyCustomer from './componnet/CustomerPrivatePolicy';
import PrivatePolicyShopOwner from './componnet/shopPrivacyandpolicy';
import PrivatePolicyAdmin from './componnet/adminPrivatePolicy';


// import AdminProfile from './componnet/adminprofilepage';



const App = () => {
  return (
    // <Router>
    //   <Layout>
    //   <Routes>
    //     <Route path='/' element={<Home></Home>}></Route>
    //     <Route path='/about' element={<About></About>}></Route>
    //     <Route path='/product' element={<Product></Product>}></Route>
    //     <Route path='/contect' element={<Contect></Contect>}></Route>
    //   </Routes>
    //   </Layout>
      

    <Router>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/forgot-password' element={<PasswordRecovery></PasswordRecovery>}></Route>
        <Route path='/register' element={<Registration/>}></Route>
        <Route path='/product' element={<Product/>}></Route>
        <Route path='/adminPage' element={<AdminPage/>}></Route>
        <Route path='/addToProduct' element={<AddProduct/>}></Route>
        <Route path='/bonus' element={<Bonus/>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/contact' element={<Contect></Contect>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        {/* <Route path='/kyc' element={<Kyc></Kyc>}></Route> */}
        <Route path='/refferals' element={<Referrals></Referrals>}></Route>
        <Route path='/myprofile' element={<Kyc></Kyc>}></Route>
        <Route path='/myorders' element={<Myorder></Myorder>}></Route>
        <Route path='/youtype' element={<YouType></YouType>}></Route>
        <Route path='/logout' element={<Logout></Logout>}></Route>
        <Route path='/addShop' element={<AddShop></AddShop>}></Route>
        <Route path='/updateProducts' element={<UpdateProduct></UpdateProduct>}></Route>
        <Route path='/shopList' element={<ShopList></ShopList>}></Route>
        <Route path='/customerList' element={<CustomerList></CustomerList>}></Route>
        <Route path='/adminLogout' element={<AdminLogout></AdminLogout>}></Route>
        <Route path='/shopOwner' element={<ShopOwnerPage></ShopOwnerPage>}></Route>
        <Route  path = "/shopOwnerAddProduct" element={<ShopOwnerAddProduct></ShopOwnerAddProduct>}></Route>
        <Route path='/updateProductsDetails' element={<UpdateShopOwner></UpdateShopOwner>}></Route>
         <Route path='adminProfile' element={<AdminProfile></AdminProfile>}></Route>
        <Route path='/shopOwnerProfile' element={<ShopOwnerprofile></ShopOwnerprofile>}></Route>
        <Route path='/shopownerlogoutPage' element={<ShopOwnerLogoutPage></ShopOwnerLogoutPage>}></Route>
        <Route path='/shopownerUpdateproduct' element={<ShopOwnerUpdateProduct></ShopOwnerUpdateProduct>}></Route>
        <Route path='/phoneNumber' element={<PhoneNumberPage></PhoneNumberPage>}></Route>
        <Route path='otpVerification' element={<OtpVerification></OtpVerification>}></Route>
        <Route path='adminOtpDetails' element={<OtpList></OtpList>}></Route>
        <Route path='cusPrivatepolicy' element={<PrivatePolicyCustomer></PrivatePolicyCustomer>}> </Route>
        <Route path='shopOwnerPrivatePolicy' element={<PrivatePolicyShopOwner></PrivatePolicyShopOwner>}></Route>
        <Route path='adminprivatepolicy' element={<PrivatePolicyAdmin></PrivatePolicyAdmin>}></Route>
        {/* <Route path="shopOwnerPrivatePolicy" element={<PrivatePolicyShopowner></PrivatePolicyShopowner>}></Route> */}

      </Routes>


     </Router>

    // <OtpComponent></OtpComponent>
   
  //  <RegisterPage></RegisterPage>


    // <Layout>
    //       <Home></Home>
    //       <About></About>
    //       <Product></Product>
    //       <Contect></Contect>
    //   </Layout>
    // <Location/>
  
  
    // <Layout>
      // <AddProduct/>
      // <UpdateProduct/>s
      // <AddProduct></AddProduct>
    // </Layout>
      //  <Login/>

      // <Location></Location>
   
  
  );
};

export default App;


// import React from 'react';
// import Box from '@mui/material/Box';
// import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
// import { TreeItem } from '@mui/x-tree-view/TreeItem';

// function ReferralTreeView({ data }) {
//   // Recursive function to render each referral as a TreeItem
//   const renderTreeItems = (users) => {
//     return users.map((user) => (
//       <TreeItem key={user.userid} itemId={user.userid} label={user.userid}>
//         {user.referred && renderTreeItems(user.referred)}
//       </TreeItem>
//     ));
//   };

//   return (
//     <Box sx={{ minHeight: 400, minWidth: 300 }}>
//       <SimpleTreeView>
//         {renderTreeItems(data)}
//       </SimpleTreeView>
//     </Box>
//   );
// }

// // Example data
// const referralData = [
//   {
//     "userid": "NagaDevi",
//     "referred": []
//   },
//   {
//     "userid": "sownthariya",
//     "referred": [
//       {
//         "userid": "vikeyy",
//         "referred": []
//       },
//       {
//         "userid": "vinithaa",
//         "referred": [
//           {
//             "userid": "sowmiya",
//             "referred": []
//           },
//           {
//             "userid": "jeyam",
//             "referred": []
//           },
//           {
//             "userid": "umaMaheswari",
//             "referred": [
//               {
//                 "userid": "sumitra",
//                 "referred": [
//                   {
//                     "userid": "subakrishna",
//                     "referred": [
//                       {
//                         "userid": "vamega",
//                         "referred": [
//                           {
//                             "userid": "palSelvi",
//                             "referred": [
//                               {
//                                 "userid": "santhiya",
//                                 "referred": []
//                               }
//                             ]
//                           }
//                         ]
//                       }
//                     ]
//                   }
//                 ]
//               }
//             ]
//           }
//         ]
//       },
//       {
//         "userid": "muthu",
//         "referred": []
//       },
//       {
//         "userid": "mmmmmmmm",
//         "referred": []
//       },
//       {
//         "userid": "11111111111",
//         "referred": []
//       }
//     ]
//   },
//   {
//     "userid": "vemega",
//     "referred": []
//   }
// ];

// // Usage in a parent component
// export default function App() {
//   return (
//     <ReferralTreeView data={referralData} />
//   );
// }


