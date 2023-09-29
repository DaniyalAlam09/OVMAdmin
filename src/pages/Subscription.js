import React, { useEffect, useState } from "react";
import "./style.css";
import TablePagination from "@mui/material/TablePagination";
import moment from "moment";

function Subscription() {
  const [subscription, setSubscription] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchSubscription = () => {
    fetch("https://red-gorgeous-bandicoot.cyclic.app/admins/viewsubscriptions")
      .then((response) => response.json())
      .then((actualData) => {
        setSubscription(actualData);
        console.log(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchSubscription();
  }, []);
  return (
    <>
      <div
        className=" align-items-center justify-content-center ml-3 mt-4"
        style={{ width: "100%" }}
      >
        <h5 style={{ display: "inline-block" }}>
          Total Mails for Subscription =
        </h5>
        <h5 style={{ display: "inline-block" }}>{subscription.length}</h5>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>Sr #</th>
              <th>Email</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(subscription)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <tr key={index} style={{ cursor: "pointer" }}>
                  <td>{index + 1}</td>
                  <td>{item.email}</td>
                  <td>{moment(item.date_added).format("MMM Do YY")}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={subscription.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}

export default Subscription;
