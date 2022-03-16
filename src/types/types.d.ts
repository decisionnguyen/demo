import 'react-redux';
declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.png';

declare type RootState = ReturnType<
  typeof import('../store')['store']['getState']
>;

declare module 'react-redux' {
  // @ts-ignore
  export * from 'react-redux/index';
  export function useSelector<TSelected = unknown>(
    selector: (state: RootState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean,
  ): TSelected;
}
