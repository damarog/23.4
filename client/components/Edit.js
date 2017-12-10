import React, { Component, PropTypes } from 'react';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.finishEdit = this.finishEdit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
  }

  renderEdit() {
    return <input type="text"
            autoFocus={true}
            defaultValue={this.props.value}
            onBlur={this.finishEdit}
            onKeyPress={this.checkEnter} />;
  }

  renderValue() {
    const { value, onDelete, onValueClick } = this.props;
  
    return (
      <div onClick={onValueClick}>
        <span>{value}</span>
        {onDelete ? this.renderDelete() : null }
      </div>
    );
  }

  renderDelete() {
    return <button onClick={this.props.onDelete}>×</button>;
  }

  checkEnter(e) {
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit(e) {
    const value = e.target.value;
  
    if(this.props.onEdit) {
      this.props.onEdit(value.trim());
    }
  }

  render() {
    const {editing, ...props} = this.props;

    return (
      <div>
        {editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }
}

Edit.propTypes = {
  value: PropTypes.string,
  onEdit: PropTypes.func,
  onValueClick: PropTypes.func,
  editing: PropTypes.bool
};

export default Edit;