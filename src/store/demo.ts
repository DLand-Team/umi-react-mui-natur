const state = {
    loadingText: '',
    toastText: 'toast message',
}

const actions = {
    updateLoadingText: (loadingText: string) => ({loadingText}),
    updateToastText: (toastText: string) => ({toastText}),
}

export default {
    state,
    actions,
}