// import React from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";

import Paper from "@mui/material/Paper";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  // boxShadow: 24,
  p: 4,
};

const Customers = () => {
  const [user, setUser] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  // const Data = () => {
  useEffect(() => {
    fetch("http://localhost:4000/admins/viewcustomers")
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setUser(actualData);
        console.log(user);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // then((res) => {
    //   setUser(res.data.user);
    //   console.log(res.data);
    // });
  }, []);
  // };
  // const _id = user._id;

  // const userID = Object.values(user).map(user._id);
  const handleDelete = (id) => {
    // console.log(userID);
    axios
      .get(`http://localhost:4000/admins/deleteuser/${id}`)
      .then((user) => {
        console.log("user delete");
        navigate(0);
      })
      .catch((error) => {
        console.log(error.message);
      });
    // console.log("dcwj");
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <h5>Total Registered Customers</h5>
      <h6>{user.length}</h6>
      <table className="table">
        <thead>
          <tr>
            <th>Sr #</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>ID</th>
            <th>Delete User</th>
            <th>BLock User</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(user)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item._id}</td>
                <td>
                  <button
                    onClick={handleOpen}
                    className="buttons btn text-white btn-block btn-danger"
                  >
                    {" "}
                    Delete
                  </button>
                  <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="keep-mounted-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Are You Sure
                      </Typography>
                      <br />
                      <button
                        className="buttons btn text-white btn-block btn-danger"
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="buttons btn text-white btn-block btn-danger"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </Box>
                  </Modal>
                </td>
                <td>
                  <button
                    onClick={handleOpen}
                    className="buttons btn text-white btn-block btn-danger"
                  >
                    {" "}
                    Block
                  </button>
                  <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="keep-mounted-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Are You Sure
                      </Typography>
                      <br />
                      <button
                        className="buttons btn text-white btn-block btn-danger"
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="buttons btn text-white btn-block btn-danger"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </Box>
                  </Modal>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={user.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Customers;
