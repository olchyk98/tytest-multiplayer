export default function reducer(state = {}, { type, payload }) {
	const a = { ...state }

	switch(type) {
		case 'DECLARE_SOCKET':
			 a.wsocket = payload;
		break;
		default:break;
	}

	return a;
}