import { useState } from "react";
import Apply from "../components/apply/Index";



const ApplyPage = () => {
  const [step, setStep] = useState(2)
 
  const handleSubmit = () => {
    //TODO: 카드 신청
  }
  return (
    <Apply step={step} onSubmit={handleSubmit}/>
  );
};

export default ApplyPage;