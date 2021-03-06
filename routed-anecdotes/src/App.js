import React from 'react'
import { ListGroup,ListGroupItem,Col,Button,FormGroup, FormControl,ControlLabel,PageHeader } from 'react-bootstrap'
import { BrowserRouter as Router, Route, NavLink,Link } from 'react-router-dom'
const Menu = () => {
  const menuStyle = {background:'Aqua'}
  const activeStyle = {background:'blue'}
  return(<div style={menuStyle}>    
           <NavLink activeStyle={activeStyle} exact to='/'>anecdotes</NavLink>&nbsp;
           <NavLink activeStyle={activeStyle} to='/create'>create new</NavLink>&nbsp;
           <NavLink activeStyle={activeStyle} to='/about'>about</NavLink>&nbsp;
         </div>)
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id} ><Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link></ListGroupItem>)}
    </ListGroup>  
  </div>
)

const About = () => (
  <div>
    <Col xs={12} md={8}>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </Col>
    <Col xs={12} md={4}>
      <img src="turing.jpg"/>
    </Col>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: '',
      notification:null
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>content</ControlLabel> 
            <FormControl name="content" type="text" value={this.state.content} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>author</ControlLabel>
            <FormControl name="author" type="text" value={this.state.author} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>url for more info</ControlLabel>
            <FormControl name="info" type="text" value={this.state.info} onChange={this.handleChange}/>
          </FormGroup> 
          <Button type="submit">create</Button>
        </form>
      </div>  
    )

  }
}


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), notification:`a new anecdote ${anecdote.content} created`})
    setTimeout(()=>this.setState({notification:null}),10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }
 
  render() {
    const notificationStyle = {border:'1px solid',borderRadius:'5px'}
    return (
      <div>
      <Router>
        <div>
          <PageHeader>Software anecdotes</PageHeader>
          <Menu />
          {this.state.notification&&<p style={notificationStyle}>{this.state.notification}</p>}
          <Route exact path="/" render={()=>
            <AnecdoteList anecdotes={this.state.anecdotes} />
          }/>
          <Route path="/about" render={()=><About />}/>
          <Route path="/create" render={()=><CreateNew addNew={this.addNew}/>}/>
          <Route exact path="/anecdote/:id" render={({match})=>
            <Anecdote anecdote={this.anecdoteById(match.params.id)}/>}
          />
        <Footer />
        </div>
        </Router>
      </div>
    );
  }
}
const Anecdote = ({anecdote})=>{
  return(
    <div>
     <h2>{anecdote.content}</h2>
     <p>has {anecdote.votes}</p>
     <p>for more info see {anecdote.info}</p>
    </div>
  )
}


export default App;
