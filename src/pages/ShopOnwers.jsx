// import React from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// import SearchIcon from "@material-ui/icons/Search";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
const Dashboard = () => {
  const [user, setUser] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const [blocked, setBlocked] = React.useState(false);
  const [deleteshop, setDeleteShop] = React.useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setBlocked(false);
    setDeleteShop(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigate = useNavigate();
  useEffect(() => {
    fetchShops();
  }, []);
  const fetchShops = () => {
    fetch("http://localhost:4000/admins/viewshopowners")
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setUser(actualData);
        console.log(user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleDelete = (id) => {
    // console.log(userID);
    axios
      .get(`http://localhost:4000/admins/deleteshopowner/${id}`)
      .then((user) => {
        console.log(id);
        fetchShops();
        setDeleteShop(true);

        // navigate(0);
      })
      .catch((error) => {
        console.log(error.message);
      });
    // console.log("dcwj");
  };
  const handleBlock = (id) => {
    // console.log(userID);
    axios
      .post(`http://localhost:4000/admins/block/${id}`)
      .then((user) => {
        console.log(id);
        fetchShops();
        setOpen(true);

        // navigate(0);
      })
      .catch((error) => {
        console.log(error.message);
      });
    // console.log("dcwj");
  };
  const handleUnBlock = (id) => {
    // console.log(userID);
    axios
      .post(`http://localhost:4000/admins/unblock/${id}`)
      .then((user) => {
        console.log(id);
        fetchShops();
        setBlocked(true);

        // navigate(0);
      })
      .catch((error) => {
        console.log(error.message);
      });
    // console.log("dcwj");
  };

  return (
    <div className="text-center mt-4">
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
            <th>Name</th>
            {/* <th>Last Name</th> */}
            <th>Email</th>
            <th>Status</th>
            <th>Shop Name</th>
            <th>Shop Number</th>
            <th>Floor</th>
            <th>No Of Products</th>
            {/* <th>Catagorey</th> */}
            <th>Phone Number</th>
            <th>Delete User</th>
            <th>Block User</th>
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
              <tr key={index} style={{ cursor: "pointer" }}>
                <td>{index + 1}</td>
                <td>
                  {item.firstName} {item.lastName}
                </td>
                {/* <td>{item.lastName}</td> */}
                <td>{item.email}</td>
                <td>
                  {item?.verified === true && <>Verified</>}{" "}
                  {item?.verified === false && <>Unverified</>}
                </td>
                <td>{item.shopName}</td>
                <td>{item.shopNo}</td>
                <td>{item.floor}</td>
                <td>{item?.products?.length}</td>
                <td>{item.phone}</td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                    className="buttons btn text-white btn-block btn-danger"
                  >
                    {" "}
                    Delete
                  </button>
                </td>
                <td>
                  {item?.verified === true && (
                    <button
                      onClick={() => {
                        handleBlock(item._id);
                      }}
                      className="buttons btn text-white btn-block btn-danger"
                    >
                      {" "}
                      Block
                    </button>
                  )}

                  {item?.verified === false && (
                    <button
                      onClick={() => {
                        handleUnBlock(item._id);
                      }}
                      className="buttons btn text-white btn-block btn-danger"
                    >
                      {" "}
                      Unblock
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Shop Blocked successfully
        </Alert>
      </Snackbar>
      <Snackbar open={blocked} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Shop Unblocked successfully
        </Alert>
      </Snackbar>
      <Snackbar open={deleteshop} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Shop Deleted successfully
        </Alert>
      </Snackbar>
      <TablePagination
        rowsPerPageOptions={[7, 25, 100]}
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

export default Dashboard;
