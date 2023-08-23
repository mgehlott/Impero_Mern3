import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import CustomModal from '../utils/CustomModal';
import { Button } from 'react-bootstrap';

import { useState } from 'react';
const Evaluation = ({ item, years, idx }) => {
  console.log(item);
  const [showModal, setShowModal] = useState(false);
  const modalCloseHandler = () => {
    setShowModal(false);
  };
  const modalOpenHandler = () => {
    setShowModal(true);
  };
  return (
    // <tr>
    //   <td>{idx + 1}</td>
    //   <td>{item.name}</td>
    //   <td>{item.evaluations.company.name}</td>
    //   {years.map((y) => {
    //     if (y === item.evaluations.year) {
    //       return <td key={y}>{item.evaluations.salary}</td>;
    //     } else {
    //       return <td key={y}>NA</td>;
    //     }
    //   })}
    // </tr>
    <tr>
      <td>{idx + 1}</td>
      <td>{item.name}</td>
      <>
        {years.map((year) => {
          return (
            <>
              {item.evaluations.some((item, idx) => item.year == year) ? (
                <td>
                  {
                    item.evaluations.find((item) => {
                      return item.year == year;
                    }).company.name
                  }
                  {' - '}
                  {
                    item.evaluations.find((item) => {
                      return item.year == year;
                    }).salary
                  }
                </td>
              ) : (
                <td>-</td>
              )}
            </>
          );
        })}
      </>
      {/* //{years.map((year) => {
      //   const currEval = item.evaluations.find((e) => e.year === year);
      //   if (!currEval) return <td key={year}>NA</td>;
      //   else {
      //     return (
      //       <td key={year}>
      //         {`${currEval.company.name} - ${currEval.salary}`}
      //       </td>
      //     );
      //   }
      // })} */}
      <td>{item.totalEvaluation}</td>
      <td>
        
        <Button
          variant="outline-primary"
          onClick={modalOpenHandler}
        >
          Actions
        </Button>
      </td>
      <CustomModal
        show={showModal}
        modalCloseHandler={ modalCloseHandler }
        item={item}
      />
    </tr>
  );
};
export default Evaluation;
// <td>
//   {stockVal.quantityTypes.some(
//     (item: any, idx: number) =>
//       item.type === CartonWithDozens || item.type === CartonWithPieces
//   ) ? (
//     <span className={clsx('fs-15 fw-600 d-block')}>
//       {
//         stockVal.quantityTypes.find(
//           (item: any) =>
//             item.type === CartonWithDozens || item.type === CartonWithPieces
//         ).stockCount
//       }{' '}
//     </span>
//   ) : (
//     <span className="fs-15 fw-600  d-block">-</span>
//   )}
// </td>;
