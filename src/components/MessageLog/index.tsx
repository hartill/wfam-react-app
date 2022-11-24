import {
  Message,
  MessageContent,
  MessageLogContainer,
  Messages,
  MessageTypeIndicator,
  MessageDateTime,
  MessageType,
} from './styles'
import dayjs from 'dayjs'
import { useTheme } from '@emotion/react'
import { TabHeader } from '../Layout/styles'

export enum IMessageType {
  ERROR = 'error',
  WARNING = 'warning',
  INFORMATION = 'information',
}

interface IMessage {
  id: string
  type: IMessageType | string
  content: string
  dateTime: string
}

interface IMessageLog {
  messages: IMessage[]
}

function MessageLog({ messages }: IMessageLog) {
  const theme = useTheme()

  return (
    <MessageLogContainer>
      <TabHeader>
        <h2>Message Log</h2>
      </TabHeader>
      <Messages>
        {messages.map((message) => {
          const backgroundColor =
            message.type === IMessageType.ERROR
              ? theme.colors.red
              : message.type === IMessageType.WARNING
              ? theme.colors.orange
              : theme.colors.green
          const date = dayjs(message.dateTime).format('DD MMM YYYY hh:mm:ss')
          return (
            <Message key={message.id}>
              <MessageType>
                <MessageTypeIndicator style={{ background: backgroundColor }} />
              </MessageType>
              <MessageContent>{message.content}</MessageContent>
              <MessageDateTime>{date}</MessageDateTime>
            </Message>
          )
        })}
      </Messages>
    </MessageLogContainer>
  )
}

export default MessageLog
