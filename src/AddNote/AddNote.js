import React from 'react'
import ApiContext from '../ApiContext'
import ValidationError from '../ValidationError'
import PropTypes from 'prop-types';
import config from '../config'
// creates a form
//form lets user input new note name and captures
//submits new note name to the POST /notes endpoint on the server
//inclde error boundaries
//include proptypes
//Add a button to the navigation to invoke the new form?? circle button? create new folder?
class AddNote extends React.Component {
  state = {
    noteName: {
      value: ''
    }
  }
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  // handler to update state properties
  updateNoteName(noteName) {
    this.setState({noteName: {value: noteName, touched: true}});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { noteName } = this.state;
    console.log('noteName: ', noteName.value);

    fetch(`${config.API_ENDPOINT}/notes/`, { //folderID?
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: noteName.value,
        modified: new Date()
       })
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(event => Promise.reject(event))
        return res.json()
      })
      .then((note) => {
        this.context.addNote(note)
      // allow parent to perform extra behaviour
        // this.props.onAddFolder(folder)
      })
      .catch(error => {
        console.error({ error })
      })
    }
    // displaying a validation message requires a conditional statement
  validateNoteName() {
    const noteName = this.state.noteName.value.trim();
    if (noteName.length === 0) {
      return "Note name is required";
    } else if (noteName.length < 3) {
      return "Note name must be at least 3 characters long";
    }
  }
  render () {
    const noteNameError = this.validateNoteName();
    return (
      <form className="AddNote" onSubmit={event => this.handleSubmit(event)}>
        <h3>Add a new note</h3>
        <div className="note-name-hint">* required field</div>
        <div className="form-group">
          <label htmlFor="noteName">Name *</label>
          <input type="text" className="AddNote-control"
            name="noteName" id="noteName" placeholder="Antelope" onChange={event => this.updateNoteName(event.target.value)}/>
            {this.state.noteName.touched && (
              <ValidationError message={noteNameError} />
            )}
        </div>
        <div>
          <button
            type="submit"
            className="AddNote-button"
            disabled={
            this.validateNoteName()
            }
          >
            Save
          </button>
        </div>
      </form>
    )
  }
}

AddNote.propTypes = {
  value: PropTypes.string.isRequired
}

export default AddNote;
