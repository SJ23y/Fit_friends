import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Dispatch, State } from '../types/state';

const useAppDispatch = () => useDispatch<Dispatch>();

const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export { useAppDispatch, useAppSelector };
