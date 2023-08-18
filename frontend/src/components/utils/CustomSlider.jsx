import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const CustomSlider = ({
  minYear,
  maxYear,
  sliderValues,
  handleSliderChange,
}) => {
 return (
   <div className="slider-container">
     <div className="w-50">
       <h5 className="text-center">Year Range</h5>
       <div className="d-flex justify-content-between align-items-center">
         <span>{sliderValues[0]}</span>
         {console.log(minYear, maxYear)}
         <Slider
           className="slider"
           range
           min={minYear}
           max={maxYear}
           step={1}
           value={sliderValues}
           onChange={handleSliderChange}
         />
         <span className="font-weight-bold">{sliderValues[1]}</span>
       </div>
     </div>
   </div>
 );
};
export default CustomSlider;
