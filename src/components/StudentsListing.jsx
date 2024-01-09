import { useContext, useMemo, useState, memo, useEffect } from "react"
import { appContext } from "../App"
import { Card, CardContent, Typography,Button,Stack,Pagination,Box } from "@mui/material"

function StudentsListing(props){ 

    const {data,dispatch} = useContext(appContext)
    const [pageNo,setPageNo] = useState(1)
    const [searchText,setSearchText] = useState("")

    useEffect(()=>{
        setPageNo(1)
    },[searchText])

    const filteredRecords = useMemo(()=>{
        return data.students.filter(ele=>ele.name.includes(searchText))
    },[searchText,data.students])

    const pageCounts = useMemo(()=>{
        const records = Boolean(searchText) ? filteredRecords : data.students 
        return Math.ceil(records.length/3)
    },[searchText,data.students])

    const handlePageChange = (event, value) => {
        setPageNo(value);
      }

    function handleEdit(id){ 
        dispatch({type:"OPEN_MODAL"})
        dispatch({type:"IS_EDIT_MODE",payload:id})
    }

    function handleDelete(id){
        const confirm = window.confirm("Are you sure you want to delete?")
        if(confirm){
            dispatch({type:"DELETE_RECORD",payload:id})
        }
    }

    return (
        <div className="studentsListing">
            <h1>Records</h1>
            
            <input type="text" id='searchBox' value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} placeholder="Search by name"/>
            
            <div className="grid">
            {   
               (searchText?filteredRecords:data.students).slice(pageNo*3-3,pageNo*3).map(ele=>{ 
                    return <Card key={ele.id} className="card">
                                <Box className='content'>
                                    <CardContent>
                                        <Typography variant="body2">Name : {ele.name}</Typography>
                                        <Typography variant="body2">Address : {ele.address}</Typography>
                                        <Typography variant="body2">City : {ele.city}</Typography>
                                        <Typography variant="body2">Country : {ele.country}</Typography>
                                        <Typography variant="body2">Pincode : {ele.pincode}</Typography>
                                        <Typography variant="body2">Score : {ele.score}</Typography>
                                    </CardContent>
                                    <button className="status" style={{backgroundColor:ele.score>0.3*1600 ?'green':'red'}}>{ele.score>0.3*1600 ? 'Passed' : 'Failed'}</button>
                                </Box>
                                <Button variant='contained' onClick={()=>{handleEdit(ele.id)}}>Edit</Button>
                                <Button variant='contained' onClick={()=>{handleDelete(ele.id)}} >Delete</Button>
                            </Card>
                })
            }
            </div>

            { filteredRecords.length ?
                <Stack spacing={2}>
                    <Pagination count={pageCounts} value={pageNo} onChange={handlePageChange}/>
                </Stack> 
                : 
                <p>No records found</p>
             }
        </div>
    )
}

export default memo(StudentsListing)