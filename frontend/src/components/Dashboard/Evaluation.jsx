const Evaluation = ({ item, years,idx }) => {
  return (
    <tr >
      <td>{idx + 1}</td>
      <td>{item.name}</td>
      <td>{item.evaluations.company.name}</td>
      {years.map((y) => {
        if (y === item.evaluations.year) {
          return <td key={y}>{item.evaluations.salary}</td>;
        } else {
          return <td key={y}>NA</td>;
        }
      })}
    </tr>
  );
};
export default Evaluation;
