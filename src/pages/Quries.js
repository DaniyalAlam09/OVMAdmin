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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

function Quries() {
  const [quires, setQuries] = useState("");
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

  const fetchQuries = () => {
    fetch("http://localhost:4000/admins/quries")
      .then((response) => response.json())
      .then((actualData) => {
        setQuries(actualData);
        console.log(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchQuries();
  }, []);
  return (
    <>
      <div className="text-center ml-3 mt-4" style={{ width: "100%" }}>
        <h5 style={{ display: "inline-block" }}>Total Quries =</h5>
        <h5 style={{ display: "inline-block" }}>{quires.length}</h5>
        <div class=" container d-flex justify-content-center">
          <div className="">
            <Box>
              <Toolbar>
                <Search>
                  {/* <SearchIconWrapper><SearchIcon /></SearchIconWrapper> */}
                  <StyledInputBase
                    placeholder="Search By Name"
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
              <th>Subject</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(quires)
              .filter((person) => {
                if (search == "") {
                  return person;
                } else if (
                  person.firstName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
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
                  <td>{item.subject}</td>
                  <td>{item.email}</td>
                  <td className="text-left">
                    <ReadMore>{item.message}</ReadMore>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={quires.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}

export default Quries;
