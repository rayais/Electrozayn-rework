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
    const handleRowClick = (rowData) => {
        // Pass the clicked row's data to the Actions component
        return (
            <Actions
                editRoute={"order"}
                deleteHandler={deleteOrderHandler}
                id={rowData.id}
                rowData={rowData} // Pass the row's data
            />
        );
    };

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
            const response = await fetch(`https://www.electrozayn.com/api/update/order/${id}`, {
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
      if (!groupedOrders[order.id]) {
        groupedOrders[order.id] = {
          id: order.id,
          userName: order.FirstName,
          email: order.Email,
          total_price: 0, 
          products: [],
          status : order.validate_add_or_not,
          phone : order.PhoneNumber,
          date: order.date,
          address: order.address
        };
      }

    
      // Add product to the user's products array
      groupedOrders[order.id].products.push({
        productName: order.product_name,
        productQuantity: order.product_quantity,
        productPrice: parseFloat(order.total_price),
        product_price: order.product_price
      });
    
      // Update total price for the user
      groupedOrders[order.id].total_price = parseFloat(order.total_price);
      
    });
    
    
    const rows = Object.values(groupedOrders);
    
    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 10,
            flex: 0,
        },
        {
            field: "userName",
            headerName: "User",
            type: "text",
            minWidth: 50,
            flex: 0,
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 100,
            flex: 0,
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
            minWidth: 160,
            flex: 0,
        },
        {
            field: "product",
            headerName: "Product",
            type: "text",
            minWidth: 250,
            flex: 0.1,
            renderCell: (params) => (
                <Tooltip title={params.row.products?.map(product => product.productName).join(", ")}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {params.row.products?.map((product, index) => (
                            <div key={index}>
                                {product.productName}
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
            headerName: "Phone",
            type: "number",
            minWidth: 50,
            flex: 0,
        },
        {
            field: "date",
            headerName: "Date",
            type: "number",
            minWidth: 50,
            flex: 0,
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <div onClick={() => handleRowClick(params.row)}>
                        {handleRowClick(params.row)} 
                    </div>
                );
            },            
        },
    ];


   
    

    return (
        <>
            <MetaData title="Electrozayn - Le monde des composants électronique et de l'électronique Tunisie" />

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

