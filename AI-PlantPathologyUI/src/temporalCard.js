import React from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Card,
    CardBody,
    CardText,
    CardTitle,
    Col,
    Row
} from 'reactstrap';

import {Spinner} from './spin';
import "./css/spin.css";

import ReactDOM from "react-dom";

import ImageUploading from "react-images-uploading";

import $ from 'jquery';

const align = {
    textAlign: "center"
};

const imageStyle = {
    paddingTop: "20px",
    paddingBottom: "20px",
};
const firstRow = {
    // paddingTop: "20px",
};
const secondRow = {
     display: "none",
};
const cardStyle = {
};
const cardStyleHeader = {
    height: "57px",
};
const ButtonStyleClickDrop = {
    paddingTop: "25px",
};
const opts = {
    lines: 13, // The number of lines to draw
    length: 33, // The length of each line
    width: 11, // The line thickness
    radius: 59, // The radius of the inner circle
    scale: 0.3, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: '#f7941d', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-default', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    position: 'absolute' // Element positioning
};
function refresh() {
    window.location.reload();
}
class Example extends React.Component {



    render() {
        return (

            <Container>
                <Row>
                    <Col className="col-12">
                        <Card className="shadow p-3 mb-5 bg-white rounded" style={cardStyleHeader} >
                                <CardTitle style={align} tag="h5">AI-PLANT PATHOLOGY</CardTitle>
                        </Card>
                    </Col>
                </Row>

                <Row id="firstRow" style={firstRow}>
                    <Col className="col-12">
                        <Card id="firstCard" className="shadow p-3 mb-5 bg-white rounded" style={cardStyle}>
                            <CardBody>
                                <CardTitle style={align} tag="h5">Please upload your image</CardTitle>
                                <CardText>
                                    <Row>
                                        <Col className="col-12" style={align}>
                                            <ImageComponent />
                                        </Col>
                                    </Row>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>

                <Row id="secondRow" style={secondRow}>
                    <Col className="col-12">
                        <Card id="firstCard" className="shadow p-3 mb-5 bg-white rounded" style={cardStyle}>
                            <CardBody>
                                <CardTitle style={align} tag="h5">Results</CardTitle>
                                <CardText>
                                    <Row>
                                        <Col id="tableSpace"className="col-12" style={align}>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Button id="Try Again" onClick={refresh}>Try Again</Button>
                                    </Row>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>

            </Container>


        );
    }




}
function uploadImage() {
    // data for submit
    console.log("I am clicked");
};

function ImageComponent() {
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);

        setImages(imageList);


        let listenerId = localStorage.getItem('ImageButtonListener');

        if(listenerId.includes("0")) {

            localStorage.setItem('ImageButtonListener', "1");

            document.getElementById("UploadButton").addEventListener("click", UploadFunction);
        }

        function UploadFunction() {


            document.getElementById("loaderShadow").style.display = "block";
            let spinner = new Spinner(opts).spin(document.getElementById('root'));

            let base64Image = imageList[0].data_url;

            var settings = {
                // "url": "http://localhost:7001/sso",
                 "url": "http://dev.scio.services:7001/sso",
                crossDomain : true,

                "method": "POST",
                "timeout": 0,
                "headers": {
                    'Content-type': 'application/json',
                },
                "data": JSON.stringify({"base64Image": base64Image}),

            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                var myJson = JSON.parse(response);

                let totalLeafs = myJson.totalLeafs
                let healthy = myJson.healthy
                let diseased = myJson.diseased
                let healthyPercentage = myJson.healthyPercentage
                let diseasedPercentage = myJson.diseasedPercentage



                document.getElementById("firstRow").style.display="none"
                document.getElementById("secondRow").style.display="block"

                let myTable = <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Leafs</th>
                        <th scope="col">Healthy</th>
                        <th scope="col">Diseased</th>
                        <th scope="col">Healthy Percentage</th>
                        <th scope="col">Diseased Percentage</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{totalLeafs}</td>
                        <td>{healthy}</td>
                        <td>{diseased}</td>
                        <td>{healthyPercentage}</td>
                        <td>{diseasedPercentage}</td>

                    </tr>
                    </tbody>
                </table>

                ReactDOM.render(myTable, document.getElementById('tableSpace'));


                document.getElementById("loaderShadow").style.display = "none";
                spinner.stop();

            });

        }




    };



    return (
        <div className="ImageComponent">





            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper" style={ButtonStyleClickDrop}>
                        <Button
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
                        </Button>
                        &nbsp;
                        {/*<Button onClick={onImageRemoveAll}>Remove all images</Button>*/}
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="200" style={imageStyle}/>
                                <Row >
                                    <Col className="col-4">
                                    </Col>
                                    <Col className="col-2">
                                        <Button onClick={() => onImageRemove(index)}>Remove</Button>
                                    </Col>
                                    <Col className="col-2" >
                                        <Button id="UploadButton" onClick={() => uploadImage}>Process</Button>
                                    </Col>
                                    <Col className="col-4">
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}


export default Example;