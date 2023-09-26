import React, { useState, useRef } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Print from '@mui/icons-material/Print';
import ToPrint from '../ToPrint/ToPrint'; // Make sure to import your ToPrint component
import { Link } from 'react-router-dom';
// ... (other imports) ...

const Actions = ({ id, deleteHandler, name, editRoute, rowData }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [printVisible, setPrintVisible] = useState(false);

  const componentRef = useRef();
  const handlePrint = () => {
    const contentToPrint = componentRef.current;

    if (contentToPrint) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css
        ">
          <title>ELECTROZAYN</title>
        </head>
        <body>
          ${contentToPrint.outerHTML}
        </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.print();
      setPrintVisible(false);

      // After printing, add the class back to hide the content
    }
  };

  const handleImageLoad = () => {
    if (printVisible) {
      handlePrint();
    }
  };

  return (
    <>
      <div className="flex justify-between items-center gap-3">
        {editRoute !== "order" ? (
          <Link to={`/admin/${editRoute}/${id}`} className="text-blue-600 hover:bg-blue-200 p-1 rounded-full bg-blue-100">
            <EditIcon />
          </Link>
        ) : (
          <>
            <button
              onClick={() => {
                setPrintVisible(true);
                handlePrint();
              }}
              className="text-green-600 hover:bg-green-200 p-1 rounded-full bg-green-100"
            >
              <Print />
            </button>

            <div className={!printVisible ? 'print-hidden' : ''}>
              <div ref={componentRef}>
                <ToPrint rowData={rowData} onImageLoad={handleImageLoad} />
              </div>
            </div>
          </>
        )}
        <button onClick={() => setOpen(true)} className="text-red-600 hover:bg-red-200 p-1 rounded-full bg-red-100">
          <DeleteIcon />
        </button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <p className="text-gray-500">Do you really want to delete{name && <span className="font-medium">&nbsp;{name}</span>}? This process cannot be undone.</p>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className="py-2 px-6 rounded shadow bg-gray-400 hover:bg-gray-500 text-white">Cancel</button>
          <button onClick={() => deleteHandler(id)} className="py-2 px-6 ml-4 rounded bg-red-600 hover:bg-red-700 text-white shadow">Delete</button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Actions;
