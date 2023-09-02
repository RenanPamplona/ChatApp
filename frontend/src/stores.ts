import { writable } from 'svelte/store';

export interface MessageObject {
	fromUser: string;
	message: string;
}

export const messages = writable([] as MessageObject[]);
export const userName = writable('' as string);
export const roomName = writable('' as string);
export const hasJoined = writable(false);
export const usersInCurrentRoom = writable([] as string[]);
