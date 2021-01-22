import axios from 'axios';
import { useState, useEffect } from 'react';
import Review from './Review';
import Modal from 'react-modal';
import { ModalForm } from './ModalForm';
import { Box, Button, Footer, Grommet, Header, Heading, Main } from 'grommet';
import { AddCircle } from 'grommet-icons';

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export

function App() {
  const [reviews, setReviews] = useState([])
  const [isModalOpened, setIsModalOpened] = useState(false)
  const initialFormValues = {
    id: null,
    title: '',
    score: 1,
    body: '',
    reviewer: ''
  }
  const [formValues, setFormValues] = useState(initialFormValues)

  const upper = {
    position: 'fixed',
    right: '50px',
    bottom: '50px',
    transition: '1s',
    opacity: '0.7'
    }

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  const theme = {
    global: {
      font: {
        family: 'Roboto',
        size: '18px',
        height: '20px',
      },
    },
  };

  async function getReviews() {
    const response = await axios.get('https://bookreview-ten.vercel.app/api/reviews');
    return response.data
  }

  useEffect(() => {
    async function initializeReviews() {
      const data = await getReviews();
      setReviews(data)
    }

    initializeReviews()
  }, [])

  function openModal() {
    setIsModalOpened(!isModalOpened)
  }

  function closeModal() {
    setIsModalOpened(false)
  }

  function setFormValue(e) {
    const {id, value} = e.target
    if (id === 'score') {
      return setFormValues({...formValues, score: Number(value)})
    }
    setFormValues({...formValues, [id]: value})
  }

  async function submitForm() {
    if (formValues.id) {
      updateReview()
    } else {
      createReview();
    }
  }

  async function createReview() {
    const response = await axios.post('https://bookreview-ten.vercel.app/api/reviews', formValues );
    const data = response.data
    setReviews([...reviews, data])
    closeModal();
  }

  async function updateReview() {
    const response = await axios.put(`https://bookreview-ten.vercel.app/api/reviews/${formValues.id}`, formValues );

    const revs = reviews.slice()
    setReviews([
      ...(revs.filter(review => review.id !== response.data.id)),
      response.data
    ])

    closeModal();
  }

  async function deleteReview(id) {
    window.confirm("DON'T KILL ME PLEASE PLEASE PLEASE...");
    await axios.delete(`https://bookreview-ten.vercel.app/api/reviews/${id}`);
    setReviews(
      reviews.slice().filter(review => review.id !== id)
    )
  }

  function openAsNew() {
    setFormValues(initialFormValues);
    openModal();
  }

  function openAsEdit(review) {
    setFormValues(review)
    openModal();
  }



  return (
    <Grommet theme={theme}>
      <Header background='accent-1'>
        <Heading margin="medium">
          Book Review App
        </Heading>
      </Header>
      <Main pad="large">
        <Modal isOpen={isModalOpened} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
          <ModalForm
            formValues={formValues}
            setFormValue={setFormValue}
            submitForm={submitForm}
            closeModal={closeModal}
          />
        </Modal>
        <Box direction="row" wrap='true' pad="medium">
        {/* (review => ( review.score === 3 && <Review />)) */}
          {reviews.map(review => (
            <Review
              key={review.id}
              review={review}
              openModal={openModal}
              openAsEdit={openAsEdit}
              deleteReview={deleteReview}
            />
          ))
          }
        </Box>
      </Main>
      <Footer pad="medium" direction='row-reverse'>
        <Button
          id='addButton'
          icon={<AddCircle size='large'/>}
          onClick={openAsNew}
          style={upper}
        />
      </Footer>
    </Grommet>
  );
}

export default App;
