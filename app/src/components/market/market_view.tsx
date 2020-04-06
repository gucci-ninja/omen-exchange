import { BigNumber } from 'ethers/utils'
import React from 'react'
import { Helmet } from 'react-helmet'

import { DOCUMENT_TITLE } from '../../common/constants'
import { Arbitrator, BalanceItem, Status, Token } from '../../util/types'
import { SectionTitle } from '../common'

import { ClosedMarketDetail } from './profile/closed_market_detail'
import { View } from './profile/view'

interface Props {
  account: Maybe<string>
  arbitrator: Maybe<Arbitrator>
  balances: BalanceItem[]
  category: string
  collateral: Token
  funding: BigNumber
  isConditionResolved: boolean
  isQuestionFinalized: boolean
  marketMakerAddress: string
  question: string
  questionId: string
  questionRaw: string
  questionTemplateId: BigNumber
  resolution: Maybe<Date>
  status: Status
  totalPoolShares: BigNumber
  userPoolShares: BigNumber
}

const MarketView: React.FC<Props> = (props: Props) => {
  const { isQuestionFinalized, question } = props

  const renderView = () => {
    return isQuestionFinalized ? <ClosedMarketDetail {...props} /> : <View {...props} />
  }

  return (
    <>
      <Helmet>
        <title>{`${question} - ${DOCUMENT_TITLE}`}</title>
      </Helmet>
      <SectionTitle goBackEnabled title={question} />
      {renderView()}
    </>
  )
}

export { MarketView }
