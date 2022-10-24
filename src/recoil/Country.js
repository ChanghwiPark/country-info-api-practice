import { atom } from "recoil";

export const pageState = atom({
    key: 'pageState',
    default: 1
})

export const numOnPageState = atom({
    key: 'numOnPageState',
    default: 50
})