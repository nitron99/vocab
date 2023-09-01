/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GestureDetector } from 'react-onsenui';

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
  Box,
  IconButton
} from '@mui/material';

import TopBar from '../../components/topBar/TopBar';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { useDB } from '../../contexts/firebaseDb';

import styles from "../../global.scss";
import "./styles.scss";

const BookPage = () => {
  const {
    booksList,
    createWord,
    getBooks,
    deleteWord,
    // deleteBook
  } = useDB();

  const params = useParams();
  const navigate = useNavigate();
  const [createWordModalOpen, setCreateWordModalOpen] = useState();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  useEffect(() => {
    console.log(params);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    let obj = {
      title: title,
      content: content,
      id: null
    }
    createWord(params.id, obj).then(() => {
      setTimeout(() => {
        getBooks();
        setTitle("");
        setContent("");
        setCreateWordModalOpen(false);
      }, 1000);  
    })
  }

  const handleDelete = (bookId, wordId) => {
    deleteWord(bookId, wordId).then(() => {
      setTimeout(() => {
        getBooks();
      }, 1000);  
    })
  }

  // const handleDeleteBook = (bookId) => {
  //   deleteBook(bookId).then(() => {
  //     setTimeout(() => {
  //       getBooks();
  //       navigate(-1);
  //     }, 1000);  
  //   })
  // }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <TopBar />
      <Container maxWidth="md">
        <Box
          mt={2}
          className="flexCenterSBRow">
          <Box  
            // pt={2}
            sx={{ gap: "20px", cursor: "pointer" }}
            className="flexCenter_Row"
            onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon sx={{ color: "white" }}/>
            <Typography 
              variant='h6'
              fontFamily={'Noto Sans, sans-serif'}
              color={"white"}>
              {booksList.find(i => i.id == params.id)?.name}
            </Typography>
          </Box>
        </Box>
        <Box className='flexCenterEndRow'
          sx={{ gap: "10px" }}>
          <Box className='word__card flexCenterCenterRow'
            mt={2}
            sx={{ cursor: "pointer" }}
            onClick={() => setCreateWordModalOpen(true)}>
            <AddIcon 
              color="primary"/>
            <Typography 
              variant='body2'
              fontWeight={600}
              fontFamily={'Noto Sans, sans-serif'}
              color="primary">
              ADD
            </Typography>
          </Box>
          <Box className='word__card flexCenterCenterRow'
            mt={2}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/practise/" + params.id)}>
            <SportsMartialArtsIcon 
              color="secondary"/>
            <Typography 
              variant='body2'
              fontWeight={600}
              fontFamily={'Noto Sans, sans-serif'}
              color="secondary">
              PRACTISE
            </Typography>
          </Box>
          {/* <Box className='word__card flexCenterCenterRow'
            mt={2}
            sx={{ cursor: "pointer"}}
            onClick={() => handleDeleteBook(params.id)}>
            <DeleteIcon 
              color="error"/>
            <Typography 
              variant='body2'
              fontWeight={600}
              fontFamily={'Noto Sans, sans-serif'}
              color="error">
              DELETE
            </Typography>
          </Box> */}
        </Box>
        {
          booksList.find(i => i.id == params.id) && booksList.find(i => i.id == params.id).words && booksList.find(i => i.id == params.id).words.length > 0
          ?
            booksList.find(i => i.id == params.id).words.map((item, index) => (
              <Box key={index}
                className="word__card flexCenterSBRow"
                sx={{ cursor: "pointer" }}>
                <Box
                  className='flexCenter_Row'>
                  <Typography 
                    fontFamily={'Noto Sans, sans-serif'}
                    variant='body1'>
                    {item.id + 1}.&nbsp;{item.title}
                  </Typography>
                  <Typography 
                    fontFamily={'Noto Sans, sans-serif'}
                    variant='body2'>
                      &nbsp;-&nbsp;{item.content}
                  </Typography>
                </Box>
                <GestureDetector
                  onTap={() => {}}
                  onHold={() => handleDelete(params.id, item.id)}>
                  <IconButton>
                    <DeleteIcon color="error"/>
                  </IconButton>
                </GestureDetector>
              </Box>
              ))
          :
            <Typography 
              variant='h6'
              fontFamily={'Noto Sans, sans-serif'}
              align='center'
              color={"white"}>
              No Words Found
            </Typography>
        }
      </Container>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={createWordModalOpen}
        onClose={() => setCreateWordModalOpen(false)}
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
            Create Word
          </Typography>
          <Input
            placeholder='title'
            variant="soft"
            sx={{ backgroundColor: styles['bg_secondary'], 
              color: styles['main'] }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
          <Input
            placeholder='content'
            variant="soft"
            sx={{ backgroundColor: styles['bg_secondary'], 
              marginTop: 2,
              color: styles['main'] }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
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

export default BookPage;