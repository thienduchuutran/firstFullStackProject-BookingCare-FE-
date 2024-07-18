import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ModalUser extends Component {

        constructor(props){
            super(props)
            this.state = {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            }
        }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnChangeInput = (event) => {
      console.log(event.target.value)
    }

    render() {
        console.log('check child props', this.props)
        return (
        <Modal 
        isOpen={this.props.isOpen} toggle={()=>this.props.isOpen} className={'modal-user-container'} size='lg' centered>
            <ModalHeader toggle={() => {this.toggle()}}>Create a new user</ModalHeader>
            <ModalBody>
              <div className='modal-user-body'>
                  <div className='input-container'>
                    <label>Email</label>
                    <input type='text' onChange={(event)=>{this.handleOnChangeInput(event)}}></input>
                  </div>

                  <div className='input-container'>
                    <label>Password</label>
                    <input type='password'></input>
                  </div>

                  <div className='input-container'>
                    <label>First Name</label>
                    <input type='password'></input>
                  </div>


                  <div className='input-container'>
                    <label>Last Name</label>
                    <input type='password'></input>
                  </div>       

                  <div className='input-container max-width-input'>
                    <label>Address</label>
                    <input type='password'></input>
                  </div>         
              </div>


            </ModalBody>
            <ModalFooter>
              <Button color="primary" className='px-3' onClick={()=>this.toggle()}>
                Add new
              </Button>{' '}
              <Button color="secondary" className='px-3' onClick={()=>this.toggle()}>
                Close
              </Button>
            </ModalFooter>
        </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
