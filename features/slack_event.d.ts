interface HasId {
  id?: string;
}
interface Conversation {
  id: string;
  thread_ts?: string;
  team: string;
}

interface IncomingMessage {
  id: string;
  timestamp: string;
  channelId: string;
  conversation: Conversation;
  from: HasId;
  recipient: HasId;
  channelData: {
    client_msg_id: string;
    type: string;
    text: string;
    user: string;
    ts: string;
    channel: string;
    event_ts: string;
    channel_type: string;
    team: string;
  };
  text: string;
  type: string;
}

export interface SlackEvent {
  client_msg_id: string;
  type: string;
  text: string;
  user: string;
  ts: string;
  channel: string;
  event_ts: string;
  channel_type: string;
  team: string;
  incoming_message: IncomingMessage;
}
