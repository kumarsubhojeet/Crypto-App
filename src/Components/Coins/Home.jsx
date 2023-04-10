import React, { useState, useEffect } from "react";
import axios from "axios";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import approx from "approximate-number";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export default function StickyHeadTable() {
  const [crypto, setCrypto] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const APICALL = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${rowsPerPage}&page=${page}&sparkline=false&locale=en`
      );

      setCrypto(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    APICALL();
  }, []);

  const Paper = styled("div")(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "95%",
      margin: "0 auto",
    },
  }));

  return (
    <Paper sx={{ width: "90%", overflow: "hidden", mx: "auto" }} up>
      <Typography variant="h5" gutterBottom>
        All Coins
      </Typography>
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className="Table_heading">Rank</TableCell>
              <TableCell align="left" className="Table_heading">
                Coin
              </TableCell>
              <TableCell align="left" className="Table_heading">
                Price
              </TableCell>
              <TableCell align="left" className="Table_heading">
                24h
              </TableCell>
              <TableCell align="left" className="Table_heading">
                Market Cap
              </TableCell>
              <TableCell align="left" className="Table_heading">
                Total Volume
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crypto
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.market_cap_rank}
                  >
                    <>
                      <TableCell component="th" scope="row">
                        {row.market_cap_rank}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <img
                          src={row.image}
                          alt="img-error"
                          className="coin_img"
                        />{" "}
                        {row.name}
                      </TableCell>
                      <TableCell align="left">
                        ${approx(row.current_price)}
                      </TableCell>
                      <TableCell align="left">
                        {approx(row.price_change_percentage_24h)}%
                      </TableCell>
                      <TableCell align="left">
                        ${approx(row.market_cap)}
                      </TableCell>
                      <TableCell align="left">
                        ${approx(row.total_volume)}
                      </TableCell>
                    </>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={crypto.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
