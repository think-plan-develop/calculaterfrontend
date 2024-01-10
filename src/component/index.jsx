import { useState } from 'react';
import './style.scss';
import Button from './Button';
import axios from 'axios';

const Calculator=()=>{
    const keys=['CLEAR','DELETE','=','%','/','*','+','-','0','1','2','3','4','5','6','7','8','9'];
    const[expression,setExpression]=useState("");
    const[output,setOutput]=useState("");
  

    const calculateResult=async()=>{
        try{
            if(!expression){
                alert("expression is empty!")
            }
            else{
            const APITOKEN=process.env.REACT_APP_APITOKEN;
            const headers = {
                'Content-Type': 'application/json',
                'api_token': `${APITOKEN}` 
            };
            const response=await axios.post(`/calculator`,{expression:expression},{headers:headers});
            let data=response?.data;
            if(data?.message==="Invalid expression"){
                    alert("Invalid expression");
            }
            else{
                setOutput(data?.data?.output);
            }
        }
        }
        catch(error){
            console.log(error)
        }

    }




    const handleInputField=async(key)=>{
        console.log("key os",key)
        if(key === '='){
            await calculateResult();
        }
        else if (key === 'CLEAR') {
            setExpression(''); 
            setOutput("");
          } 
        else if (key === 'DELETE') {
            setOutput("");
        setExpression((prevExpression) => {
            return prevExpression.slice(0, -1);
        });
        }
        else{ 
            setOutput("");
            setExpression((prevExpression) => prevExpression + key) 
        }
    }
    


    return(
        <div className="container">
        <div className="wrap">
            <div className="input_wrap">
            <p>{output}</p>
            <input className='input_output' type="text" value={expression} />
            </div>
            <div className="btn_grid">
            {keys.map((elem)=>{
                return <Button value={elem} handleInputField={handleInputField}/>
            })}
          
            </div>
            </div>
        </div>
    )
}

export default Calculator;