import React from 'react'
import ApiContext from '../ApiContext'
import PropTypes from 'prop-types';
// creates a form
//form lets user input new folder name and captures
//submits new folder name to the POST /folders endpoint on the server
//inclde error boundaries
//include proptypes
//Add a button to the navigation to invoke the new form?? circle button? create new folder?

class AddFolder extends React.Component{
  // use "constructor(props)" instead?
  //defaultProps is used to set default values for the props argument
  // or:
  //static defaultProps = {
    // match: {
      // params: {}
    // }
  // }
  static defaultProps = {
    onPostFolder: () => {},
  }
  static contextType = ApiContext

  // handler to update state properties
  updateName(name) {
    this.setState({name: {value: name, touched: true}});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
    console.log('Name: ', name.value);

    fetch(`${config.API_ENDPOINT}/folders/${folderId}`, { //folderID?
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.postFolder(folderId)
      // allow parent to perform extra behaviour
        this.props.onPostFolder(folderId)
      })
      .catch(error => {
        console.error({ error })
      })
    }

    // displaying a validation message requires a conditional statement
    validateName() {
      const name = this.state.name.value.trim();
      if (name.length === 0) {
        return "Folder name is required";
      } else if (name.length < 3) {
        return "Folder name must be at least 3 characters long";
      }
    }

  render () {
    const nameError = this.validateName();
    // htmlFor property sets or returns the value of the for attribute of a label
    return (
      <form className="AddFolder" onSubmit={event => this.handleSubmit(event)}>
        <h3>Add a new folder<h3>
        <div className="folder-name-hint">* required field</div>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input type="text" className="AddFolder-control"
            name="name" id="name" placeholder="Upcoming" onChange={e => this.updateName(event.target.value)}/>
            {this.state.name.touched && (
              <ValidationError message={nameError} />
            )}
        </div>
        <div>
          <button
            type="submit"
            className="AddFolder-button"
            disabled={
            this.validateName()
            onClick={this.handleClickSave}
            }
          >
            Save
          </button>
        </div>
      </form>
    )
  }
}

AddFolder.propTypes =
export default AddFolder;
