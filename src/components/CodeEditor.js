import React from "react";
import AceEditor from "react-ace";
import YjsCode from "./YjsCode";

class CodeEditor extends React.Component {
  componentDidMount() {
    console.warn("1. CodeEditor - componentDidMount...");
  } //componentDidMount

  render() {
    console.warn("0. CodeEditor - render...");
    return (
      <div className="TextEdit-style">
        <p>
          <span style={this.props.handleColorBorder(this.props.showRoom)}>
            CodeEditor: {this.props.showRoom}
          </span>
        </p>

        <YjsCode
          showRoom={this.props.showRoom} //this is only prop that TextEdit needs!!!
          connectionExists={this.props.connectionExists}
          handleColorBorder={this.props.handleColorBorder}
        />

        {this.props.connectionExists === true ? (
          /* <!-- Create the editor container --> */
          <div id="CodeEditor-container">
            <textarea id="Aeditor" width="100%"></textarea>
          </div>
        ) : (
          <div>LOADING...</div>
        )}
      </div>
    );
  }
}

export default CodeEditor;
