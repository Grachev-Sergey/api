import type { Socket } from 'socket.io';
import type { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { addCommentSoket } from './addComment';

export const onConnection = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>,
) => {
  socket.on('addComment', async (data) => {
    const newComment = await addCommentSoket(data);
    socket.broadcast.emit('addComment', newComment);
  });
};
