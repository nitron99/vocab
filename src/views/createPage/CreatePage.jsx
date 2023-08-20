import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  Container, 
  Box, 
  Button,
  TextField
} from '@mui/material';

import TopBar from '../../components/topBar/TopBar';

import { useDB } from '../../contexts/firebaseDb';

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
      <TopBar />
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