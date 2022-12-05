// import React from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";
// import SearchIcon from "@material-ui/icons/Search";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";

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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: " rgba(218, 216, 216, 0.26)",
  "&:hover": {
    backgroundColor: "rgba(218, 216, 216, 0.26)",
    // width: "80%",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "100%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50ch",
      "&:focus": {
        width: "70ch",
      },
    },
  },
}));

const Customers = () => {
  const [user, setUser] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = useState("");

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

  const handleDelete = (id) => {
    // console.log(userID);
    axios
      .delete(`http://localhost:4000/admins/deleteuser/${id}`)
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
    <div className="text-center ml-3 mt-4">
      <h5 style={{ display: "inline-block" }}>Total Registered Customers =</h5>
      <h5 style={{ display: "inline-block" }}>{user.length}</h5>
      <div class=" container d-flex justify-content-center">
        <div className="">
          <Box>
            <Toolbar>
              <Search>
                {/* <SearchIconWrapper><SearchIcon /></SearchIconWrapper> */}
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </Search>
            </Toolbar>
          </Box>
        </div>
      </div>
      <table className="table table-hover table-striped">
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
            .filter((person) => {
              if (search == "") {
                return person;
              } else if (
                person.firstName.toLowerCase().includes(search.toLowerCase()) ||
                person.lastName.toLowerCase().includes(search.toLowerCase())
              ) {
                return person;
              }
            })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
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
                      <form
                        action="/<%= item.id %>?_method=DELETE"
                        method="POST"
                      >
                        <button
                          className="buttons btn text-white btn-block btn-danger"
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </form>
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
    </div>
  );
};

export default Customers;
