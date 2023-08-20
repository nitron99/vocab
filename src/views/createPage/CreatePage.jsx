import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  Container, 
  Typography, 
  Box, 
  Button,
  Avatar,
  IconButton,
  TextField
} from '@mui/material';

import { useDB } from '../../contexts/firebaseDb';

import styles from "../../global.scss";
import "./styles.scss";

const Data = {
  title: "",
  content: ""
}

const CreatePage = () => {
  const { createWord } = useDB();

  const navigate = useNavigate();
  const [formData, setFormData] = useState(Data);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }

  // --------------------------- handle create ------------------------
  const handleSubmit = () => {
    let obj = { 
      title: formData.title, 
      content: formData.content,
      createdAt: new Date(), 
      updatedAt: null
    }
    createWord(obj)
      .then(() => {
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      })
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box sx={{ 
        height: "72px", 
        gap: "50px", 
        backgroundColor: styles['bg_secondary'],
        borderBottom: "solid 1px #303644" }}>
        <Container maxWidth="md">
          <Box
            pt={1}
            className="flexCenterSBRow">
            <Typography 
              variant='h4' 
              color={"white"}
              fontWeight={700}>
                Vocab.
            </Typography>
            <Box sx={{ gap: "20px" }} className="flexCenter_Row">
              <IconButton
                onClick={() => {
                  
                }}>
                <Avatar
                  alt={JSON.parse(localStorage.getItem("auth"))?.displayName}
                  src={JSON.parse(localStorage.getItem("auth"))?.photoURL} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container 
        maxWidth="md">
        <Box
          className="flexCenterCenterColumn"
          p={2}>
          <Box
            width={"100%"}
            className="create__card flex_CenterColumn">
            <TextField 
              variant="outlined"
              name="title"
              label="Title"
              value={formData.title}
              sx={{ 
                width: "100%",

              }}
              onChange={handleChange}
              />
            <TextField 
              variant="outlined"
              name="content"
              label="Content"
              value={formData.content}
              sx={{ width: "100%", }}
              multiline="true"
              onChange={handleChange}
              color='secondary'
              />
            <Button
              color="success"
              variant="outlined"
              onClick={handleSubmit}
              sx={{ "& .Mui-disabled": {
                color: "red"
              }}}
              disabled={!(formData.title !== "" && formData.content !== "")}>
              Create
            </Button>

          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default CreatePage