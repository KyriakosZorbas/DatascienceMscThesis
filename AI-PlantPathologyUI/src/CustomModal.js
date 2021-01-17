
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';


class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div  id="modalSuccess">
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'
                />
                {/*<Button color='danger' onClick={this.toggle}>{this.props.buttonLabel}</Button>*/}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}> Your files have been successfully downloaded</ModalHeader>


                </Modal>
            </div>
        );
    }
}
export default ModalExample;