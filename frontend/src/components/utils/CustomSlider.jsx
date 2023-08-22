import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const CustomSlider = ({
  minYear,
  maxYear,
  sliderValues,
  handleSliderChange,
}) => {
  console.log('min max', minYear, maxYear);
  return (
    <div className="slider-container ">
      <div>
        <h5 className="text-center">Year Range</h5>
        <div className="d-flex justify-content-between align-items-center">
          <span>{sliderValues[0]}</span>
          {console.log(minYear, maxYear)}
          <Slider
            style={{ maxWidth: '60%' }}
            className="slider myslider"
            range
            min={minYear}
            max={maxYear}
            step={1}
            value={sliderValues}
            onChange={handleSliderChange}
          />
          <span>{sliderValues[1]}</span>
        </div>
      </div>
    </div>
  );
};
export default CustomSlider;
