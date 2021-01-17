import React from "react";
import $ from 'jquery';
import ReactDOM from "react-dom";
import ModalExample from "./CustomModal";


const gardianIpOrDomain = "https://labs.scio.systems";

const pathOfGeoJsons ="/countries/";

class Requests extends React.Component {


    static async downloadInsideJupyter(downloadLink,jupyterPath,spinner) {


        let url = gardianIpOrDomain + "/proxyDownloadGenomesInsideJupyter.php?jupyterPath=" + jupyterPath;

        console.log("URL : "+url)
        // console.log(url)

        const json = await fetch(url,{
            method: "POST",
            body: downloadLink,

        }).then(function (response) {


            // console.log("RESP"+response)
            return response.text();
        })
            .then(function (myJson) {
                try {
                    // console.log("MyJson : "+myJson)


                    document.getElementById("loaderShadow").style.display = "none";
                    spinner.stop()

                    ReactDOM.unmountComponentAtNode(document.getElementById('modalSuccess'));
                    ReactDOM.render(<ModalExample/>, document.getElementById('modalSuccess'));

                    return myJson;
                } catch (e) {
                    return "not a polygon";

                    document.getElementById("loaderShadow").style.display = "none";
                    spinner.stop()
                }

            }).catch(function (exception) {
                console.log("EXCEPTION "+exception);
                document.getElementById("loaderShadow").style.display = "none";
                spinner.stop()
            });


        return json;
    }


    static async downloadInsideJupyterAnalyzed(downloadLink,jupyterPath,spinner) {


        let url = gardianIpOrDomain + "/proxyDownloadGenomesInsideJupyterAnalyzed.php?jupyterPath=" + jupyterPath;

        console.log("URL : "+url)
        console.log("downloadLink : "+downloadLink)


        // console.log(url)

        const json = await fetch(url,{
            method: "POST",
            body: downloadLink,

        }).then(function (response) {


            console.log(response)
            return response.text();
        })
            .then(function (myJson) {
                try {
                     console.log(myJson)


                    document.getElementById("loaderShadow").style.display = "none";
                    spinner.stop()

                    ReactDOM.unmountComponentAtNode(document.getElementById('modalSuccess'));
                    ReactDOM.render(<ModalExample/>, document.getElementById('modalSuccess'));

                    return myJson;
                } catch (e) {
                    return "not a polygon";

                    document.getElementById("loaderShadow").style.display = "none";
                    spinner.stop()
                }

            }).catch(function (exception) {
                console.log("EXCEPTION "+exception);
                document.getElementById("loaderShadow").style.display = "none";
                spinner.stop()
            });


        return json;
    }


}

export default Requests;
