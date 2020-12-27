import axios from 'axios';
import { useState, useEffect } from 'react';
import Review from './Review';
import Modal from 'react-modal';
import { ModalForm } from './ModalForm';

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export

function App() {
  const [reviews, setReviews] = useState([])
  const [isModalOpened, setIsModalOpened] = useState(false)
  const initialFormValues = {
    title: '',
    score: 1,
    body: '',
    reviewer: ''
  }
  const [formValues, setFormValues] = useState(initialFormValues)

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
  async function fetchData() {
    const res = await axios.get('https://bookreview-ten.vercel.app/api/reviews');
    return res.data
  }

  useEffect(async () => {
    const data = await fetchData();
    setReviews(data)
  }, [])

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
    const res = await axios.post('https://bookreview-ten.vercel.app/api/reviews', formValues );
    // setReviews([...reviews, formValues])
    // setFormValues(initialFormValues)
    // closeModal();
    window.location.reload();
  }

  function openModal() {
    setIsModalOpened(!isModalOpened)
  }

  return (
    <>
      <button onClick={openModal}>登録</button>
      <Modal
        isOpen={isModalOpened}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalForm
          formValues={formValues}
          setFormValue={setFormValue}
          submitForm={submitForm}
          closeModal={closeModal}
        />
      </Modal>

      {reviews.map(review => (
        <Review review={review} openModal={openModal}/>
      ))
      }
    </>
  );
}

export default App;
