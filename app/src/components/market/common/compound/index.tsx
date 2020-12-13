import React, { DOMAttributes, HTMLAttributes } from 'react'
import styled from 'styled-components'

import { Token } from '../../../../util/types'
import { ButtonCircle } from '../../../button'
import { ButtonStateful, ButtonStates } from '../../../button/button_stateful'
import { CompoundLogo } from '../../../common/logos/services/compound'
import { ToggleTokenLock, ToggleTokenLockProps } from '../toggle_token_lock'

const Wrapper = styled.div`
  border-radius: 4px;
  border: ${({ theme }) => theme.borders.borderLineDisabled};
  padding: 21px 25px;
`

const Title = styled.h2`
  color: ${props => props.theme.colors.textColorDark};
  font-size: 16px;
  letter-spacing: 0.4px;
  line-height: 1.2;
  margin: 0 0 20px;
  font-weight: 400;
`

const SubTitle = styled.h2`
  color: ${props => props.theme.colors.textColorDarker};
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0 0 10px 0;
`

const Info = styled.p`
  color: ${props => props.theme.colors.textColorLightish};
  font-size: 14px;
  letter-spacing: 0.2px;
  line-height: 1.4;
  margin: 0 32px 0 0;
`
const Info2 = styled.span`
  color: ${props => props.theme.colors.green};
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0 0 10px 0;
`

const DescriptionWrapper = styled.div`
  align-items: center;
  display: flex;
`

const Description = styled.p`
  color: ${props => props.theme.colors.textColorLightish};
  font-size: 14px;
  letter-spacing: 0.2px;
  line-height: 1.4;
  margin: 0 32px 0 0;
`

const FlexRowWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`
const ServiceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 39px;

  @media (max-width: ${props => props.theme.themeBreakPoints.md}) {
    width: 100%;
    flex-direction: row-reverse;
    height: 16px;
  }
`

export type SetAllowanceProps = DOMAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLDivElement> &
  ToggleTokenLockProps & {
    collateral: Token
    marginBottom?: boolean
  }

export const Compound: React.FC<SetAllowanceProps> = (props: SetAllowanceProps) => {
  const { collateral, finished, loading, onUnlock, ...restProps } = props

  return (
    <Wrapper {...restProps}>
      <Title>Recommended Services</Title>
      <FlexRowWrapper>
        <CompoundLogo></CompoundLogo>
        <ServiceItem>
          <SubTitle>Compound</SubTitle>
          <Info>
            Convert {collateral.symbol} to c{collateral.symbol} and <Info2>earn ~2.54% interest</Info2>
          </Info>
        </ServiceItem>
        <ButtonStateful disabled={false} onClick={onUnlock} state={ButtonStates.finished}></ButtonStateful>
      </FlexRowWrapper>
    </Wrapper>
  )
}
