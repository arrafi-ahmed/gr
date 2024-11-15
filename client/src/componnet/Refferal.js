import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box, Drawer, List, ListItem, ListItemText, Typography,Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from "axios";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
// import { Button } from "react-scroll";

function Referrals() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate()
  const [referralData, setReferralData] = useState(null);
  const location = useLocation();
  const { userId } = location.state || {};

  useEffect(() => {
    if (userId) {
      setCurrentUser(userId);
    } else {
      console.error('User ID not found in state');
    }
  }, [userId]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleAlerSubmit = (label) => {
    console.log(label);
    if(label === "My Bonus"){
      navigate('/bonus',{ state: { userId: currentUser } })
    }else 
    if(label === "About Us"){
      navigate('/about',{ state: { userId: currentUser } })
    }else
    if(label === "Contact Us"){
      navigate('/contact',{ state: { userId: currentUser } })
    } else
//   if(label === 'KYC'){
// 	  navigate('/kyc', { state: { userId: currentUser } })
//   }else
  if(label === "Referrals"){
  navigate('/refferals',{ state: { userId: currentUser } })
  }else
  if(label === "Product List"){
  navigate('/product',{ state: { userId: currentUser } })
  }else
  if(label === "My Profile"){
  navigate('/myprofile',{ state: { userId: currentUser } })
  }else
  if(label === "My Orders"){
  navigate('/myorders',{ state: { userId: currentUser } })
  }else
  if(label === "Our YouTube Channel"){
  navigate('/youtype',{ state: { userId: currentUser } })
  }else
  if(label === "Logout"){
  navigate('/logout',{ state: { userId: currentUser } })
  }else if(label === "PrivatePolicy"){
    navigate('/cusPrivatepolicy', { state: { userId: currentUser } }); 
}
}

  useEffect(() => {
    const fetchReferralDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/referrals/tree/${currentUser}`);
        setReferralData(response.data);
      } catch (err) {
        console.log('Error fetching referral details:', err);
      }
    };

    if (currentUser) fetchReferralDetails();
  }, [currentUser]);

  
  const renderTreeItems = (users, parentId = 'root', level = 0) => {
    // Define colors for each level
    const levelColors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF'];
    const levelBackgrounds = ['#FFE5E0', '#E0FFE5', '#E0E5FF', '#FFE0F5', '#F5E0FF'];
  
    return users.map((user, index) => {
      const nodeId = `${parentId}-${user.userid || 'unknown'}-${index}`;
      const color = levelColors[level % levelColors.length];
      const backgroundColor = levelBackgrounds[level % levelBackgrounds.length];
  
      return (
        <TreeItem 
          key={nodeId} 
          itemId={nodeId} 
          label={
            <Typography style={{ color:color, backgroundColor: backgroundColor, padding: '4px', borderRadius: '4px' }}>
              {user.userid || 'Unknown User'}
            </Typography>
          }
        >
          {user.referred && user.referred.length > 0 && renderTreeItems(user.referred, nodeId, level + 1)}
        </TreeItem>
      );
    });
  };
  
  

  // const renderTreeItems = (users, parentId = 'root') => {
  //   return users.map((user, index) => {
  //     console.log(user.userid);
      
  //     // Generate a unique nodeId by combining the userId and the index
  //     const nodeId = `${parentId}-${user.userid || 'unknown'}-${index}`;
    
  //     return (
  //       <TreeItem 
  //         key={nodeId} 
  //         itemId={nodeId} 
  //         label={user.userid || 'Unknown User'}
          
  //       >
  //         {user.referred && user.referred.length > 0 && renderTreeItems(user.referred, nodeId)}
  //       </TreeItem>
  //     );
  //   });
  // };

  return (
    <>
      	  <AppBar position="fixed" sx={{ width: '100vw', overflow: 'hidden' }}>
        <Toolbar>
          <IconButton edge="start" color="red" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'PrivatePolicy', 'Logout'].map((label) => (
              <Button key={label} onClick={() => { handleAlerSubmit(label) }} color="inherit" style={{ margin: '0 10px', fontSize: "13px" }}>{label}</Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
          <IconButton
        color="inherit"
        onClick={() => navigate('/myprofile', { state: { userId: currentUser } })}
      >
        <AccountCircle />
      </IconButton>
            <Typography variant="body1" color="inherit" sx={{ marginRight: 1, }}>
                {currentUser || 'Username'} {/* Replace 'Username' with actual user name */}
            </Typography>
        </Box>
        </Toolbar>
        
      </AppBar>
			<Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
				<List className="drawer">
					{['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel','About Us', 'Contact Us', 'PrivatePolicy', 'Logout'].map((text) => (
					<ListItem button key={text} onClick={handleDrawerToggle} className="list-item" >
						<ListItemText primary={text} className="list-item-text" onClick={() => { handleAlerSubmit(text) }} />
					</ListItem>
					))}
				</List>
			</Drawer>

      <Box sx={{ p: 2 ,mt:10 }}>
        <Typography variant="h4" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>Referrals Tree</Typography>
        {referralData ? (
          <Box sx={{ minHeight: 400, minWidth: 300 }}>
            <SimpleTreeView>
              {renderTreeItems([referralData])}
            </SimpleTreeView>
          </Box>
        ) : (
          <Typography variant="body1">Loading referral data...</Typography>
        )}
      </Box>
    </>
  );
}

export default Referrals;






// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   AppBar, Toolbar, IconButton, Button, Box, Drawer, List, ListItem, ListItemText, Card,
//   CardContent, Typography, Box as MuiBox
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import axios from "axios";
// import AccountCircle from '@mui/icons-material/AccountCircle';

// function Referrals() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState("");
//   const location = useLocation();
//   const [referralData, setReferralData] = useState(null); // Holds referral data
//   const { userId } = location.state || {};

  
  
//   useEffect(() => {
//     if (userId) {
//       setCurrentUser(userId); // Set the current user
//     } else {
//       console.error('User ID not found in state');
//     }
//   }, [userId]);

//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen);
//   };



//   useEffect(() => {
//     const fetchReferralDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/referrals/tree/${currentUser}`);
//         setReferralData(response.data); // Set referral data here
//       } catch (err) {
//         console.log('Error fetching referral details:', err);
//       }
//     };

//     if (currentUser) {
//       fetchReferralDetails();
//     }
//   }, [currentUser]);

//   const ReferralTree = ({ user }) => {
//     return (
//       <MuiBox sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
//         <Card variant="elevation" sx={{ width: 140, margin: 1 ,height:100}}>
//           <CardContent>
//             <Typography variant="h6">{user.userid}</Typography>
//           </CardContent>
//         </Card>
//         {user.referred.length > 0 && (
//           <MuiBox sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 1 }}>
//             {user.referred.map((referral, index) => (
//               <ReferralTree key={index} user={referral} />
//             ))}
//           </MuiBox>
//         )}
//       </MuiBox>
//     );
//   };

//   const handleAlerSubmit = (label) => {
//     console.log(label);
//     if(label === "My Bonus"){
//       navigate('/bonus',{ state: { userId: currentUser } })
//     }else 
//     if(label === "About Us"){
//       navigate('/about',{ state: { userId: currentUser } })
//     }else
//     if(label === "Contact Us"){
//       navigate('/contact',{ state: { userId: currentUser } })
//     }else
//     if(label === 'KYC'){
//         navigate('/kyc',{ state: { userId: currentUser } })
//     }else
//     if(label === "Referrals"){
//       navigate('/refferals',{ state: { userId: currentUser } })
//     }else
//     if(label === "Product List"){
//       navigate('/product',{ state: { userId: currentUser } })
//     }else
//     if(label === "My Profile"){
//       navigate('/myprofile',{ state: { userId: currentUser } })
//     }else
//     if(label === "My Orders"){
//       navigate('/myorders',{ state: { userId: currentUser } })
//     }else
//     if(label === "Our YouTube Channel"){
//       navigate('/youtype',{ state: { userId: currentUser } })
//     }else
//     if(label === "Logout"){
//       navigate('/logout',{ state: { userId: currentUser } })
//     }
    
// }

// console.log(referralData);

//   return (
//     <>
//        <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" color="red" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
//             <MenuIcon />
//           </IconButton>
//           <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
//             {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((label) => (
//               <Button key={label} onClick={() => { handleAlerSubmit(label) }} color="inherit" style={{ margin: '0 18px', fontSize: "13px" }}>{label}</Button>
//             ))}
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
//             <IconButton color="inherit">
//                 <AccountCircle />
//             </IconButton>
//             <Typography variant="body1" color="inherit" sx={{ marginRight: 1, }}>
//                 {currentUser || 'Username'} {/* Replace 'Username' with actual user name */}
//             </Typography>
//         </Box>
//         </Toolbar>
        
//       </AppBar>
//       <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
//         <List>
//           {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((text) => (
//             <ListItem button key={text} onClick={() => { handleAlerSubmit(text) }}>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>

//       {/* Render referral data here */}
//       <Box sx={{ padding: 2 }}>
//         <Typography variant="h4">Referrals Tree</Typography>
//         {referralData ? (
//           // <ReferralTree user={referralData} />
//           <MuiBox sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
//           <Card variant="elevation" sx={{ width: 200, margin: 1 ,height:100}}>
//             <CardContent>
//               <Typography variant="h6">{referralData.userid}</Typography>
//             </CardContent>
//           </Card>
//           {referralData.referred.length > 0 && (
//             <MuiBox sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 1 }}>
//               {referralData.referred.map((referral, index) => (
//                 <ReferralTree key={index} user={referral} />
//               ))}
//             </MuiBox>
//           )}
//         </MuiBox>
//         ) : (
//           <Typography variant="body1">Loading referral data...</Typography>
//         )}
//       </Box>
//     </>
//   );
// }

// export default Referrals;


// const renderTree = (node) => (
//   <TreeItem key={node.userid} nodeId={node.userid} label={node.userid}>
//     {Array.isArray(node.referred) && node.referred.map((child) => renderTree(child))}
//   </TreeItem>
// );

// const ReferralTreeView = () => {
//   return (
//     <TreeView
//       defaultCollapseIcon={<ExpandMoreIcon />}
//       defaultExpandIcon={<ChevronRightIcon />}
//       sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
//     >
//       {referralData.map((user) => renderTree(user))}
//     </TreeView>
//   );
// };


















// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   AppBar, Toolbar, IconButton, Button, Box, Drawer, List, ListItem, ListItemText, Typography
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import axios from "axios";
// import { TreeView, TreeItem } from '@mui/x-tree-view';

// function Referrals() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState("");
//   const location = useLocation();
//   const [referralData, setReferralData] = useState(null);
//   const { userId } = location.state || {};

//   useEffect(() => {
//     if (userId) {
//       setCurrentUser(userId);
//     } else {
//       console.error('User ID not found in state');
//     }
//   }, [userId]);

//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   useEffect(() => {
//     const fetchReferralDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/referrals/tree/${currentUser}`);
//         setReferralData(response.data);
//       } catch (err) {
//         console.log('Error fetching referral details:', err);
//       }
//     };

//     if (currentUser) {
//       fetchReferralDetails();
//     }
//   }, [currentUser]);

//   const transformReferralData = (data, parentId = null) => {
//     if (!data) return null;

//     const formatTreeItems = (user, index) => {
//       const uniqueId = `${user.userid}-${parentId || "root"}-${index}`;
//       return {
//         id: uniqueId,
//         name: user.userid,
//         children: user.referred.map((referral, idx) => formatTreeItems(referral, uniqueId)),
//       };
//     };

//     return formatTreeItems(data, 0);
//   };

//   const handleAlerSubmit = (label) => {
//     console.log(label);

//     if (label === "My Bonus") {
//       navigate('/bonus', { state: { userId: currentUser } });
//     } else if (label === "About Us") {
//       navigate('/about', { state: { userId: currentUser } });
//     } else if (label === "Contact Us") {
//       navigate('/contact', { state: { userId: currentUser } });
//     } else if (label === 'KYC') {
//       navigate('/kyc', { state: { userId: currentUser } });
//     } else if (label === "Referrals") {
//       navigate('/refferals', { state: { userId: currentUser } });
//     } else if (label === "Product List") {
//       navigate('/product', { state: { userId: currentUser } });
//     } else if (label === "My Profile") {
//       navigate('/myprofile', { state: { userId: currentUser } });
//     } else if (label === "My Orders") {
//       navigate('/myorders', { state: { userId: currentUser } });
//     } else if (label === "Our YouTube Channel") {
//       navigate('/youtype', { state: { userId: currentUser } });
//     } else if (label === "Logout") {
//       navigate('/logout', { state: { userId: currentUser } });
//     } else {
//       console.warn(`No route found for label: ${label}`);
//     }
//   };

//   const treeData = referralData ? transformReferralData(referralData) : null;

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
//             <MenuIcon />
//           </IconButton>
//           <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
//             {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((label) => (
//               <Button key={label} onClick={() => { handleAlerSubmit(label) }} color="inherit" style={{ margin: '0 20px', fontSize: "13px" }}>{label}</Button>
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
//         <List>
//           {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((text) => (
//             <ListItem button key={text} onClick={() => { handleAlerSubmit(text) }}>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>

//       <Box sx={{ padding: 2 }}>
//         <Typography variant="h4">Referrals Tree</Typography>
//         {treeData ? (
//           <TreeView defaultExpanded={['1']}>
//             <TreeItem nodeId={treeData.id} label={treeData.name}>
//               {treeData.children.map((child) => (
//                 <TreeItem key={child.id} nodeId={child.id} label={child.name}>
//                   {child.children.map((grandchild) => (
//                     <TreeItem key={grandchild.id} nodeId={grandchild.id} label={grandchild.name} />
//                   ))}
//                 </TreeItem>
//               ))}
//             </TreeItem>
//           </TreeView>
//         ) : (
//           <Typography variant="body1">Loading referral data...</Typography>
//         )}
//       </Box>
//     </>
//   );
// }

// export default Referrals;















// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   AppBar, Toolbar, IconButton, Button, Box, Drawer, List, ListItem, ListItemText, Card,
//   CardContent, Typography, Box as MuiBox
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import axios from "axios";

// function Referrals() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState("");
//   const location = useLocation();
//   const [referralData, setReferralData] = useState(null); // Holds referral data
//   const { userId } = location.state || {};
  
//   useEffect(() => {
//     if (userId) {
//       setCurrentUser(userId); // Set the current user
//     } else {
//       console.error('User ID not found in state');
//     }
//   }, [userId]);

//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const handleAlerSubmit = (label) => {
//     // ... your navigation logic here ...
//   }

//   useEffect(() => {
//     const fetchReferralDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/referrals/tree/${currentUser}`);
//         setReferralData(response.data); // Set referral data here
//       } catch (err) {
//         console.log('Error fetching referral details:', err);
//       }
//     };

//     if (currentUser) {
//       fetchReferralDetails();
//     }
//   }, [currentUser]);

//   // Recursive component to render the referral tree
//   const ReferralTree = ({ user }) => {
//     return (
//       <Card variant="outlined" sx={{ margin: 1 }}>
//         <CardContent>
//           <Typography variant="h6">{user.userid}</Typography>
//           {user.referred.length > 0 && (
//             <MuiBox sx={{ paddingLeft: 2 }}>
//               {user.referred.map((referral, index) => (
//                 <ReferralTree key={index} user={referral} />
//               ))}
//             </MuiBox>
//           )}
//         </CardContent>
//       </Card>
//     );
//   };

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
//             <MenuIcon />
//           </IconButton>
//           <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
//             {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((label) => (
//               <Button key={label} onClick={() => { handleAlerSubmit(label) }} color="inherit" style={{ margin: '0 20px', fontSize: "13px" }}>{label}</Button>
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
//         <List>
//           {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((text) => (
//             <ListItem button key={text} onClick={() => { handleAlerSubmit(text) }}>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>

//       {/* Render referral data here */}
//       <Box sx={{ padding: 2 }}>
//         <Typography variant="h4">Referrals Tree</Typography>
//         {referralData ? (
//           <ReferralTree user={referralData} />
//         ) : (
//           <Typography variant="body1">Loading referral data...</Typography>
//         )}
//       </Box>
//     </>
//   );
// }

// export default Referrals;



// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   AppBar, Toolbar, IconButton, Button, Box, Drawer, List, ListItem, ListItemText, Table,
//   TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, Paper
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import axios from "axios";

// function Referrals() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState("");
//   const location = useLocation();
//   const [formData, setFormdata] = useState([]);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [referralDetails, setReferralDetails] = useState({}); // Holds details of referrals (phno, email, etc.)
//   const { userId } = location.state || {};
  
//   useEffect(() => {
//     if (userId) {
//       setCurrentUser(userId); // Set the current user
//     } else {
//       console.error('User ID not found in state');
//     }
//   }, [userId]);

//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const handleAlerSubmit = (label) => {
//     console.log(label);
//     if(label === "My Bonus"){
//       // navigate('/bonus', { state: finalBonus })
//       navigate('/bonus',{ state: { userId: currentUser } })
//     }else 
//     if(label === "About Us"){
//       navigate('/about',{ state: { userId: currentUser } })
//     }else
//     if(label === "Contact Us"){
//       navigate('/contact',{ state: { userId: currentUser } })
//     }else
//     // if(label === 'KYC'){
//     //     navigate('/kyc', { state: { userId: currentUser } })
//     // }else
// 	  if(label === "Referrals"){
// 		navigate('/refferals',{ state: { userId: currentUser } })
// 	  }else
//     if(label === "Product List"){
//       navigate('/product',{ state: { userId: currentUser } })
//     }else
// 	  if(label === "My Profile"){
// 		navigate('/myprofile',{ state: { userId: currentUser } })
// 	  }else
// 	  if(label === "My Orders"){
// 		navigate('/myorders',{ state: { userId: currentUser } })
// 	  }else
// 	  if(label === "Our YouTube Channel"){
// 		navigate('/youtype',{ state: { userId: currentUser } })
// 	  }else
// 	  if(label === "Logout"){
// 		navigate('/logout',{ state: { userId: currentUser } })
// 	  }
    
//   }

//   console.log(currentUser);
  

//   useEffect(() => {
   

//     const fetchOrderDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/referrals/tree/${currentUser}`);

//         console.log(response.data);
//         console.log("****************");
        
        
      

//       } catch (err) {
//         console.log('Error fetching order details:', err);
//       }
//     };
//     fetchOrderDetails();
//   }, [currentUser]);

//   const handleRowClick = (index) => {
//     setExpandedRow(expandedRow === index ? null : index);
//   };

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
//             <MenuIcon />
//           </IconButton>
//           <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
//             {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((label) => (
//               <Button key={label} onClick={() => { handleAlerSubmit(label) }} color="inherit" style={{ margin: '0 20px', fontSize: "13px" }}>{label}</Button>
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
//         <List>
//           {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((text) => (
//             <ListItem button key={text} onClick={handleDrawerToggle}>
//               <ListItemText primary={text} onClick={() => { handleAlerSubmit(text) }} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>

//       <h1>Helllo</h1>

//     </>
//   );
// }

// export default Referrals;




// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   AppBar, Toolbar, IconButton, Button, Box, Drawer, List, ListItem, ListItemText, Table,
//   TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, Paper
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import axios from "axios";

// function Referrals() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState("");
//   const location = useLocation();
//   const [formData, setFormdata] = useState([]);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [referralDetails, setReferralDetails] = useState({}); // Holds details of referrals (phno, email, etc.)
//   const { userId } = location.state || {};
  
//   useEffect(() => {
//     if (userId) {
//       setCurrentUser(userId); // Set the current user
//     } else {
//       console.error('User ID not found in state');
//     }
//   }, [userId]);

//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const handleAlerSubmit = (label) => {
//     console.log(label);
//     if(label === "My Bonus"){
//       // navigate('/bonus', { state: finalBonus })
//       navigate('/bonus',{ state: { userId: currentUser } })
//     }else 
//     if(label === "About Us"){
//       navigate('/about',{ state: { userId: currentUser } })
//     }else
//     if(label === "Contact Us"){
//       navigate('/contact',{ state: { userId: currentUser } })
//     }else
//     // if(label === 'KYC'){
//     //     navigate('/kyc', { state: { userId: currentUser } })
//     // }else
// 	  if(label === "Referrals"){
// 		navigate('/refferals',{ state: { userId: currentUser } })
// 	  }else
//     if(label === "Product List"){
//       navigate('/product',{ state: { userId: currentUser } })
//     }else
// 	  if(label === "My Profile"){
// 		navigate('/myprofile',{ state: { userId: currentUser } })
// 	  }else
// 	  if(label === "My Orders"){
// 		navigate('/myorders',{ state: { userId: currentUser } })
// 	  }else
// 	  if(label === "Our YouTube Channel"){
// 		navigate('/youtype',{ state: { userId: currentUser } })
// 	  }else
// 	  if(label === "Logout"){
// 		navigate('/logout',{ state: { userId: currentUser } })
// 	  }
    
//   }

//   useEffect(() => {
//     const fetchReferralDetails = async (refid) => {
//       try {
//         const response = await axios.get(`http://localhost:4000/customer/${refid}`);
//         return response.data; // Assuming response contains {userid, phno, email}
//       } catch (err) {
//         console.error(`Error fetching details for refid ${refid}:`, err);
//         return null;
//       }
//     };

//     const fetchOrderDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/customer/${currentUser}`);
//         const referralData = {
//           userName: response.data.userid,
//           Refid1: response.data.refid1,
//           Refid2: response.data.refid2,
//           Refid3: response.data.refid3,
//         };

//         setFormdata([referralData]);

//         // Fetch details for each referral (Refid1, Refid2, Refid3)
//         const ref1Details = await fetchReferralDetails(referralData.Refid1);
//         const ref2Details = await fetchReferralDetails(referralData.Refid2);
//         const ref3Details = await fetchReferralDetails(referralData.Refid3);

//         setReferralDetails({
//           [referralData.Refid1]: ref1Details,
//           [referralData.Refid2]: ref2Details,
//           [referralData.Refid3]: ref3Details,
//         });
//       } catch (err) {
//         console.log('Error fetching order details:', err);
//       }
//     };
//     fetchOrderDetails();
//   }, [currentUser]);

//   const handleRowClick = (index) => {
//     setExpandedRow(expandedRow === index ? null : index);
//   };

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
//             <MenuIcon />
//           </IconButton>
//           <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
//             {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((label) => (
//               <Button key={label} onClick={() => { handleAlerSubmit(label) }} color="inherit" style={{ margin: '0 20px', fontSize: "13px" }}>{label}</Button>
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
//         <List>
//           {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((text) => (
//             <ListItem button key={text} onClick={handleDrawerToggle}>
//               <ListItemText primary={text} onClick={() => { handleAlerSubmit(text) }} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell style={{fontWeight:"bold"}}>User ID</TableCell>
//               <TableCell style={{fontWeight:"bold"}}>Refid1</TableCell>
//               <TableCell style={{fontWeight:"bold"}}>Refid2</TableCell>
//               <TableCell style={{fontWeight:"bold"}}>Refid3</TableCell>
//               <TableCell style={{fontWeight:"bold"}}>Details</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {formData.map((row, index) => (
//               <React.Fragment key={index}>
//                 <TableRow onClick={() => handleRowClick(index)} style={{ cursor: 'pointer' }}>
//                   <TableCell>{row.userName}</TableCell>
//                   <TableCell>{row.Refid1}</TableCell>
//                   <TableCell>{row.Refid2}</TableCell>
//                   <TableCell>{row.Refid3}</TableCell>
//                   <TableCell>
//                     {expandedRow === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
//                     <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
//                       <Box margin={2}>
//                         <p>Additional Referral Details:</p>
//                         <ul>
//                           <li><strong>{row.Refid1}</strong> - {referralDetails[row.Refid1]?.phno}, {referralDetails[row.Refid1]?.email}</li>
//                           <li><strong>{row.Refid2}</strong> - {referralDetails[row.Refid2]?.phno}, {referralDetails[row.Refid2]?.email}</li>
//                           <li><strong>{row.Refid3}</strong> - {referralDetails[row.Refid3]?.phno}, {referralDetails[row.Refid3]?.email}</li>
//                         </ul>
//                       </Box>
//                     </Collapse>
//                   </TableCell>
//                 </TableRow>
//               </React.Fragment>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }

// export default Referrals;
