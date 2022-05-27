import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormGroup,
  List,
  ListItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ErrorComponent } from "../components/ErrorComponent";

export function DetailsModal(props) {
  const [personData, setPersonData] = useState(null);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [detailsError, setDetailsError] = useState({isError: false, errorMessage: null});

  useEffect(() => {
    if (props.id) {
      axios
        .get(`http://localhost:3000/persons/${props.id}`)
        .then((res) => {
          if (res.data.errors) {
            setDetailsError({isError: true, errorMessage: res.data.errors[0]});
          } else {
            setPersonData(res.data);
            props.setIsLoading(false);
          }
        })
        .catch((err) => {
          props.setIsLoading(false);
          setDetailsError({isError: true, errorMessage: err.message});
          console.log("Error: ", err);
        });
    }
  }, [props.id]);

  const handleUpdateClick = () => {
    setIsUpdateLoading(true);

    axios
      .patch(`http://localhost:3000/persons/${personData.id}`, personData)
      .then((res) => {
        if (res.data.errors) {
          setDetailsError({isError: true, errorMessage: res.data.errors[0]});
        } else {
          props.setDetailsModalOpen(false);
          setIsUpdateLoading(false);
        }
      })
      .catch((err) => {
        setIsUpdateLoading(false);
        setDetailsError({isError: true, errorMessage: err.message});
        console.log("Error: ", err);
      });
  };

  const handleDeleteClick = () => {
    setIsDeleteLoading(true);
    axios
      .delete(`http://localhost:3000/persons/${personData.id}`)
      .then((res) => {
        if (res.data.errors) {
          setDetailsError({isError: true, errorMessage: res.data.errors[0]});
        } else {
          setIsDeleteLoading(false);
          props.setDetailsModalOpen(false);
        }
      })
      .catch((err) => {
        setIsDeleteLoading(false);
        setDetailsError({isError: true, errorMessage: err.message});
        console.log("Error: ", err);
      });
  };

  return (
    <Modal open={props.detailsModalOpen}>
        <Box>
      {detailsError.isError ? <ErrorComponent error={detailsError} setError={setDetailsError} /> : null}
      {personData ? (
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          sx={{ bgcolor: personData.favoriteColor, m: "0 auto", width: "70%", py: 2 }}
        >
          <FormGroup
            onChange={(e) => {
              console.log(e.target.value);
              setPersonData({
                ...personData,
                [e.target.id]: e.target.value,
              });
            }}
          >
            <List>
              <ListItem>
                <Typography sx={{ mr: 2 }}>ID: </Typography>
                <Typography sx={{ mr: 2 }}>{personData.id} </Typography>
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}>Title: </Typography>
                <Typography sx={{ mr: 2 }}>{personData.title} </Typography>
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}> First Name: </Typography>
                <TextField
                  id="firstName"
                  variant="outlined"
                  defaultValue={personData.firstName}
                  required
                ></TextField>
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}> Last Name: </Typography>
                <TextField
                  id="lastName"
                  variant="outlined"
                  defaultValue={personData.lastName}
                  required
                ></TextField>
              </ListItem>
              <ListItem></ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}>Email: </Typography>
                <Typography sx={{ mr: 2 }}>{personData.email} </Typography>
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}>Gender: </Typography>
                <Typography sx={{ mr: 2 }}>{personData.gender} </Typography>
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}>Address: </Typography>
              </ListItem>

              <ListItem>
                <Typography sx={{ mr: 2 }}>Country: </Typography>
                <Typography sx={{ mr: 2 }}>
                  {personData.address.country}{" "}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}> Street Name: </Typography>
                <Typography sx={{ mr: 2 }}>
                  {personData.address.streetName}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}>City: </Typography>
                <Typography sx={{ mr: 2 }}>
                  {personData.address.city}{" "}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}>Favorite Books: </Typography>
                <Typography sx={{ mr: 2 }}>
                  {personData.favoriteBooks.join(", ")}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}>Birthday: </Typography>

                <TextField
                  id="birthday"
                  defaultValue={personData.birthday}
                  type="date"
                  variant="outlined"
                  sx={{ mr: 1 }}
                  required
                ></TextField>
                {`(${
                  new Date().getFullYear() -
                  new Date(personData.birthday).getFullYear()
                } years old)`}
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}>Comment: </Typography>
                <TextField
                  id="comment"
                  defaultValue={personData.comment}
                  rows={2}
                  variant="outlined"
                  sx={{ width: "100%" }}
                ></TextField>
              </ListItem>
            </List>
          </FormGroup>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mx: 2,
            }}
          >
            <LoadingButton
              size="small"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteClick}
              loading={isDeleteLoading}
              loadingIndicator="deleting..."
              variant="contained"
            >
              DELETE
            </LoadingButton>
            <Box>
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                onClick={() => props.setDetailsModalOpen(false)}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                onClick={handleUpdateClick}
                loading={isUpdateLoading}
                loadingIndicator="UPDATING..."
                variant="contained"
              >
                UPDATE
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>loading</Box>
      )}
      </Box>
    </Modal>
  );
}
