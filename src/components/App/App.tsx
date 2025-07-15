import { useState } from 'react'
import type { VoteType, Votes } from "../../types/votes"
import Cafeinfo from "../Cafeinfo/Cafeinfo"
import css from "./App.module.css"
import VoteOptions from '../VoteOptions/VoteOptions'
import VoteStats from '../VoteStats/VoteStats'
import Notification from '../Notofication/Notification'
export default function App() {
   const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  })
  const handleVote = (vote: VoteType) => {setVotes(prev=>({...prev,[vote]:prev[vote]+1
  }))}
  const resetVotes = () => {
    return setVotes({
    good: 0,
    neutral: 0,
    bad: 0,
  })
  }
  const totalVotes = (votes.good + votes.neutral + votes.bad);
  const positiveRate = totalVotes > 0 ? Math.round((votes.good / totalVotes) * 100) : 0;
  return (
    <div className={css.app}>
      <Cafeinfo />
      <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={totalVotes>0} />
      {totalVotes ? <VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate} /> : <Notification/>
      }
    </div>
  )
}