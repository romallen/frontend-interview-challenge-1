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
import axios from "axios";

export function DetailsModal(props) {
  const [personData, setPersonData] = useState(null);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  useEffect(() => {
    if (props.id) {
      axios
        .get(`http://localhost:3000/persons/${props.id}`)
        .then((res) => {
          console.log(res.data);
          setPersonData(res.data);
          props.setIsLoading(false);
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    }
  }, [props.id]);

  const handleUpdateClick = () => {
    setIsUpdateLoading(true);

    axios
      .patch(`http://localhost:3000/persons/${personData.id}`, personData)
      .then((res) => {
        props.setDetailsModalOpen(false);
        setIsUpdateLoading(false);
      })
      .catch((err) => {
        setIsUpdateLoading(false);
        console.log("Error: ", err);
      });
  };

  return (
    <Modal open={props.detailsModalOpen}>
      {personData ? (
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            // handleUpdateClick();
          }}
          sx={{ bgcolor: "#ffffff", m: "0 auto", width: "70%", py: 2 }}
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
      ) : (
        <Box>loading</Box>
      )}
    </Modal>
  );
}
