import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiAlertCircle, FiArrowRight, FiAward, FiBookOpen, FiCheckCircle, FiRefreshCw, FiTarget } from "react-icons/fi";
import { examProfessions, getExamQuestions, licensingAuthorities } from "../data/licensingExamQuestions";
import "../css/licensing-exam-prep.css";

export default function LicensingExamPrep() {
  const [authority, setAuthority] = useState("DHA");
  const [profession, setProfession] = useState("Nurse");
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const questions = useMemo(() => getExamQuestions(profession), [profession]);
  const authorityInfo = licensingAuthorities.find(item => item.id === authority);
  const answered = Object.keys(answers).length;
  const correct = questions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0);
  const score = Math.round(correct / questions.length * 100);

  const reset = () => { setAnswers({}); setSubmitted(false); setStarted(false); };
  const submit = () => {
    setSubmitted(true);
    const key = `resuai_exam_${authority}_${profession}`;
    const previous = Number(localStorage.getItem(key) || 0);
    localStorage.setItem(key, String(Math.max(previous, score)));
    requestAnimationFrame(() => document.getElementById("exam-result")?.scrollIntoView({ behavior: "smooth" }));
  };

  return <main className="exam-page">
    <section className="exam-hero"><div><span>GCC HEALTHCARE LICENSING PRACTICE</span><h1>Prepare with purpose, not guesswork.</h1><p>Choose your pathway and profession, take a scored clinical-safety practice test and learn from every explanation.</p><div className="exam-trust"><span><FiTarget/> 7 pathways</span><span><FiBookOpen/> 7 professions</span><span><FiAward/> Instant score</span></div></div><aside><strong>DHA · DOH · MOHAP</strong><span>SCFHS · DHP · NHRA · Oman</span><p>Profession-specific practice in one healthcare career workspace.</p></aside></section>

    {!started ? <section className="exam-selector"><header><span>01</span><div><h2>Build your practice test</h2><p>Select the regulator pathway and your healthcare profession.</p></div></header><div className="exam-fields"><label>Licensing pathway<select value={authority} onChange={event => setAuthority(event.target.value)}>{licensingAuthorities.map(item => <option value={item.id} key={item.id}>{item.name} — {item.region}</option>)}</select></label><label>Healthcare profession<select value={profession} onChange={event => setProfession(event.target.value)}>{examProfessions.map(item => <option key={item}>{item}</option>)}</select></label></div><div className="exam-summary"><FiBookOpen/><div><strong>{authorityInfo.name} {profession} practice</strong><p>{questions.length} questions · clinical safety, ethics and profession-specific judgement · explanations after submission</p></div></div><button className="exam-primary" onClick={() => setStarted(true)}>Start practice test <FiArrowRight/></button><p className="exam-disclaimer"><FiAlertCircle/>Independent educational practice only. Questions are not copied from or endorsed by any regulator. Always verify current eligibility, syllabus and exam rules on the official authority website.</p></section> : <section className="exam-test"><header><div><span>{authorityInfo.name} · {authorityInfo.region}</span><h2>{profession} practice test</h2></div><strong>{answered}/{questions.length} answered</strong></header><div className="exam-progress"><i style={{width:`${answered/questions.length*100}%`}}/></div>{questions.map((question, index) => <article className="exam-question" key={question.question}><div className="question-number">{String(index + 1).padStart(2,"0")}</div><div><h3>{question.question}</h3><div className="exam-options">{question.options.map((option, optionIndex) => { const chosen = answers[index] === optionIndex; const state = submitted ? optionIndex === question.answer ? "correct" : chosen ? "incorrect" : "" : chosen ? "selected" : ""; return <label className={state} key={option}><input type="radio" name={`question-${index}`} checked={chosen} disabled={submitted} onChange={() => setAnswers(current => ({...current,[index]:optionIndex}))}/><span>{option}</span>{submitted && optionIndex === question.answer ? <FiCheckCircle/> : null}</label>; })}</div>{submitted ? <p className="exam-explanation"><strong>Why:</strong> {question.explanation}</p> : null}</div></article>)}<div className="exam-actions">{!submitted ? <><button className="exam-secondary" onClick={reset}><FiRefreshCw/> Change test</button><button className="exam-primary" disabled={answered !== questions.length} onClick={submit}>{answered !== questions.length ? `Answer ${questions.length-answered} more` : "Submit & see result"} <FiArrowRight/></button></> : <button className="exam-secondary" onClick={reset}><FiRefreshCw/> Try another test</button>}</div>{submitted ? <section id="exam-result" className="exam-result"><FiAward/><div><span>YOUR PRACTICE RESULT</span><h2>{score}% · {correct} of {questions.length} correct</h2><p>{score >= 80 ? "Strong practice result. Review every explanation and continue with broader syllabus preparation." : "Good starting point. Review the explanations, revisit weak topics and practise again."}</p></div><Link to="/credential-readiness">Check credential readiness <FiArrowRight/></Link></section> : null}</section>}
  </main>;
}
