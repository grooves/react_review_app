import React, { useState, useEffect } from "react";
import 'semantic-ui-css/semantic.min.css'
import {
  Container,
  Card,
  Button,
  Grid,
  Header,
  Divider,
  Modal,
  Form,
  Rating,
  Confirm,
  Icon,
} from 'semantic-ui-react'

function App() {
  const [reviews, setReviews] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(
    () => {
      fetchReviews().then((arr) =>{
        setReviews(arr);
      });
    },
    []
  );

  return (
    <div id="app">
      <Container>
        <Header as="h1" style={{"marginTop": "2em"}}>Book Reviews</Header>
        <Button primary onClick={openModal}>Post review</Button>
        <Divider />
        <Reviews reviews={reviews} openModal={openModal}/>
        <Modal open={isCreateModalOpen} onClose={closeModal} closeIcon>
          <ModalBody closeModal={closeModal} isCreate={true} />
        </Modal>
      </Container>
    </div>
  );

  async function fetchReviews() {
    const res = await fetch('https://bookreview-ten.vercel.app/api/reviews', { headers: { 'Content-Type': 'application/json' } })
    return res.json()
  }

  function openModal() {
    setIsCreateModalOpen(true);
  }

  function closeModal() {
    setIsCreateModalOpen(false);
  };

}

function Reviews({ reviews, openModal }) {
  return (
    <Card.Group itemsPerRow={3} centered>
      {reviews.map((review, index) => {
        return (
          <Review {...review} openModal={openModal} key={`review-${index}`} />
        );
      })}
    </Card.Group>
  );
}

function Review({ id, title, reviewer, body, score, openModal }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  return (
    <>
      <Card>
        <Card.Content>
          <Card.Header style={{"wordWrap": "break-word"}}>{title}</Card.Header>
          <Card.Meta>
            <br />
            <Rating icon="star" defaultRating={score} maxRating={5} size="massive" disabled />
            <br />
          </Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Grid>
            <Grid.Column floated="left" width={10}>
              reviewed by: {reviewer}
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Button basic compact color="teal" onClick={openEditModal}>edit</Button> 
              <Icon name="trash alternate outline" color="red" onClick={openDeleteConfirm} link />
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
      <Modal open={isEditModalOpen} onClose={closeEditModal} closeIcon>
        <ModalBody closeModal={closeEditModal} id={id} title={title} name={reviewer} body={body} score={score} />
      </Modal>
      <Confirm
        open={isDeleteConfirmationOpen}
        onConfirm={deleteReview}
        onCancel={closeDeleteConfirm}
        content="Are you sure you want to delete this review?"
      />
    </>
  );

  function openEditModal() {
    setIsEditModalOpen(true);
  }

  function closeEditModal() {
    setIsEditModalOpen(false);
  };

  function openDeleteConfirm() {
    setIsDeleteConfirmationOpen(true);
  };

  function closeDeleteConfirm() {
    setIsDeleteConfirmationOpen(false);
  };

  function deleteReview() {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(`https://bookreview-ten.vercel.app/api/reviews/${id}`, options)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        window.location.reload();
      });
  }
}

function ModalBody({ closeModal, isCreate, id, title: initialTitle, name: initialName, body: initialBody, score: initialScore }) {
  const [title, setTitle] = useState(initialTitle);
  const [name, setName] = useState(initialName);
  const [body, setBody] = useState(initialBody);
  const [score, setScore] = useState(initialScore);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = isCreate ? postReview : putReview
  const verb = isCreate ? "Post" : "Edit"

  return (
    <>
      <Modal.Header as="h2">{`${verb} your book review!`}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label htmlFor="title">Title: </label>
            <input name="title" type="text" maxlength="255" value={title} onChange={(e) => {setTitle(e.target.value)}} />
          </Form.Field>
          <Form.Field>
            <label htmlFor="name">Your name: </label>
            <input name="name" type="text" maxlength="255" value={name} onChange={(e) => {setName(e.target.value)}} />
          </Form.Field>
          <Form.Field>
            <label htmlFor="body">How was it?: </label>
            <textarea value={body} name="body" onChange={(e) => {setBody(e.target.value)}} />
          </Form.Field>
          <Form.Field>
            <div class="ui right labeled input">
              <label htmlFor="score" class="ui label">Rate this book: </label>
              <input type="number" minimum="1" maximun="5" name="score" value={score} onChange={(e) => {setScore(e.target.value)}}></input>
              <div class="ui basic label">
                /5
              </div>
            </div>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={onSubmit} disabled={isSubmitting}>GO!</Button>
      </Modal.Actions>
    </>
  );

  async function postReview(e) {
    e.preventDefault();
  
    setIsSubmitting(true);

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title, reviewer: name, body: body, score: parseInt(score) })
    };

    fetch('https://bookreview-ten.vercel.app/api/reviews', options)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsSubmitting(false);
        closeModal();
        window.location.reload();
      });
  };

  async function putReview(e) {
    e.preventDefault();
  
    setIsSubmitting(true);

    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title, reviewer: name, body: body, score: parseInt(score) })
    };

    fetch(`https://bookreview-ten.vercel.app/api/reviews/${id}`, options)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsSubmitting(false);
        closeModal();
        window.location.reload();
      });
  };
}

export default App;
