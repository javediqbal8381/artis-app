import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { productsApi } from '../../redux/api/productApi'
import { shopsApi } from '../../redux/api/shopsApi';
import { ordersApi } from '../../redux/api/orderApi';


// Dummy data (replace with actual data from API)
const dummyData = [
  // Sample data for products
  {
    id: 1,
    name: 'Product 1',
    category: 'Category 1',
    price: '$10',
    description: 'Description of Product 1'
  },
  {
    id: 2,
    name: 'Product 2',
    category: 'Category 2',
    price: '$20',
    description: 'Description of Product 2'
  },
  // Sample data for shops
  {
    id: 1,
    name: 'Shop 1',
    location: 'Location 1',
    rating: 4.5
  },
  {
    id: 2,
    name: 'Shop 2',
    location: 'Location 2',
    rating: 3.8
  },
  // Sample data for orders
  {
    id: 1,
    orderId: 1234,
    products: ['Product 1', 'Product 2'],
    totalPrice: '$30',
    userId: 'User 1'
  },
  {
    id: 2,
    orderId: 5678,
    products: ['Product 2', 'Product 3'],
    totalPrice: '$40',
    userId: 'User 2'
  }
];

const Assets = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteItem = (id) => {
    // Delete item logic (to be implemented)
    console.log(`Delete item with ID ${id}`);
  };

  const { data: products, isLoadingproductsLoading, isError: isProductsError, refetch: refetchProducts } = productsApi.useGetAllProductsQuery()
  const [deleteProduct, { isError: isDeletingProductError, }] = productsApi.useDeleteProductMutation();

  const { data: shops, isLoadingShopsLoading, isError: isShopsError, refetch: refetchShops } = shopsApi.useGetAllShopsQuery();
  const [deleteshop, { isError: isDeletingShopError, }] = shopsApi.useDeleteShopMutation();

  const { data: orders, isLoadingOrdersLoading, isError: isOrdersError, refetch: refetchOrders } = ordersApi.useGetAllOrdersQuery();
  const [deleteOrder, { isError: isDeletingOrderError, }] = ordersApi.useDeleteOrderMutation();

  const handleRemoveProduct = (product) => {
    deleteProduct({
      productId: product._id,
      shopId: product.shopId
    })
    setTimeout(() => {
      refetchProducts()
    }, 3000);
  };

  const handleRemoveShop = (shopId) => {
    deleteshop(shopId)
    setTimeout(() => {
      refetchShops()
    }, 3000);
  };

  const handleRemoveOrder = (orderId) => {
    deleteOrder(orderId)
    setTimeout(() => {
      refetchOrders()
    }, 3000);
  };


  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2, py: 4 }}>
      <Typography variant="h4" mb={4}>Management</Typography>
      <Tabs value={currentTab} onChange={handleChangeTab} centered>
        <Tab label="Products" />
        <Tab label="Shops" />
        <Tab label="Orders" />
      </Tabs>
      <Box mt={4}>
        {currentTab === 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products && products.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell title={item.description}>{item.description.substring(0, 30)}...</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEditItem(item)} variant="outlined" color="primary">Edit</Button>
                      <IconButton onClick={() => handleRemoveProduct(item)} color="error"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {currentTab === 1 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shops && shops.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.rating}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEditItem(item)} variant="outlined" color="primary">Edit</Button>
                      <IconButton onClick={() => handleRemoveShop(item._id)} color="error"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {currentTab === 2 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Products</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders && orders.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.orderId}</TableCell>
                    <TableCell>{item.products?.join(', ')}</TableCell>
                    <TableCell>{item.totalPrice}</TableCell>
                    <TableCell>{item.userId}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEditItem(item)} variant="outlined" color="primary">Edit</Button>
                      <IconButton onClick={() => handleRemoveOrder(item._id)} color="error"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Dialog for editing items */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Box>
              {/* Render form fields for editing the selected item */}
              {currentTab === 0 && (
                <>
                  <TextField label="Name" fullWidth defaultValue={selectedItem.name} />
                  <TextField label="Category" fullWidth defaultValue={selectedItem.category} />
                  <TextField label="Price" fullWidth defaultValue={selectedItem.price} />
                  <TextField label="Description" fullWidth defaultValue={selectedItem.description} />
                </>
              )}
              {currentTab === 1 && (
                <>
                  <TextField label="Name" fullWidth defaultValue={selectedItem.name} />
                  <TextField label="Location" fullWidth defaultValue={selectedItem.location} />
                  <TextField label="Rating" fullWidth defaultValue={selectedItem.rating} />
                </>
              )}
              {currentTab === 2 && (
                <>
                  <TextField label="Order ID" fullWidth defaultValue={selectedItem.orderId} />
                  <TextField label="Products" fullWidth defaultValue={selectedItem.products?.join(', ')} />
                  <TextField label="Total Price" fullWidth defaultValue={selectedItem.totalPrice} />
                  <TextField label="User ID" fullWidth defaultValue={selectedItem.userId} />
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Assets;
