import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearErrors, deleteOrder, getAllOrders } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';
import Actions from './Actions';
import { formatDate } from '../../utils/functions';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { Tooltip } from '@mui/material';


const OrderTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { orders, error } = useSelector((state) => state.allOrders);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.order);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_ORDER_RESET });
        }
        dispatch(getAllOrders());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);


    const updateOrderStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5500/api/update/order/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header
                },
                body: JSON.stringify({ validate_add_or_not: newStatus }), // Convert body to JSON string
            });

            if (response.ok) {
                // Update the local state or dispatch an action to update the store
                console.log('Order status updated successfully');
            } else {
                console.error('Failed to update order status');
            }
        } catch (error) {
            console.error('An error occurred while updating order status', error);
        }
    };
    
    const editStatusHandler = async (id, selectedStatus) => {
        const newValue = selectedStatus === 'Pending' ? 0 : 1;
        
        try {
            await updateOrderStatus(id, newValue);
            // No need to update rows manually, getAllOrders will do that
            dispatch(getAllOrders()); // Update the orders in the store
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };
    

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    }

    const groupedOrders = {};

    orders?.forEach((order) => {
      if (!groupedOrders[order.user_id]) {
        groupedOrders[order.user_id] = {
          id: order.id,
          userName: order.FirstName,
          email: order.Email,
          total_price: 0, // Initialize total_price
          products: [],
          status : order.validate_add_or_not,
          phone : order.PhoneNumber // Initialize products array
        };
      }
    
      // Add product to the user's products array
      groupedOrders[order.user_id].products.push({
        productName: order.product_name,
        productQuantity: order.product_quantity,
        productPrice: parseFloat(order.total_price),
      });
    
      // Update total price for the user
      groupedOrders[order.user_id].total_price = parseFloat(order.total_price);
      
    });
    

    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 10,
            flex: 0.1,
        },
        {
            field: "userName",
            headerName: "User",
            type: "text",
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 100,
            flex: 0.1,
            renderCell: (params) => {
                return (
                    <span className={'text-sm p-1 px-2 font-medium rounded-full '}>
                        {params.row.status === 0 ? 'Pending' : 'Delivered'}
                    </span>
                );
            },
            editable: true,
            renderEditCell: (params) => (
                <select
                    value={params.value}
                    onChange={(e) => {
                        const selectedStatus = e.target.value;
                        const newValue = selectedStatus ;
                        editStatusHandler(params.row.id, newValue);
                    }}
                >
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                </select>
            ),
        },          
        
        {
            field: "email",
            headerName: "Email",
            type: "emailnumber",
            minWidth: 150,
            flex: 0.1,
        },
        {
            field: "product",
            headerName: "Product",
            type: "text",
            minWidth: 220,
            flex: 0,
            renderCell: (params) => (
                <Tooltip title={params.row.products?.map(product => product.productName).join(", ")}>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {params.row.products?.map((product, index) => (
                    <div key={index}>
                        {product.productName} - Quantity: {product.product_quantity}
                    </div>
                ))}
            </div>
        </Tooltip>
              ),
        },
        {
            field: "amount",
            headerName: "Prix",
            type: "number",
            minWidth: 50,
            flex: 0,
            renderCell: (params) => {
                return (
                    <span>TND {params.row.total_price}</span>
                );
            },
        },
        {
            field: "phone",
            headerName: "PhoneDate",
            type: "number",
            minWidth: 50,
            flex: 0.1,
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.1,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions
                    deleteHandler={deleteOrderHandler}
                    id={params.row.id}
                />
                );
            },            
        },
    ];

    const rows = Object.values(groupedOrders);

   
    

    return (
        <>
            <MetaData title="Electrozayn - Le monde des composants électronique et de l'électronique Tunisie" />

            {loading && <BackdropLoader />}

            <h1 className="text-lg font-medium uppercase ">orders</h1>
            <div className="bg-white rounded-xl shadow-lg w-full cursor-pointer" style={{ height: 470 }}>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectIconOnClick
                    sx={{
                        boxShadow: 0,
                        border: 0,
                    }}
                />
            </div>
        </>
    );
};

export default OrderTable;

