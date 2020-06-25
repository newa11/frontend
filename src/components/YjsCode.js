import React from "react";
import * as ace from "brace";
const Y = require("yjs");
const CodeMirror = require("codemirror");

// YjsQuill plugins
require("y-memory")(Y);
require("y-array")(Y);
require("y-text")(Y);
require("y-websockets-client")(Y);
//require("y-codemirror")(Y);

var io = Y["websockets-client"].io; //need to get this.....

var link = "http://localhost:1234"; //this link is set in my .env file, which is hidden from github

var connection = io(link); //need to include LINK within io()...

class YjsCode extends React.Component {
  componentDidMount() {
    console.log("YjsQuill - componentDidMount - this.props is: ", this.props);
    console.log(
      "YjsQuill - componentDidMount - this.props.showRoom is: ",
      this.props.showRoom
    );
  }

  render() {
    //console.logging connection details here won't show until state is updated...
    //note: above logs work after i update state.... -- moved to within promise!

    console.log("YjsQuill - render - this.props is: ", this.props);

    // var that = this; //setting 'this' to 'that' so scope of 'this' doesn't get lost in promise below

    console.log("YjsQuill -->>> connection in render is: ", connection);
    console.log(
      "YjsQuill -->>> connection.connected in render is: ",
      connection.connected
    );
    console.log("YjsQuill -->>> connection.id in render is: ", connection.id);

    var connectionId = connection.id;
    console.log("connectionId is: ", connectionId);

    if (this.props.connectionExists === false) {
      console.log("YjsQuill --->> this.props.connectionExists === false");
      // connection.destroy() //this works! server log shows 'user left', and updates to text don't sync on reconnect... (calling disconnect() instead of destroy() made updates still sync.)
      connection.disconnect();
      console.log("connection disconnected...");
      console.log("USER LEFT, connection DESTROYED.");
    } //end if statement

    //putting Y within a ternary operator, so it only gets rendered if connectionExists...
    if (this.props.connectionExists === true) {
      Y({
        db: {
          name: "memory",
        },
        connector: {
          name: "websockets-client", // use the websockets-client connector
          room: this.props.showRoom, // passing in room from props...
          socket: connection, // passing connection above as the socket...
          url: link, // the connection endpoint (see y-websockets-server)
        },
        share: {
          codemirror: "Text", // y.share.richtext is of type Y.Richtext
        },
        // }).then(function (y) {
      }).then((y) => {
        window.ycodemirror = y;
        var editor = CodeMirror.fromTextArea(
          document.getElementById("Aeditor"),
          {
            lineNumbers: true,
            mode: "javascript",
            theme: "base16-dark",
          }
        );

        y.share.codemirror.bindCodeMirror(editor);
      });
    } //end if statement

    return (
      <div className="Yjs-style">
        <p>
          <span style={this.props.handleColorBorder(this.props.showRoom)}>
            YjsCode: {this.props.showRoom}
          </span>
        </p>
      </div>
    );
  }
}

export default YjsCode;
