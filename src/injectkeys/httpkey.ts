import {InjectionKey} from 'vue';
import axios, {AxiosStatic} from 'axios';

export const httpKey: InjectionKey<AxiosStatic> = Symbol('httpKey');
export const http: AxiosStatic = axios;
