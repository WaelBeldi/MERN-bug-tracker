import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import PriorityColors from './BugView';

import { useDispatch } from "react-redux";
import { deleteBug, resolveBug, devRespond } from '../../Redux/actions/bugsActions';

import BugEdit from './BugEdit';
import MDEditor from "@uiw/react-md-editor";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader'; 
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const BugView = (props) => {
    const dispatch = useDispatch();
    // const {_id, title, details, steps, version, priority, assigned, name, createdOn, isResolved, devResponse} = bug;
    // const {_id} = bug._id;
    // const {title} = bug.title;
    // const {details} = bug.details;
    // const {steps} = bug.steps;
    // const {version} = bug.version;
    // const {priority} = bug.priority;
    // const {assigned} = bug.assigned;
    // const {name} = bug.name;
    // const {createdOn} = bug.createdOn;
    // const {isResolved} = bug.isResolved;
    // const {devResponse} = bug.devResponse;
    // const {priority.level} = PriorityColors(props.bug.priority);
    const navigate = useNavigate();
    const [stateDevResponse, setStateDevResponse] = useState('');
    const [stateEditResponse, setStateEditResponse] = useState(props.bug.devResponse);
    const user = JSON.parse(localStorage.getItem('profile'));

    const editClicked = () => {
      props.setCurrentId(props.bug._id)
      navigate('/createBugIssue')
    }
    const deleteClicked = () => {
      dispatch(deleteBug(props.bug._id))
      props.collapse()
    }
    const resolveClicked = () => {
      dispatch(resolveBug(props.bug._id))
      // const priorityTheme = !bug.isResolved ? (3 + parseInt(bug.priority)) : bug.priority;
      // setPriorityTheme(priorityTheme)
    }
    const handleResponse = (e) => {
      setStateDevResponse(e.target.value)
    }
    const submitResponse = (e) => {
      e.preventDefault()
      dispatch(devRespond(props.bug._id, { devResponse: stateDevResponse }, editDevResponse))
      editDevResponse()
    }
    const editDevResponse = () => {
      setStateEditResponse(!stateEditResponse)
    }

  return (
    <Box sx={{ minWidth: 463, maxWidth: 463}}>
      <Card className="bug-card" variant="outlined">
          <CardHeader
            action={
                user.result.userName === props.bug.name && <BugEdit editClicked={editClicked} deleteClicked={deleteClicked} bug={props.bug}/>
            }
            title = {props.bug.title}
            subheader = {props.bug.priority.level}
            sx={{bgcolor: "info.main", color: "primary.text"}}
        />
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.primary" fontStyle="italic">
            created by {props.bug.name}
            <Typography variant="inline" sx={{float: "right"}}>
              {moment(props.bug.createdOn).fromNow()}
            </Typography>
          </Typography>

          <Typography sx={{ fontSize: 14 }}  color="text.primary" fontStyle="italic">
            assigned to {props.bug.assigned}
          </Typography>
          
          <Typography variant="h5" color="text.primary" style={{fontWeight:"bold"}} align="right">
            {props.bug.version}
          </Typography>

          <Typography variant="h5" color="primary.main">Steps</Typography>
            <MDEditor.Markdown source={props.bug.steps} />

          <Typography variant="h5" color="primary.main" sx={{mt:1}}>Details</Typography>
          <MDEditor.Markdown source={props.bug.details} />
          {((user.result.role === 'admin' && props.bug.devResponse) || (user.result.userName === props.bug.assigned && stateEditResponse)) && 
                <Typography variant="h5" color="primary.main" sx={{mt:1}} align="right">Developer Response</Typography>}
          {user.result.role === 'admin' && props.bug.devResponse && <Typography>{props.bug.devResponse}</Typography>}
          {user.result.userName === props.bug.assigned && (stateEditResponse ? <Typography>{props.bug.devResponse}</Typography> : 
          <TextField
            value={stateDevResponse}
            onChange={handleResponse}
            sx={{mt:3}}
            label="Developer Response"
            placeholder="Working on it..."
            fullWidth
            multiline/>)}
        </CardContent>
        <CardActions>
          <ButtonGroup aria-label="outlined primary button group" style={{margin:"0 auto"}} fullWidth>
            {user.result.userName === props.bug.name && <Button variant="contained" color="success" onClick={resolveClicked}>{ props.bug.isResolved ? 'Unresolve' : 'Resolve' }</Button>}
            {user.result.userName === props.bug.assigned && !stateEditResponse && <Button variant="contained" color="success" onClick={submitResponse}>Respond</Button>}
            {user.result.userName === props.bug.assigned && stateEditResponse && <Button variant="contained" color="success" onClick={editDevResponse}>Edit Response</Button>}
            <Button variant="outlined" onClick={props.collapse}>Collapse</Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </Box>
  );
}

export default BugView;