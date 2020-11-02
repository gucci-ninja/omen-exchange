import React, { DOMAttributes, HTMLAttributes } from 'react'
import styled from 'styled-components'

import { ButtonStateful } from '../../../button/button_stateful'

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

export type UpgradeProxyProps = DOMAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLDivElement> & {
    upgradeProxy?: any
  }

export const UpgradeProxy: React.FC<UpgradeProxyProps> = (props: UpgradeProxyProps) => {
  const { upgradeProxy, ...restProps } = props

  return (
    <Wrapper {...restProps}>
      <Title>Upgrade Proxy</Title>
      <DescriptionWrapper>
        <Description>This permission allows the smart contracts to fund markets with native Ether.</Description>
        <ButtonStateful onClick={upgradeProxy}>Upgrade</ButtonStateful>
      </DescriptionWrapper>
    </Wrapper>
  )
}