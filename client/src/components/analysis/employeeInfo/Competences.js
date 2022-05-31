import React from "react";
import { connect } from 'react-redux';

import './Competences.css';

export const Competences = ({ data }) => {
  return (
    <div className="se-employeeInfo__competence"></div>
  )
}

export default connect((state) => ({
  data: state.commonAnalysis.competences
}))(Competences);
