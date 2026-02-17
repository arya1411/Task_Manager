import React, { useState } from 'react'

const ViewTaskDetails = () => {
  const {id} = useParams();
  const [task , setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch(status){
      case "In Progress" :
          return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";

      case "Completed" :
          return "text-lime-500 bg-lime-50 border border-lime-500/20";

      default :
          return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }

    const getTaskDetailsById = async () => {

    }

    const updateTodoCheckList = async () => {
      
    }
  }
  return (
    <div>ViewTaskDetails</div>
  )
}

export default ViewTaskDetails