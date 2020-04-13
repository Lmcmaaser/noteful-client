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
    const id = this.props.noteId
    console.log(id)

    fetch(`${config.API_ENDPOINT}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      },
      body: JSON.stringify(id)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(event => Promise.reject(event))
        }
        return res.json()
      })
      .then((id) => {
        this.context.deleteNote(id)
        this.props.history.goBack()
        // this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
    }
  render () {
    const { id, title, modified } = this.props
      /* name: undefined
          id: undefined
          modified: undefined*/
    return (
      <div className='Note'>
          <h2 className='Note__title'>
            <Link to={`/note/${id}`}>
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
  name: PropTypes.string,
  id: PropTypes.string,
  modified: PropTypes.string,
  onDeleteNote: PropTypes.func
}

export default Note;
