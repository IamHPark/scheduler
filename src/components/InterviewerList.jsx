import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = (props) => {
  const interviewers = props.interviewers
  const listItem = interviewers.map( interviewer =>
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={props.interviewer === interviewer.id}  // need to change interviewer.id = value
      setInterviewer={() => {props.setInterviewer(interviewer.id)}}  // need to change props.setInterviewer = onChange
    />
  )
  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listItem}</ul>
    </section>
  );
};

export default InterviewerList;