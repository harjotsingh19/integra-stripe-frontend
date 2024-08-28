import { REDIRECT_TO, CLEAR_REDIRECTION } from 'src/store/constants/common';

export const redirectTo = (path: string) => ({
    type: REDIRECT_TO,
    payload: { target: path },
});

export const clearRedirection = () => ({
    type: CLEAR_REDIRECTION,
});