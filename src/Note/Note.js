import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types';
import './Note.css'

class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
  }

  static contextType = ApiContext;
  // contextType is a property
  // use a static class field to set the value of your contextType

  // function that responds to the event of the Delete button being clicked
  handleClickDelete = e => {
    e.preventDefault();
    const NoteId = this.props.title
    console.log(NoteId) //undefined

    fetch(`${config.API_ENDPOINT}/notes/${NoteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      },
      body: JSON.stringify(NoteId)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(event => Promise.reject(event))
        }
        return res.json()
      })
      .then((NoteId) => {
        this.context.deleteNote(NoteId)
        this.props.history.goBack()
        // this.props.onDeleteNote(noteNoteId)
      })
      .catch(error => {
        console.error({ error })
      })
    }
  render () {
    const { NoteId, title, modified } = this.props
      /* name: undefined
          NoteId: undefined
          modified: undefined*/
    return (
      <div className='Note'>
          <h2 className='Note__title'>
            <Link to={`/note/${NoteId}`}>
              {title}
            </Link>
          </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
            <div className='Note__dates-modified'>
              Modified
              {' '}
              <span className='Date'>
                {format(modified, 'Do MMM YYYY')}
              </span>
            </div>
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  title: PropTypes.string,
  NoteId: PropTypes.string,
  modified: PropTypes.string,
  onDeleteNote: PropTypes.func
}

export default Note;
