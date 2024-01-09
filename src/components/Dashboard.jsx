import { PieChart,LineChart } from 'react-chartkick'
import 'chartkick/chart.js'
import { useContext, useMemo } from 'react'
import { appContext } from '../App'

export default function Dashboard(props){ 

    const {data} = useContext(appContext)

    const [passedCount,failedCount,marksDistribution] = useMemo(()=>{
        const passMark = 0.3*1600
        const passedCount = data.students.filter(ele=>ele.score>passMark).length
        const failedCount = data.students.length-passedCount
        const marksDistribution = {
            "0-200":data.students.filter(ele=>ele.score>=0&&ele.score<=200).length,
            "201-400":data.students.filter(ele=>ele.score>=201&&ele.score<=400).length,
            "401-600":data.students.filter(ele=>ele.score>=401&&ele.score<=600).length,
            "601-800":data.students.filter(ele=>ele.score>=601&&ele.score<=800).length,
            "801-1000":data.students.filter(ele=>ele.score>=801&&ele.score<=1000).length,
            "1001-1200":data.students.filter(ele=>ele.score>=1001&&ele.score<=1200).length,
            "1201-1400":data.students.filter(ele=>ele.score>=1201&&ele.score<=1400).length,
            "1401-1600":data.students.filter(ele=>ele.score>=1401&&ele.score<=1600).length,
        }
        return [passedCount,failedCount,marksDistribution]
    },[data.students])


    return (
        <div>
            <h1 className='Title'>Dashboard</h1>
            <div className="chartsContainer">
                <PieChart 
                data={[["Passed", passedCount], ["Failed", failedCount]]}  
                width="30%" 
                donut={true} 
                colors={["rgb(37, 211, 102)", "rgb(255, 0, 0)"]}
                download={true} />

                <LineChart data={marksDistribution} 
                xtitle="marks range" 
                ytitle="counts" 
                width="50%"
                download={true} />

            </div>
        </div>
    )
}

