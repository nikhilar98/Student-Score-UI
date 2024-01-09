import { useContext, useMemo, useState } from "react"
import { appContext } from "../App"
import { Card, CardContent, Typography,Button,Stack,Pagination,Box } from "@mui/material"

export default function StudentsListing(props){ 

    const {data,dispatch} = useContext(appContext)
    const [pageNo,setPageNo] = useState(1)

    const pageCounts = useMemo(()=>{
        return Math.ceil(data.students.length/3)
    },[data.students])

    const handlePageChange = (event, value) => {
        setPageNo(value);
      };

    function handleDelete(id){
        const confirm = window.confirm("Are you sure you want to delete?")
        if(confirm){
            dispatch({type:"DELETE_RECORD",payload:id})
        }
    }

    return (
        <div className="studentsListing">
            <h1>Records</h1>
            {
                data.students.slice(pageNo*3-3,pageNo*3).map(ele=>{ 
                    return <Card key={ele.id} className="card">
                                <Box className='content'>
                                    <CardContent>
                                        <Typography variant="body2">Name : {ele.name}</Typography>
                                        <Typography variant="body2">Address : {ele.address}</Typography>
                                        <Typography variant="body2">City :{ele.city}</Typography>
                                        <Typography variant="body2">Country :{ele.country}</Typography>
                                        <Typography variant="body2">Pincode :{ele.pincode}</Typography>
                                        <Typography variant="body2">Score :{ele.score}</Typography>
                                    </CardContent>
                                    <button className="status" style={{backgroundColor:ele.score>0.3*1600 ?'green':'red'}}>{ele.score>0.3*1600 ? 'Passed' : 'Failed'}</button>
                                </Box>
                                <Button variant='contained'>Edit</Button>
                                <Button variant='contained' onClick={()=>{handleDelete(ele.id)}} >Delete</Button>
                            </Card>
                })
            }
             <Stack spacing={2}>
                <Pagination count={pageCounts} value={pageNo} onChange={handlePageChange}/>
             </Stack>
        </div>
    )
}

