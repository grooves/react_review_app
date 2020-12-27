export function ModalForm(props) {
  return(
    <div>
      <div>
        <label htmlFor='title'>タイトル</label>
        <input type='text' id='title' maxLength='255' value={props.formValues.title} onChange={props.setFormValue}/>
      </div>
      <div>
        <label htmlFor='score'>評価</label>
        <input type='number' id='score' min='1' max='5' value={props.formValues.score} onChange={props.setFormValue}/>
      </div>
      <div>
        <label htmlFor='body'>本文</label>
        <input type='text' id='body' value={props.formValues.body} onChange={props.setFormValue}/>
      </div>
      <div>
        <label htmlFor='reviewer'>レビュワー</label>
        <input type='text' id='reviewer' maxLength='255' value={props.formValues.reviewer} onChange={props.setFormValue}/>
      </div>
      <button onClick={props.closeModal}>キャンセル</button>
      <input type='button' value='送信' onClick={props.submitForm} />
    </div>
  )
}
