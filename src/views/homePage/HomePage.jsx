import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Input,
  Modal,
  ModalClose,
  Sheet,
  Button
} from '@mui/joy';
import { 
  Container, 
  Typography, 
  Box
} from '@mui/material';

import TopBar from '../../components/topBar/TopBar';

import AddIcon from '@mui/icons-material/Add';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';

import { useDB } from '../../contexts/firebaseDb';

import styles from "../../global.scss";
import "./styles.scss";

const HomePage = () => {
  const { 
    getBooks,
    booksList,
    createBook
  } = useDB();

  const navigate = useNavigate();
  const [createBookModalOpen, setCreateBookModalOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    getBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    console.log(name);
    let obj = {
      name: name,
      id: null
    }
    createBook(obj).then(() => {
      setTimeout(() => {
        setCreateBookModalOpen(false);
          getBooks();
      }, 1000);
    });
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <TopBar />
      <Container maxWidth="md">
        <Box pt={2}
          sx={{ gap: "20px" }}
          className='flexCenterSBRow'>
          <Box className='book__card flexCenterCenterColumn'
            sx={{ width: "100%", cursor: "pointer" }}
            onClick={() => {
              setName("");
              setCreateBookModalOpen(true)
            }}>
            <AddIcon 
              fontSize='large' 
              color='primary'/>
            <Typography 
              variant='h6'
              fontFamily={'Noto Sans, sans-serif'}
              color="primary">
              CREATE BOOK
            </Typography>
          </Box>
          <Box className='book__card flexCenterCenterColumn'
            sx={{ width: "100%", cursor: "pointer" }}
            onClick={() => {
              navigate("/practise");
            }}>
            <SportsMartialArtsIcon 
              fontSize='large' 
              color="secondary"/>
            <Typography 
              variant='h6'
              fontFamily={'Noto Sans, sans-serif'}
              color="secondary">
              PRACTISE
            </Typography>
          </Box>
        </Box>
        <Box pt={2}
          className="flexCenterSBRow">
          <Typography 
            variant='h6'
            fontFamily={'Noto Sans, sans-serif'}
            color={"white"}>
            Total Books - {booksList.length}  
          </Typography>
          <Typography 
            variant='h6'
            fontFamily={'Noto Sans, sans-serif'}
            color={"white"}>
            Total Words - {booksList.length}  
          </Typography>
        </Box>
        <Box
          sx={{ 
            overflow: "auto",
            height: "calc(100vh - 150px)",
            marginTop: "20px" }}>
        {
          booksList.map((item, index) => (
            <Box key={index}
              className="book__card flexCenter_Row"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(item.id+'')}>
              <Typography 
                fontFamily={'Noto Sans, sans-serif'}
                variant='body1'>
                {item.id + 1}.&nbsp;{item.name}
              </Typography>
            </Box>
          ))
        }
        </Box>
      </Container>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={createBookModalOpen}
        onClose={() => setCreateBookModalOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'sm',
            borderColor: styles['border'],
            p: 3,
            m: 1,
            backgroundColor: styles['bg_primary'],
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: '20',
              right: '20',
              borderColor: styles['border'],
            }}
          />
          <Typography
            level="h2"
            color="white"
            fontWeight={"600"}
            fontFamily={'Noto Sans'}
            mb={2}
          >
            Create Book
          </Typography>
          <Input
            placeholder='enter book name'
            variant="soft"
            sx={{ backgroundColor: styles['bg_secondary'], 
              color: styles['main'] }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          <Button
            sx={{ marginTop: 2 }}
            color="primary"
            onClick={handleSubmit}
            fullWidth
            variant="soft">
            Submit
          </Button>
        </Sheet>
      </Modal>
    </Box>
  )
}

export default HomePage