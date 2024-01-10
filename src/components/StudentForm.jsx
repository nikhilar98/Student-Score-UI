import * as React from 'react';
import { Button,Modal,TextField,Box } from '@mui/material';
import { useContext,useState,memo,useEffect } from 'react';
import { appContext } from '../App';


function StudentForm(props){ 

  const {data,dispatch} = useContext(appContext)
  const [name,setName] = useState("") 
  const [address,setAddress] = useState("") 
  const [city,setCity] = useState("") 
  const [country,setCountry] = useState("") 
  const [pincode,setPincode] = useState("") 
  const [score,setScore] = useState("") 
  const [formErrors,setFormErrors] = useState({})

  const errors = {} 

  useEffect(()=>{
    if(Boolean(data.editItemId)){
        setName(data.students.find(ele=>ele.id===data.editItemId).name)
        setAddress(data.students.find(ele=>ele.id===data.editItemId).address)
        setCity(data.students.find(ele=>ele.id===data.editItemId).city)
        setCountry(data.students.find(ele=>ele.id===data.editItemId).country)
        setPincode(data.students.find(ele=>ele.id===data.editItemId).pincode)
        setScore(data.students.find(ele=>ele.id===data.editItemId).score)
    }

  },[data.editItemId])

  function runValidations() { 
    if(name===''){
        errors.name='Name cannot be empty.'
    }
    if(address===''){
        errors.address='Address cannot be empty.'
    }
    if(city===''){
        errors.city='City cannot be empty.'
    }
    if(country===''){
        errors.country='Country cannot be empty.'
    }
    if(pincode===''){
        errors.pincode='Pincode cannot be empty.'
    }
    if(score===''){
        errors.score='Score cannot be empty.'
    }
    if(score<0){
        errors.score='Score cannot be less than 0.'
    }
    if(score>1600){
        errors.score='Score cannot be more than 1600.'
    }
  }

  function handleClose(){  
    dispatch({type:"CLOSE_MODAL"})
    setName("")
    setAddress("")
    setCity("")
    setCountry("")
    setPincode("")
    setScore("")
    setFormErrors({})
  }

  function handleUpdate(e){
       e.preventDefault()

       runValidations()

       if(Object.keys(errors).length===0){
           const formData= { 
               name,
               address,
               city,
               country,
               pincode,
               score,
               id:data.editItemId
           }
   
           dispatch({type:"UPDATE_RECORD",payload:formData})
           handleClose()
           console.log(formData)
       }
       else { 
           setFormErrors(errors)
       }

  }

  function handleSubmit(e){ 
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length===0){
            const formData= { 
                name,
                address,
                city,
                country,
                pincode,
                score,
                id: Number(new Date())
            }
    
            dispatch({type:"INSERT_RECORD",payload:formData})
            handleClose()
        }
        else { 
            setFormErrors(errors)
        }
        
  }

    return (
        <Box>
            <Modal
                open={data.modalOpen}
                onClose={handleClose}
            >
                <Box className='addForm' component="form" onSubmit={Boolean(data.editItemId) ? handleUpdate : handleSubmit}>
                    <TextField className="text-input" id="name" label="Name" variant="outlined" value={name} onChange={(e)=>{setName(e.target.value)}} helperText={formErrors.name && formErrors.name}  error={Boolean(formErrors.name)}/>
                    
                    <TextField className="text-input" id="Address" label="Address" variant="outlined" value={address} onChange={(e)=>{setAddress(e.target.value)}} helperText={formErrors.address && formErrors.address} error={Boolean(formErrors.address)}/>
                    
                    <TextField className="text-input" id="City" label="City" variant="outlined" value={city} onChange={(e)=>{setCity(e.target.value)}} helperText={formErrors.city && formErrors.city} error={Boolean(formErrors.city)}/>
                    
                    <TextField className="text-input" id="Country" label="Country" variant="outlined" value={country} onChange={(e)=>{setCountry(e.target.value)}} helperText={formErrors.country && formErrors.country} error={Boolean(formErrors.country)}/>
                    
                    <TextField className="text-input" id="Pincode" label="Pincode" variant="outlined" value={pincode} onChange={(e)=>{setPincode(e.target.value)}} helperText={formErrors.pincode && formErrors.pincode} error={Boolean(formErrors.pincode)}/>
                    
                    <TextField className="text-input" id="Score" label="Score" variant="outlined" type='number' value={score} onChange={(e)=>{setScore(e.target.value)}} helperText={formErrors.score && formErrors.score} error={Boolean(formErrors.score)}/><br/>

                    <Button type='submit' variant="contained">{Boolean(data.editItemId) ? 'Update record':'Add record'}</Button>
                </Box>
            </Modal>
        </Box>
    )
}

export default memo(StudentForm)

