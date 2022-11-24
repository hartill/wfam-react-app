import styled from '@emotion/styled'

export const MessageLogContainer = styled.div`
  flex: 1;
  min-height: 120px;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  overflow: hidden;
`

export const Messages = styled.div`
  flex: 1 1 100%;
  overflow: hidden;
  overflow-y: auto;
`

export const Message = styled.div`
  padding: 0.5rem 0.7rem;
  display: flex;
  align-items: center;
`

export const MessageType = styled.div`
  flex-basis: 1.5rem;
  display: flex;
  align-items: center;
`

export const MessageTypeIndicator = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 100%;
`

export const MessageContent = styled.div`
  flex: 1;
`

export const MessageDateTime = styled.div`
  flex-basis: 100px;
`
