import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import axios from "axios";
import { LoadingComponent } from "../components/LoadingComponent";
import { ErrorComponent } from "../components/ErrorComponent";
import { SuccessComponent } from "../components/SuccessComponent";
import { DetailsModal } from "./DetailsModal";
import { AddModal } from "./AddModal";
export function ListView() {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchError, setFetchError] = useState({
    isError: false,
    errorMessage: null,
  });
  const [success, setSuccess] = useState({isSuccessful: false, successMessage: null})
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedRowID, setSelectedRowID] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchPageData(currentPage);
  }, [currentPage, detailsModalOpen, addModalOpen]);

  const fetchPageData = (num) => {
    axios
      .get(`http://localhost:3000/persons?page=${num}`)
      .then((res) => {
        if (res.data.errors) {
          setFetchError({ isError: true, errorMessage: res.data.errors[0] });
        } else {
          setPageData(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setFetchError({ isError: true, errorMessage: err.message });
        setIsLoading(false);
        console.log(err);
      });
  };

  const handleRowClick = (id) => {
    setIsLoading(true);

    setDetailsModalOpen(true);
    setSelectedRowID(id);
  };

  return (
    <Container>
      {fetchError.isError ? (
        <ErrorComponent error={fetchError} setError={setFetchError} />
      ) : null}
      {success.isSuccessful ? (<SuccessComponent success={success}  setSuccess={setSuccess}/>): null}
      {isLoading ? <LoadingComponent isLoading={isLoading} /> : null}

      {pageData ? (
        <Box sx={{ height:"100vh", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <TableContainer component={Paper} sx={{mt:"20%"}}>
            <Table sx={{ minWidth: 400 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID </TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageData.results.map((row, i) => (
                  <TableRow
                    key={i}
                    hover={true}
                    onClick={() => handleRowClick(pageData.results[i].id)}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">
                      {row.firstName + " " + row.lastName}
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                m: 1,
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  const previousPage = currentPage - 1;
                  setCurrentPage(previousPage);
                }}
                disabled={currentPage === 1 ? true : false}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  const nextPage = currentPage + 1;
                  setCurrentPage(nextPage);
                }}
                disabled={pageData.hasNextPage ? false : true}
              >
                Next
              </Button>
            </Box>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              mb: 4,
            }}
          >
            <AddCircle
              sx={{
                fontSize: 50,
              }}
              color="primary"
              onClick={() => setAddModalOpen(true)}
            />
          </Box>
        </Box>
      ) : null}

      {detailsModalOpen && (
        <DetailsModal
          id={selectedRowID}
          setDetailsModalOpen={setDetailsModalOpen}
          detailsModalOpen={detailsModalOpen}
          setIsLoading={setIsLoading}
          setIsSuccessful={setSuccess}

        />
      )}
      {addModalOpen && (
        <AddModal
          addModalOpen={addModalOpen}
          setAddModalOpen={setAddModalOpen}
          setIsLoading={setIsLoading}
          setIsSuccessful={setSuccess}
        />
      )}
    </Container>
  );
}
