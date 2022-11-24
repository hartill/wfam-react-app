import styled from '@emotion/styled'

export const DescriptionGroup = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
`

export const Descriptions = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
`

export const DescriptionRow = styled.div`
  display: flex;
  padding: ${(props) => props.theme.spacing.rowPadding};
  &:nth-of-type(2n) {
    background: rgba(255, 255, 255, 0.2);
  }
`

export const DescriptionColumn = styled.div`
  flex: 1 0 0;
  &:nth-of-type(2n) {
    font-weight: 600;
  }
`

export const StatusIndicator = styled.div`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 0.5rem;
`
