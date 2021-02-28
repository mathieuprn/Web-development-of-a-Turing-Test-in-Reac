import React from 'react';
import { useState, useEffect } from "react";
import '../styles/Input.css'
import '../styles/styleScreens/EvaluationStyle.css'
import first from '../img/network-snapshot-007750_Rain_Cells_607.png'
import second from '../img/network-snapshot-007750_Sea_Ice_8.png'
import { Redirect } from "react-router-dom";
import useFetchUser from "../hooks/useUser";
import Button from "../components/Button";
import {listQuestion, question_formulaire, button_formulaire, champ_username, champ_mail, alert_username, choose_option, level_beginner, level_intermediate, level_expert, button_evaluation} from "../helper/EvaluationConst";


 //reponse unique en fonction de la props
  class Reponse extends React.Component {
    render() {
      return (
        <input type="text" name={this.props.value} value={this.props.value} readOnly="true" className="reponse"></input>
      );
    }
  }

  //list de reponse en fonction d'une liste de props
  class ListReponse extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
    }

    renderReponse(i) {
      return <Reponse value={i} />;
    }
    
    render() {
        const listItems = this.props.value.map((prop) =>  this.renderReponse(prop)    ); 
      return (
        <form>
        <div className="list_reponse"> 
          {listItems}
        </div>
        </form>
        
      );
    }
  }

  //composant image en fonction de la prop (seulement deux images disponibles)
  class Image extends React.Component {
    render() {
      if(this.props.value==1) {
          return <img src={first}
          alt="Image SAR of Rain Cells" className="image"/>
      }
      else if(this.props.value==2) {
        return <img src={second}
        alt="Image SAR of Sea Ice" className="image"/>
    }
    else {
      return null
    }
    }
  }

  //class Question composé d'une question et d'une image (optionnel)
  class Question extends React.Component {
    renderImage(i) {
      return <Image value={i}/>;
    }
    render() {
      return (
        <div className="question">
          <ul>
        {this.props.value[0]} </ul>
        <ul>
        {this.renderImage(this.props.value[1])}</ul>
        </div>

      );
    }
  }

  //Formulaire du début de page qui demande l'username et l'adresse mail de l'utilisateur
  class Formulaire extends React.Component {
    constructor(props) {    super(props);    this.state = {nom:champ_username,mail:champ_mail,redirect: null, flag:true}   ;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangenom = this.handleChangenom.bind(this);
    this.handleChangemail = this.handleChangemail.bind(this);
    this.handleFocusnom = this.handleFocusnom.bind(this);
    this.handleFocusmail = this.handleFocusmail.bind(this);
  }

  //on enregistre les changements
  handleChangenom(event) {   this.setState({nom: event.target.value}); 
  if(event.target.value!=champ_username && event.target.value!='') {
    this.setState({flag:false});
  }
  if(event.target.value==champ_username || event.target.value=='') {
    this.setState({flag:true});
  }
 }
  handleChangemail(event) {   this.setState({mail: event.target.value});  }

  //on initialise les champs si l'utilisateur clique dessus pour la première fois
  handleFocusnom(event) { 
    if(this.state.nom==champ_username) {
    this.setState({nom: ''});
    }
  }
  handleFocusmail(event) { 
    if(this.state.mail==champ_mail) {
    this.setState({mail: ''}); 
  }
  }

  //Si l'utilisateur a bien rempli les champs on le redirige vers l'autoévaluation sinon on lui affiche un message d'erreur
  handleSubmit(event) {
    this.setState({redirect: 'oui'})
    event.preventDefault();
  }

    render() {
      //cas où on redirige (on enregistre le nom et l'adresse mail)
      if (this.state.redirect) {
        return <Fenetre name={this.state.nom} mail={this.state.mail}/>
      }
      //sinon on affiche le formulaire
      return (
        <form onSubmit={this.handleSubmit} className="formulaire">                  
        <p className="evaluation-screen-p">{question_formulaire}</p>
          <div>
        <label>
          <input type="text" name="nom" required value={this.state.nom} onFocus={this.handleFocusnom} onChange={this.handleChangenom}></input>
        </label>
        </div>
        <div>
        <label>
          <input type="email" name="mail" value={this.state.mail} onFocus={this.handleFocusmail} onChange={this.handleChangemail}/>
        </label>
        </div>
        <Button text={button_formulaire}  isDisabled = {this.state.flag} className="but"/>
      </form>
      );
    }
  }




  //Fonction qui crée les questions
  function Fenetre(props) {
    const {user, createUser} = useFetchUser();
  const [value,setValue] = useState ( listQuestion[0]);
  const [res,setRes] =useState('');
  const [redirect,setRedirect] =useState(null);
  const userName=props.name;
  const mail=props.mail;
  const reponse = document.getElementsByClassName("reponse");


  //partie où la logique se fait via les réponses de l'utilisateur
    const handleFocus2 = (event) => { 
       
      if(res=='') {
        alert(choose_option)
      }
      else {
        if(value[0][0]==listQuestion[0][0][0]) {
          if(res==listQuestion[0][1][0]) {
            if(mail=='' || mail==champ_mail) {
              createUser({name: userName , level: 1});
            }
            else {
              createUser({name: userName , level: 1, email: mail});
            }
            //alert(level_beginner)
            setRedirect('test');
          }
          if(res==listQuestion[0][1][1]) {
            setValue(listQuestion[2])
          }
          if(res==listQuestion[0][1][2]) {
            setValue(listQuestion[1])
          }
        }
        if(value[0][0]==listQuestion[2][0][0]) {
          if(res==listQuestion[2][1][2]) {
            if(mail=='' || mail==champ_mail) {
              createUser({name: userName , level: 2});
            }
            else {
              createUser({name: userName , level: 2, email: mail});
            }
            //alert(level_intermediate)
            setRedirect('test');
          }
          else {
            if(res!=listQuestion[0][1][1] && res!=listQuestion[1][1][1] && res!=listQuestion[1][1][2]) {
              if(mail=='' || mail==champ_mail) {
                createUser({name: userName , level: 1});
              }
              else {
                createUser({name: userName , level: 1, email: mail});
              }
              //alert(level_beginner)
              setRedirect('test');
            }
            else {
              alert(choose_option)
            }
          }
        }
        if(value[0][0]==listQuestion[1][0][0]) {
          if(res==listQuestion[1][1][0]) {
            if(mail=='' || mail==champ_mail) {
              createUser({name: userName , level: 3});
            }
            else {
              createUser({name: userName , level: 3, email: mail});
            }
            //alert(level_expert)
            setRedirect('test');
          }
          else {
            if(res!=listQuestion[0][1][2]) {
            setValue(listQuestion[2])
            }
            else {
              alert(choose_option);
            }
          }
        }
    }
    for (var i = 0; i < reponse.length; i++) {
      reponse[i].removeAttribute("id","actif")
    } 
    event.target.blur();
      event.preventDefault();    
      }

   const handleFocus = (event) => {
    setRes(event.target.value);
    for (var i = 0; i < reponse.length; i++) {
      reponse[i].removeAttribute("id","actif")
    } 
    event.target.setAttribute("id", "actif");
    event.preventDefault();   
}
  
  
      const renderListReponse = (i) => {
        return <ListReponse value={i} />;
      }
      const renderQuestion= (i) => {
        return <Question value={i} />;
      }
      //si test terminé redirection vers la page de test
    if (redirect) {
      return <Redirect to={redirect} />
    }
    //sinon on poursuit l'autoévaluation
    return (
      <div className="fenetre">
      {renderQuestion(value[0])}
      <div onFocus={handleFocus}>
      {renderListReponse(value[1])}  
      </div>
      <div className="button" onFocus={handleFocus2}>
        <Button text={button_evaluation} className="but"/>
        </div>
      </div>
    );
  }


const EvaluationScreen = () => {
    return (

          <Formulaire/>

    )
}

export default EvaluationScreen
