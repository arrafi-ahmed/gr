

import {
  Container,
  InputAdornment,
  Paper,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Snackbar,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from "axios";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editRow, setEditRow] = useState(null);
  const [productType, setProductType] = useState('fruits');
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState("")
  const location = useLocation();
  const { userId } = location.state || {};
  console.log(userId);

  useEffect(() => {
    if (userId) {
      setCurrentUser(userId); // Set the current user
  } else {
      console.error('User ID not found in state');
      // Handle case where userId is not available (e.g., redirect or show a message)
  }
  }, [userId])

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:4000/${productType}`);
        setFormData(res.data);
      } catch (error) {
        setErrorMessage("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [productType]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = formData.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMenuClick = (menuItem) => {
    if (menuItem === "Add Shop") {
      navigate('/addShop');
    }else if(menuItem === "Shop List"){
        // navigate('/bonus', { state: finalBonus })
        navigate('/shopList',{ state: { userId: currentUser } })
    }else
    
        if(menuItem === "Customer List"){
          // navigate('/bonus', { state: finalBonus })
          navigate('/customerList',{ state: { userId: currentUser } })
       
    } else
    if(menuItem === "Logout"){
      // navigate('/bonus', { state: finalBonus })
      navigate('/adminLogout',{ state: { userId: currentUser } })
    
    } else if (menuItem === "Update Product") {
      navigate('/updateProducts',{ state: { userId: currentUser } });
    } else if (menuItem === "Add Product") {
      navigate('/addToProduct',{ state: { userId: currentUser } });
    } else
        if(menuItem === "OtpList"){
            navigate('/adminOtpDetails',{state:{userId:currentUser}})
        } else
        if(menuItem ===  'PrivatePolicy'){
            navigate('/adminprivatepolicy',{state:{userId:currentUser}})
        }
  };

  const handleEditClick = (product) => {
    setEditRow(product.id);
  };

  const handleSaveClick = async (product) => {
    try {
      const endpoint = productType === 'fruits' 
        ? `http://localhost:4000/updateFruit/${product.id}` 
        : `http://localhost:4000/updateVegetable/${product.id}`;

      await axios.put(endpoint, product);
      setEditRow(null);
      setErrorMessage(""); // Clear error on success
    } catch (error) {
      setErrorMessage("Error updating product: " + (error.response ? error.response.data : error.message));
    }
  };

  const handleChange = (event, field, id) => {
    const updatedProducts = formData.map(product => {
      if (product.id === id) {
        return { ...product, [field]: event.target.value };
      }
      return product;
    });
    setFormData(updatedProducts);
  };

  const handleProductTypeChange = (type) => {
    setProductType(type);
    setEditRow(null);
  };
  const handleDeleteOpen = (product) => {
    console.log(product);
    
    setProductToDelete(product);
    setOpenDeleteDialog(true);
};

const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
};

const handleDelete = async () => {
  console.log(productToDelete);
  console.log(productType);
  
  
    if (productToDelete) {
        try {
            await axios.delete(`http://localhost:4000/delete${productType.charAt(0).toUpperCase() + productType.slice(1)}/${productToDelete.id}`);
            setFormData(formData.filter(product => product.id !== productToDelete.id));
        } catch (error) {
            console.error("Error deleting product:", error);
        } finally {
            handleDeleteClose();
        }
    }
};

  const handleCloseSnackbar = () => {
    setErrorMessage(""); // Close error message
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {['Add Shop','Shop List','Customer List','Update Product','Add Product','OtpList','PrivatePolicy','Logout'].map((label) => (
              <p key={label} style={{ marginRight: "90px" ,cursor:"pointer"}} onClick={() => handleMenuClick(label)}>
                {label}
              </p>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <IconButton color="inherit"
             	onClick={() => navigate('/adminProfile', { state: { userId: currentUser } })}>
                <AccountCircle />
            </IconButton>
            <Typography variant="body1" color="inherit" sx={{ marginRight: 1, }}>
                {currentUser || 'Username'} {/* Replace 'Username' with actual user name */}
            </Typography>
        </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          {['Add Shop','Shop List','Customer List','Update Product','Add Product','OtpList','PrivatePolicy','Logout'].map((text) => (
            <ListItem button key={text} onClick={() => handleMenuClick(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Container style={{marginTop:"84px"}}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="30px" marginBottom="20px">
          <TextField
            label="Search by Name"
            variant="outlined"
            value={searchQuery}
            style={{ width: "300px" }}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  🔍
                </InputAdornment>
              ),
            }}
          />
      <Box>
        <Button onClick={() => handleProductTypeChange('fruits')} variant='contained' style={{marginRight:"20px"}}>Fruits</Button>
        <Button onClick={() => handleProductTypeChange('vegetables')} variant="contained">Vegetables</Button>
      </Box>
</Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{fontWeight:"bold"}}>ID</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Name</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Image</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Unit</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Price</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Quantity</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Shop ID</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    {editRow === product.id ? (
                      <TextField
                        value={product.name}
                        onChange={(e) => handleChange(e, 'name', product.id)}
                      />
                    ) : (
                      product.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editRow === product.id ? (
                      <TextField
                        value={product.image_url}
                        onChange={(e) => handleChange(e, 'image_url', product.id)}
                      />
                    ) : (
                      <img src={product.image_url} alt={product.name} style={{ width: '50px', height: '50px' }} />
                    )}
                  </TableCell>
                  <TableCell>
                    {editRow === product.id ? (
                      <TextField
                        value={product.unit}
                        onChange={(e) => handleChange(e, 'unit', product.id)}
                      />
                    ) : (
                      product.unit
                    )}
                  </TableCell>
                  <TableCell>
                    {editRow === product.id ? (
                      <TextField
                        type="number"
                        value={product.price}
                        onChange={(e) => handleChange(e, 'price', product.id)}
                      />
                    ) : (
                      product.price
                    )}
                  </TableCell>
                  <TableCell>
                    {editRow === product.id ? (
                      <TextField
                        type="number"
                        value={product.qty}
                        onChange={(e) => handleChange(e, 'qty', product.id)}
                      />
                    ) : (
                      product.qty
                    )}
                  </TableCell>
                  <TableCell>
                    {editRow === product.id ? (
                      <TextField
                        value={product.shopid}
                        onChange={(e) => handleChange(e, 'shopid', product.id)}
                      />
                    ) : (
                      product.shopid
                    )}
                  </TableCell>
                  <TableCell>
                    {editRow === product.id ? (
                      <Button onClick={() => handleSaveClick(product)}>Save</Button>
                    ) : (
                      <Button onClick={() => handleEditClick(product)}>Edit</Button>
                    )}
                  </TableCell>
                  <TableCell>
                  <Button onClick={() => handleDeleteOpen(product)} color="secondary" variant="contained" size="small">
                                            Delete
                                        </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete the product: {productToDelete?.name}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

        {/* Snackbar for error messages */}
        <Snackbar 
          open={Boolean(errorMessage)} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar} 
          message={errorMessage} 
        />
      </Container>
    </>
  );
};

export default UpdateProduct;


