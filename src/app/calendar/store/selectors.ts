import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {CalendarState} from "./state";


export const dateArray = (state: CalendarState) => state.dateArray;

export const selectCalendarState: MemoizedSelector<object, CalendarState> = createFeatureSelector<CalendarState>('calendar');

export const selectDateArray: MemoizedSelector<object, any> = createSelector(selectCalendarState, dateArray);

