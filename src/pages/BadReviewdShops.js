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
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

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

function BadReviewdShops() {
  const [badReviewdProducts, setBadReviewdProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [shopOwners, setShopOwners] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const badReviewd = () => {
    axios
      .post("http://localhost:4000/shops/sentiment")
      .then((res) => {
        setBadReviewdProducts(res.data.badReviewPro);
        console.log(res.data.pro);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const badShops = () => {
    badReviewdProducts.map((items) => {
      console.log("ii");
      console.log(items.owner);
      setShops([...shops, items.owner]);
    });
    console.log(shops);
  };
  const allShops = () => {
    shops.map((items) => {
      axios
        .get("http://localhost:4000/shopowners/" + items)
        .then((res) => {
          setShopOwners(res.data);
          console.log(items);
          console.log(res.data);
          console.log(items);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    console.log(shops);
  };

  useEffect(() => {
    badReviewd();
    allShops();
  }, []);
  useEffect(() => {
    if (badReviewdProducts) {
      badShops();
    }
  }, [badReviewdProducts]);
  let url = `http://localhost:3000/singleProduct/${badReviewdProducts._id}/${badReviewdProducts.owner}`;
  return (
    <div>
      <div className="text-center ml-3 mt-4" style={{ width: "100%" }}>
        <h5 style={{ display: "inline-block" }}>Total Products =</h5>
        <h5 style={{ display: "inline-block" }}>{badReviewdProducts.length}</h5>
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
              <th>Product Name</th>
              {/* <th>Last Name</th> */}
              <th>Owner</th>
              <th>Price</th>
              <th>Review</th>
              <th>Visit</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(badReviewdProducts)
              .filter((person) => {
                if (search == "") {
                  return person;
                } else if (
                  person.product_name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ) {
                  return person;
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <tr
                  key={index}
                  style={{ cursor: "pointer", textAlign: "left" }}
                >
                  <td>{index + 1}</td>
                  <td>{item.product_name}</td>
                  <td>{item.owner}</td>
                  <td>{item.product_price}</td>

                  <td>
                    {item.reviews &&
                      item.reviews?.map((rew, index) => (
                        <div key={index}>
                          <div class="col">
                            <strong>{index + 1}.</strong> {rew.comment}
                          </div>
                        </div>
                      ))}
                  </td>
                  <td>
                    <button className="buttons btn text-white btn-block btn-danger">
                      <a
                        href={`http://localhost:3000/singleProduct/${item._id}/${item.owner}`}
                        target="_blank"
                        className=" text-white"
                      >
                        Visit
                      </a>
                    </button>
                  </td>
                  <td>
                    {/* {item.map((rev) => {
                      rev.reviews;
                    })} */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            User Delete successfully
          </Alert>
        </Snackbar>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={badReviewdProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export default BadReviewdShops;
