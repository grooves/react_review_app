import { Box, Button, Form, FormField, RangeInput, TextArea, TextInput } from "grommet";

export function ModalForm(props) {
  return(
    <Form>
      <FormField htmlFor='title' label='タイトル'>
        <TextInput
          id='title'
          maxLength='255'
          value={props.formValues.title}
          onChange={props.setFormValue}
        />
      </FormField>
      <FormField htmlFor='body' label='本文'>
        <TextArea
          id='body'
          size='xlarge'
          value={props.formValues.body}
          onChange={props.setFormValue}
        />
      </FormField>
      <FormField htmlFor='score' label='評価'>
        <RangeInput
          id='score'
          min='1'
          max='5'
          value={props.formValues.score}
          onChange={props.setFormValue}
        />
      </FormField>
      <FormField htmlFor='reviewer' label='レビュワー'>
        <TextInput
          id='reviewer'
          maxLength='255'
          value={props.formValues.reviewer}
          onChange={props.setFormValue}
        />
      </FormField>
      <Box direction='row' gap='medium'>
        <Button label='キャンセル' onClick={props.closeModal}/>
        <Button primary label='送信' onClick={props.submitForm}/>
      </Box>
    </Form>
  )
}
