import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import CustomInput from './CustomInput.js';

export default class RequestTests extends Component {

  constructor(){
     super();
     this.state = {tests:[]};
     this.sendForm = this.sendForm.bind(this);
     this.setName = this.setName.bind(this);
     this.setProject = this.setProject.bind(this);
     this.setProperties = this.setProperties.bind(this);
   }


   componentDidMount(){
     fetch(`http://localhost:8080/tests/`)
       .then(response => response.json())
       .then(tests => {
         this.setState({tests:tests._embedded.tests});
         console.log("state", this.state);
       });
   }

    sendForm(event){
     event.preventDefault();
     $.ajax({
      url:'http://localhost:8080/tests?x-auth-token=gAAAAABaFDGJ0JKcKFZGI1dxHHWdSKhTLUcMMu7E7rLV9QlcgwWkP2Cu2YZjZbLmxlvJtLnguFkipsniocnrFdujyGGXWc3gCcVuXYZKeewlqK7DX2IUKL_T1RGZGUnqosETzPh7yxW5vHkSjxp8N3bltIPerItrVr11MGvySj1ZrKAgBugip1Y',
      contentType:'application/json',
      dataType:'json',
      type:'post',
      data: JSON.stringify({name:this.state.name, project:this.state.project, properties:this.state.properties}),
      error: function(resposta){
      console.log("erro");
     }
      });
    }

    setName(event){
      this.setState({name:event.target.value});
    }

    setProject(event){
      this.setState({project:event.target.value});
    }

    setProperties(event){
      this.setState({properties:event.target.value});
    }

    render(){
        return (
          <div>
            <h1 className="title is-1">Tests</h1>



            <section className="section">

              <p className="title">Request a Test</p>
              <form onSubmit={this.sendForm} method="post">
                <CustomInput id="name" type="text" name="name" value={this.state.name} onChange={this.setName} label="Name"/>
                <CustomInput id="project" type="text" name="project" value={this.state.project} onChange={this.setProject} label="Project"/>
                <CustomInput id="properties" type="text" name="properties" value={this.state.properties} onChange={this.setProperties} label="Properties"/>
                <button type="submit" className="button is-primary">Submit</button>
              </form>
            </section>

            </div>

        );
      }
}
