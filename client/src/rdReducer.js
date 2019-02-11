export default function reducer(state = {}, { type, payload }) {
	const a = { ...state }

	switch(type) {
		case 'DECLARE_SOCKET':
			 a.wsocket = payload;
		break;
        case 'DECLARE_SOCKRT_ID':
            a.wsocketID = payload;
        break;
        case 'ROUTE_PAGE':
            a.currentPage = payload;
        break;
        case 'SET_ROOM':
            if(!a.currentRoom) {
                a.currentRoom = payload;
            } else {
                a.currentRoom = {
                    ...a.currentRoom,
                    ...payload
                }
            }
        break;
        case 'SET_SOCKET_ERROR':
            a.socketError = payload;
        break;
        case 'CAST_ERROR':
            a.globalError = payload;
        break;
		default:break;
	}

	return a;
}