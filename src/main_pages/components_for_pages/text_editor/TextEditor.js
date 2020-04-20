import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { tinyAPIKey, host } from '../../../globalConstants';
import { withRouter } from 'react-router-dom';

class TextEditor extends Component {
  handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  }

  uploadImages(blobInfo, success, failure) {
    const token = window.sessionStorage.token;
    let myHeaders = new Headers();
   
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Accept", "application/json");
    
  
    let formData = new FormData();
    formData.append('file', blobInfo.blob());
    
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow'
    };

    fetch(host + "/images", requestOptions)
      .then(response => response.json())
      .then(result => {
        const resultCode = result.code;


        if (resultCode===0) {
          success(result.url);
        } else if (resultCode===1) {
          failure(result.message)
          this.props.history.push('/sign-in');       
          return;
        } else if (resultCode === 'expired') {
          this.props.history.push('/session-expired');
          return;
        } else {
          failure(result.message);
        }
      }
      )
      .catch(error => {
        failure(error);
        });
  }

  render() {
    return (
      <Editor apiKey={tinyAPIKey}
        initialValue={this.props.initialValue}
        init={{
            height: 470,
            menubar: "insert",
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount quickbars',
                'codesample'
            ],
            toolbar:
            `undo redo | formatselect | bold italic backcolor |
             fontsizeselect fontselect |
             alignleft aligncenter alignright alignjustify | 
             bullist numlist outdent indent | removeformat | 
             codesample | quickimage media | help`,
            automatic_uploads: true,
            images_upload_handler: this.uploadImages,

        }}
        onEditorChange={this.props.onChange}
        value={this.props.content}
      />
    );
  }
}

export default withRouter(TextEditor);
