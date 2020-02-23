export const timeoutPromise = async (timeout: number) => {
    return new Promise(resolve => {
        const timer = setTimeout(() => {
            clearTimeout(timer);
            resolve({timeout: true});
        }, timeout);
    })

}