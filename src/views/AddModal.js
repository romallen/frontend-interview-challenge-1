import { useEffect, useState } from "react";
import {
    Box,
    List,
    ListItem,
    FormGroup,
    Modal,
    TextField,
    Typography,
  } from "@mui/material";
  import LoadingButton from "@mui/lab/LoadingButton";
  import axios from "axios";
  import { customAlphabet } from "nanoid";


  const nanoid = customAlphabet("1234567890abcdef", 13);
  const personDataSchema = {
    id: nanoid(),
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    address: {
      country: "",
      streetName: "",
      city: "",
      postalCode:"N/A"
    },
    favoriteBooks: [],
    birthday: "",
    favoriteColor: "",
    comment: "",
  };
export function AddModal(props) {
    const [newPersonData, setNewPersonData] = useState({personDataSchema})

    const handleAddClick = () => {
          axios
            .post(`http://localhost:3000/persons`, newPersonData)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
              console.log("Error: ", err);
            });
     
      };


    return (
        <Modal open={props.addModalOpen}>
           <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          sx={{ bgcolor: "#ffffff", m: "0 auto", width: "70%", py: 2 }}
        >
          <FormGroup
            onChange={(e) => {
              console.log(e.target.value);
              setNewPersonData({
                ...newPersonData,
                [e.target.id]: e.target.value,
              });
            }}
          >
            <List>
              
              <ListItem>
                <Typography sx={{ mr: 2 }}>Title: </Typography>
                {/* <Typography sx={{ mr: 2 }}>{newPersonData.title} </Typography> */}
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}> First Name: </Typography>
                {/* <TextField
                  id="firstName"
                  variant="outlined"
                  defaultValue={newPersonData.firstName}
                  required
                ></TextField> */}
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}> Last Name: </Typography>
                {/* <TextField
                  id="lastName"
                  variant="outlined"
                  defaultValue={newPersonData.lastName}
                  required
                ></TextField> */}
              </ListItem>
         
              <ListItem>
                <Typography sx={{ mr: 2 }}>Email: </Typography>
                {/* <Typography sx={{ mr: 2 }}>{newPersonData.email} </Typography> */}
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}>Gender: </Typography>
                {/* <Typography sx={{ mr: 2 }}>{newPersonData.gender} </Typography> */}
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}>Address: </Typography>
              </ListItem>

              <ListItem>
                <Typography sx={{ mr: 2 }}>Country: </Typography>
                {/* <Typography sx={{ mr: 2 }}>
                  {newPersonData.address.country}{" "}
                </Typography> */}
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}> Street Name: </Typography>
                {/* <Typography sx={{ mr: 2 }}>
                  {newPersonData.address.streetName}
                </Typography> */}
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}>City: </Typography>
                {/* <Typography sx={{ mr: 2 }}>
                  {newPersonData.address.city}{" "}
                </Typography> */}
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}>Favorite Books: </Typography>
                {/* <Typography sx={{ mr: 2 }}>
                  {newPersonData.favoriteBooks.join(", ")}
                </Typography> */}
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}>Birthday: </Typography>

                {/* <TextField
                  id="birthday"
                  defaultValue={newPersonData.birthday}
                  type="date"
                  variant="outlined"
                  sx={{ mr: 1 }}
                  required
                ></TextField>
                {`(${
                  new Date().getFullYear() -
                  new Date(newPersonData.birthday).getFullYear()
                } years old)`} */}
              </ListItem>
              <ListItem>
                <Typography sx={{ mr: 2 }}>Comment: </Typography>
                {/* <TextField
                  id="comment"
                  defaultValue={newPersonData.comment}
                  rows={2}
                  variant="outlined"
                  sx={{ width: "100%" }}
                ></TextField> */}
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
                type="submit"
                onClick={handleAddClick}
                // loading={isUpdateLoading}
                loadingIndicator="ADDING..."
                variant="contained"
              >
                ADD
              </LoadingButton>
         
          </Box>
        </Box>
        </Modal>
    )}