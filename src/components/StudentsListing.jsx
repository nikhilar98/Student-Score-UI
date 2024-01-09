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
        <div>
            <h1>Records</h1>
            {
                data.students.slice(pageNo*3-3,pageNo*3).map(ele=>{ 
                    return <Card key={ele.id} sx={{ width: "50%",marginBottom:"1rem" }}>
                            <Box style={{display:'flex',justifyContent:"space-between",alignItems:'start'}}>
                                <CardContent>
                                    <Typography>Name : {ele.name}</Typography>
                                    <Typography>Address : {ele.address}</Typography>
                                    <Typography>City :{ele.city}</Typography>
                                    <Typography>Country :{ele.country}</Typography>
                                    <Typography>Pincode :{ele.pincode}</Typography>
                                    <Typography>Score :{ele.score}</Typography>
                                </CardContent>
                                <Button variant='contained' sx={{backgroundColor:ele.score>0.3*1600 ?'green':'red'}}>{ele.score>0.3*1600 ? 'Passed' : 'Failed'}</Button>
                            </Box>
                            <Button variant='contained'>Edit</Button>
                            <Button variant='contained' onClick={()=>{handleDelete(ele.id)}}>Delete</Button>
                            </Card>
                })
            }
             <Stack spacing={2}>
                <Pagination count={pageCounts} value={pageNo} onChange={handlePageChange}/>
             </Stack>
        </div>
    )
}

