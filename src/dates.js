import dateFormat from 'dateformat'
// import { useNavigate } from "react-router-dom";
import {useState, useEffect } from "react"
import { Fieldset } from 'primereact/fieldset'
// import { Calendar } from 'primereact/calendar'

const Dates = () =>{
    const [data, setData] = useState([])
    const [startDate, setStart] = useState("")
    const [endDate, setEnd] = useState("")
    const [checked , setChecked ] =  useState ( false ) ;   
    const [parashat, setParashat] = useState([])

    const getData = async() =>{
        try{
            const response = await fetch(`https://www.hebcal.com/hebcal?cfg=fc&v=1&i=off&maj=on&min=on&nx=on&mf=on&ss=on&mod=on&lg=he&s=on&start=${startDate}&end=${endDate}`)
            const data = await response.json()
            setData(data)
            console.log(data);
        }
        catch(err){
            console.log("error" +err)
        }
    }

    const formatS = (value) =>{
        const s = dateFormat(value, "yyyy-mm-dd")
        console.log(s);
        setStart(s)
    }

    const formatE = (value) =>{
        const e = dateFormat(value, "yyyy-mm-dd")
        setEnd(e)
    }
   
    const handleChange = ( ) => {     
        setChecked (!checked)
        setParashat( data.find(i =>    
            i.className = 'parashat'
            ))
      }

      const ok = () =>{    
        getData(startDate, endDate)
    }
console.log(parashat);
useEffect(() =>{
    handleChange()
},[])

if(data.length === 0)
return <>
<input placeholder="הכנס תאריך התחלה" onBlur={e =>formatS( e.target.value)}></input>
<input placeholder="הכנס תאריך סיום" onBlur={e => formatE(e.target.value)}></input>
<button onClick={ok}>Click me</button>
</>
if(checked && parashat !== undefined)
if(parashat.length > 0)
return<>
{parashat && parashat?.map(i =>
    <div key={i.url} style={{height:"150px", width:"170px", border: "dashed", color: "black", background: "pink"}}>
       <p>{i.title}</p>
    <a>{i.start}</a>
    <a>{i.description}</a> 
    </div>
    )}
</>
return <>
<Fieldset legend="special dates">
{data && data.map(i =>
<div key={i.url} style={{height:"150px", width:"170px", border: "dashed", color: "black", background: "pink"}}>
    <p>{i.title}</p>
    <a>{i.start}</a>
    {/* <a>{i.description}</a> */}
</div>) }
  <p>
  <input type="checkbox"  onChange = { handleChange } />
  הצג פרשות שבוע בלבד
</p></Fieldset>
</>
}
export default Dates