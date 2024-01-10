
import './style.scss';
const CalcButton=({value,handleInputField})=>{
    const isNumber =(val)=>{
        const parsedValue = parseFloat(val);
        return !isNaN(parsedValue) && typeof parsedValue === 'number';
    } 
    return(
        <button className={`button_inp ${isNumber(value) ? 'color' : ''}`}
         onClick={()=>{handleInputField(value)}}>
            {value}
         </button>
    )
}

export default CalcButton;